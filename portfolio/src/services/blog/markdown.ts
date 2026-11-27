import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import type { Blockquote, Image, Paragraph, Root as MdastRoot } from "mdast";
import type { Element, Root as HastRoot } from "hast";

const ALERTS = {
  note: "Note",
  tip: "Tip",
  important: "Important",
  warning: "Warning",
  caution: "Caution",
} as const;

/**
 * GitHub-style alerts:
 *
 *   > [!NOTE]
 *   > Something worth knowing.
 *
 * become <aside class="alert alert-note"> with a title line.
 */
function remarkAlerts() {
  return (tree: MdastRoot) => {
    visit(tree, "blockquote", (node: Blockquote) => {
      const first = node.children[0];
      if (first?.type !== "paragraph") return;
      const text = first.children[0];
      if (text?.type !== "text") return;
      const match = /^\[!(note|tip|important|warning|caution)\][ \t]*\n?/i.exec(text.value);
      if (!match) return;

      const kind = match[1]!.toLowerCase() as keyof typeof ALERTS;
      text.value = text.value.slice(match[0].length);
      if (!text.value) first.children.shift();
      if (first.children[0]?.type === "break") first.children.shift();
      if (first.children.length === 0) node.children.shift();

      const title: Paragraph = {
        type: "paragraph",
        data: { hProperties: { className: ["alert-title"] } },
        children: [{ type: "text", value: ALERTS[kind] }],
      };
      node.children.unshift(title);
      node.data = {
        hName: "aside",
        hProperties: { className: ["alert", `alert-${kind}`], role: "note" },
      };
    });
  };
}

const isRelative = (url: string) => !/^([a-z][a-z0-9+.-]*:|\/|#)/i.test(url);

/** Turn `![alt](photo.jpg)` into `/blog/<slug>/photo.jpg` and record which files are used. */
function remarkPostImages(options: { slug: string; used: Set<string> }) {
  return (tree: MdastRoot) => {
    visit(tree, "image", (node: Image) => {
      if (!isRelative(node.url)) return;
      const file = node.url.replace(/^\.\//, "");
      options.used.add(file);
      node.url = `/blog/${options.slug}/${file}`;
    });
  };
}

/** Lazy-load images and open external links in a new tab. */
function rehypePolish() {
  return (tree: HastRoot) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "img") {
        node.properties.loading = "lazy";
        node.properties.decoding = "async";
      }
      const href = node.tagName === "a" ? String(node.properties.href ?? "") : "";
      if (/^https?:\/\//.test(href)) {
        node.properties.target = "_blank";
        node.properties.rel = ["noopener", "noreferrer"];
      }
    });
  };
}

/**
 * Markdown -> HTML. Raw HTML in the Markdown is not rendered (remark-rehype
 * drops it unless explicitly allowed), so posts can't inject scripts or markup.
 */
export async function renderMarkdown(markdown: string, slug: string) {
  const usedImages = new Set<string>();
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkAlerts)
    .use(remarkPostImages, { slug, used: usedImages })
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypePolish)
    .use(rehypeStringify)
    .process(markdown);
  return { html: String(file), usedImages: [...usedImages] };
}

export function readingMinutes(markdown: string) {
  const words = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
