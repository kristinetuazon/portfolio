import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { loadPosts } from "../loader";
import { renderMarkdown } from "../markdown";
import { BlogContentError } from "../types";

// --- The real posts -------------------------------------------------------

describe("content/blog", () => {
  it("every post (including drafts) is valid", async () => {
    const posts = await loadPosts({ includeDrafts: true });
    for (const post of posts) expect(post.html.length).toBeGreaterThan(0);
  });
});

// --- Loader behaviour, against a throwaway content folder -----------------

let root: string;
let dirs: { contentDir: string; publicDir: string };

const write = (slug: string, body: string, images: string[] = []) => {
  fs.mkdirSync(path.join(dirs.contentDir, slug), { recursive: true });
  fs.writeFileSync(path.join(dirs.contentDir, slug, "index.md"), body);
  for (const img of images) {
    fs.mkdirSync(path.join(dirs.publicDir, slug), { recursive: true });
    fs.writeFileSync(path.join(dirs.publicDir, slug, img), "");
  }
};

const post = (fm: string, body = "Hello there.") => `---\n${fm.trim()}\n---\n\n${body}\n`;
const valid = `title: Hi\nsummary: A post.\npublishedAt: 2026-01-02`;

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), "blog-test-"));
  dirs = { contentDir: path.join(root, "content"), publicDir: path.join(root, "public") };
});
afterEach(() => fs.rmSync(root, { recursive: true, force: true }));

const load = (includeDrafts = false) => loadPosts({ includeDrafts, dirs });

describe("loadPosts", () => {
  it("returns no posts when the folder doesn't exist", async () => {
    expect(await load()).toEqual([]);
  });

  it("parses frontmatter, normalises dates and sorts newest first", async () => {
    write("older", post(valid));
    write("newer", post(`title: New\nsummary: Newer.\npublishedAt: "2026-03-01"\ntags: [a, b]`));
    const posts = await load();
    expect(posts.map((p) => p.slug)).toEqual(["newer", "older"]);
    expect(posts[1]).toMatchObject({ publishedAt: "2026-01-02", tags: [], draft: false, readingMinutes: 1 });
    expect(posts[0]!.tags).toEqual(["a", "b"]);
  });

  it("hides drafts unless asked", async () => {
    write("draft", post(`${valid}\ndraft: true`));
    expect(await load(false)).toHaveLength(0);
    expect(await load(true)).toHaveLength(1);
  });

  it("resolves the cover and inline images to the post's public folder", async () => {
    write("pics", post(`${valid}\ncover: c.jpg\ncoverAlt: A cat`, "![x](./a.png)"), ["c.jpg", "a.png"]);
    const [p] = await load();
    expect(p!.cover).toBe("/blog/pics/c.jpg");
    expect(p!.html).toContain('src="/blog/pics/a.png"');
  });

  it.each([
    ["missing title", post(`summary: s\npublishedAt: 2026-01-02`), /title/],
    ["bad date", post(`title: t\nsummary: s\npublishedAt: 2026-13-45`), /publishedAt/],
    ["unknown field (typo)", post(`${valid}\npublishAt: 2026-01-02`), /publishAt/],
    ["cover without alt text", post(`${valid}\ncover: c.jpg`), /coverAlt/],
    ["empty body", post(valid, ""), /no content/],
    ["broken YAML", `---\ntitle: [oops\n---\nhi`, /valid YAML/],
  ])("rejects a post with %s, naming the file", async (_name, body, message) => {
    write("broken-post", body);
    const err = await load().catch((e: unknown) => e);
    expect(err).toBeInstanceOf(BlogContentError);
    expect((err as Error).message).toMatch(path.join("content", "blog", "broken-post", "index.md"));
    expect((err as Error).message).toMatch(message);
  });

  it("rejects missing images", async () => {
    write("pics", post(valid, "![x](nope.png)"));
    await expect(load()).rejects.toThrow(/nope\.png.*public\/blog\/pics/);
  });

  it("rejects folder names that don't make clean URLs", async () => {
    write("My Post", post(valid));
    await expect(load()).rejects.toThrow(/lowercase words joined by dashes/);
  });
});

// --- Markdown rendering ---------------------------------------------------

describe("renderMarkdown", () => {
  it("turns [!NOTE] quotes into callouts", async () => {
    const { html } = await renderMarkdown("> [!WARNING]\n> Careful now.", "s");
    expect(html).toContain('<aside class="alert alert-warning" role="note">');
    expect(html).toContain('<p class="alert-title">Warning</p>');
    expect(html).toContain("Careful now.");
    expect(html).not.toContain("[!WARNING]");
  });

  it("leaves ordinary quotes alone", async () => {
    const { html } = await renderMarkdown("> Just a quote", "s");
    expect(html).toContain("<blockquote>");
  });

  it("does not render raw HTML", async () => {
    const { html } = await renderMarkdown('Hi <script>alert(1)</script> <img src=x onerror="x()">', "s");
    expect(html).not.toMatch(/<script|onerror/);
  });

  it("adds heading ids, GFM tables, and opens external links in a new tab", async () => {
    const { html } = await renderMarkdown(
      "## Hello World\n\n| a |\n| - |\n| 1 |\n\n[ext](https://example.com) [int](/blog)",
      "s",
    );
    expect(html).toContain('<h2 id="hello-world">');
    expect(html).toContain("<table>");
    expect(html).toContain('href="https://example.com" target="_blank" rel="noopener noreferrer"');
    expect(html).toContain('<a href="/blog">int</a>');
  });
});
