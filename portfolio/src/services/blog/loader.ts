import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import yaml from "js-yaml";
import { renderMarkdown, readingMinutes } from "./markdown";
import { BlogContentError, frontmatterSchema, type Post, type PostSummary } from "./types";

/**
 * Blog posts live in the repo as Markdown, one folder per post:
 *
 *   content/blog/<slug>/index.md     the post (frontmatter + Markdown)
 *   public/blog/<slug>/...           its images
 *
 * Everything is read and checked at build time. A broken post fails the build
 * (and `npm test`) with an error naming the file, instead of shipping broken.
 * See content/blog/README.md for the writing guide.
 */

export type BlogDirs = { contentDir: string; publicDir: string };

// turbopackIgnore stops the bundler from shipping the whole project with the
// RSS function; the folders it needs are listed in next.config.mjs instead.
export const defaultDirs = (): BlogDirs => ({
  contentDir: path.join(/* turbopackIgnore: true */ process.cwd(), "content", "blog"),
  publicDir: path.join(/* turbopackIgnore: true */ process.cwd(), "public", "blog"),
});

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

async function loadPost(slug: string, dirs: BlogDirs): Promise<Post> {
  const rel = path.join("content", "blog", slug, "index.md");
  if (!SLUG.test(slug)) {
    throw new BlogContentError(
      rel,
      `folder name "${slug}" must be lowercase words joined by dashes, e.g. "my-first-post"`,
    );
  }
  const file = path.join(dirs.contentDir, slug, "index.md");
  if (!fs.existsSync(file)) {
    throw new BlogContentError(rel, "missing index.md in this folder");
  }

  let parsed: matter.GrayMatterFile<string>;
  try {
    parsed = matter(fs.readFileSync(file, "utf8"), {
      // CORE_SCHEMA keeps dates as text. The default would silently turn an
      // impossible date like 2026-13-45 into a real one in 2027.
      engines: { yaml: (src) => yaml.load(src, { schema: yaml.CORE_SCHEMA }) as object },
    });
  } catch (err) {
    throw new BlogContentError(
      rel,
      `the frontmatter (between the --- lines) isn't valid YAML: ${(err as Error).message}`,
    );
  }

  const result = frontmatterSchema.safeParse(parsed.data);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  - ${i.path.join(".") || "frontmatter"}: ${i.message}`)
      .join("\n");
    throw new BlogContentError(rel, issues);
  }
  const fm = result.data;

  if (!parsed.content.trim()) {
    throw new BlogContentError(rel, "the post has no content below the frontmatter");
  }

  const { html, usedImages } = await renderMarkdown(parsed.content, slug);
  const images = fm.cover ? [...usedImages, fm.cover] : usedImages;
  const missing = images.filter((img) => !fs.existsSync(path.join(dirs.publicDir, slug, img)));
  if (missing.length) {
    throw new BlogContentError(
      rel,
      missing
        .map((img) => `  - image "${img}" not found; put it in public/blog/${slug}/${img}`)
        .join("\n"),
    );
  }

  return {
    ...fm,
    slug,
    cover: fm.cover ? `/blog/${slug}/${fm.cover}` : undefined,
    readingMinutes: readingMinutes(parsed.content),
    html,
  };
}

let cache: Post[] | undefined;

/** All posts, newest first. Drafts are included only in development. */
export async function loadPosts({
  includeDrafts = process.env.NODE_ENV === "development",
  dirs = defaultDirs(),
} = {}): Promise<Post[]> {
  const cacheable = process.env.NODE_ENV === "production" && !includeDrafts;
  if (cacheable && cache) return cache;

  const slugs = fs.existsSync(dirs.contentDir)
    ? fs
        .readdirSync(dirs.contentDir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
    : [];

  const posts = (await Promise.all(slugs.map((slug) => loadPost(slug, dirs))))
    .filter((p) => includeDrafts || !p.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.slug.localeCompare(b.slug));

  if (cacheable) cache = posts;
  return posts;
}

/** Post data without the body, for lists. */
export const toSummary = (post: Post): PostSummary => {
  const { html, ...summary } = post;
  void html;
  return summary;
};
