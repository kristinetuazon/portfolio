import type { GetServerSideProps } from "next";
import { loadPosts } from "../services/blog/loader";
import { absolute } from "../lib/site";

/** Sitemap for search engines: the home and projects pages in both languages, the mailbox and every letter. */
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts = await loadPosts({ includeDrafts: false });
  const newest = posts[0]?.updated ?? posts[0]?.publishedAt;

  // A page that exists in English at `en` and in Japanese at `ja`.
  const both = (loc: string, en: string, ja: string) => `  <url>
    <loc>${absolute(loc)}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${absolute(en)}"/>
    <xhtml:link rel="alternate" hreflang="ja" href="${absolute(ja)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${absolute(en)}"/>
  </url>`;
  const page = (loc: string, lastmod?: string) => `  <url>
    <loc>${absolute(loc)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
  </url>`;

  const urls = [
    both("/", "/", "/ja"),
    both("/ja", "/", "/ja"),
    both("/projects", "/projects", "/ja/projects"),
    both("/ja/projects", "/projects", "/ja/projects"),
    page("/mailbox", newest),
    ...posts.map((p) => page(`/mailbox/${p.slug}`, p.updated ?? p.publishedAt)),
  ];

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.end(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`);
  return { props: {} };
};

export default function Sitemap() {
  return null;
}
