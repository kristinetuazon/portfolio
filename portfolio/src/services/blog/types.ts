import { z } from "zod";

/** A real calendar date written as "YYYY-MM-DD". */
const isoDate = z
  .union([z.string(), z.number()])
  .transform((value, ctx) => {
    const str = String(value).trim();
    const parsed = new Date(`${str}T00:00:00Z`);
    const real = !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === str;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(str) || !real) {
      ctx.addIssue({ code: "custom", message: `expected a date like 2026-11-27, got "${str}"` });
      return z.NEVER;
    }
    return str;
  });

export const frontmatterSchema = z
  .object({
    title: z.string().trim().min(1, "title is required"),
    /** One or two sentences, shown on the blog list and in link previews. */
    summary: z.string().trim().min(1, "summary is required").max(300, "keep the summary under 300 characters"),
    publishedAt: isoDate,
    /** Set when you meaningfully edit a post after publishing. */
    updated: isoDate.optional(),
    tags: z.array(z.string().trim().min(1)).default([]),
    /** Image file in public/blog/<slug>/, e.g. `cover.jpg`. */
    cover: z.string().trim().min(1).optional(),
    coverAlt: z.string().trim().optional(),
    /** Drafts show up in `npm run dev` but are left out of the live site. */
    draft: z.boolean().default(false),
  })
  .strict()
  .refine((fm) => !fm.cover || fm.coverAlt, {
    message: "coverAlt is required when cover is set (describe the image for screen readers)",
    path: ["coverAlt"],
  });

export type Frontmatter = z.infer<typeof frontmatterSchema>;

export type PostSummary = Omit<Frontmatter, "cover"> & {
  slug: string;
  /** Public URL of the cover image, if any. */
  cover?: string;
  readingMinutes: number;
};

export type Post = PostSummary & {
  /** Rendered, sanitised-by-construction HTML (raw HTML in Markdown is dropped). */
  html: string;
};

export class BlogContentError extends Error {
  constructor(
    public readonly file: string,
    detail: string,
  ) {
    super(`Problem in blog post ${file}:\n${detail}`);
    this.name = "BlogContentError";
  }
}
