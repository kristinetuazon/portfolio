# Writing blog posts

Posts are Markdown files in this folder. There is no CMS: add or edit a file,
push to `main`, and Vercel redeploys the site in about a minute. You can do
all of it from GitHub's web editor.

## Add a post

1. Make a folder named after the post's URL, using lowercase words and dashes:
   `content/blog/my-first-post/` becomes `/blog/my-first-post`.
2. Inside it, create `index.md` (copy `how-to-write-a-post/index.md` to start).
3. If the post has images, put them in `public/blog/my-first-post/`.
   Keep them web-sized (about 1600px wide, under 500 KB).
4. Run `npm run dev` and open http://localhost:3000/blog to preview it,
   then commit and push.

## Frontmatter

Every post starts with this block between `---` lines:

```yaml
---
title: My first post                # required
summary: One or two sentences.      # required, under 300 characters; shown on the list and in link previews
publishedAt: 2026-11-27             # required, YYYY-MM-DD; posts are sorted by this, newest first
updated: 2026-12-03                 # optional, set when you meaningfully edit a published post
tags: [career, nextjs]              # optional
cover: cover.jpg                    # optional, file in public/blog/<folder>/
coverAlt: What the image shows      # required when cover is set
draft: true                         # optional; drafts show in `npm run dev` but not on the live site
---
```

Any other field is rejected, which catches typos like `publishAt`.

## What you can write

Standard Markdown plus GitHub extras: tables, ~~strikethrough~~, task lists,
and autolinks. Also:

- **Callouts:** start a quote with `> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`,
  `> [!WARNING]` or `> [!CAUTION]`.
- **Images:** `![description](photo.jpg)` loads `public/blog/<folder>/photo.jpg`.
- **Headings** get ids, so you can link to `/blog/my-post#some-heading`.

Raw HTML is not rendered, on purpose.

## If something's wrong

A broken post fails the build with a message naming the file and the problem,
for example a missing title, a bad date, or an image that isn't there. So a
mistake can't go live half-broken. Run `npm test` to check all posts locally.
