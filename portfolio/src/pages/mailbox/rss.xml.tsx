import type { GetServerSideProps } from "next";
import { loadPosts } from "../../services/blog/loader";

const escape = (s: string) =>
  s.replace(
    /[<>&'"]/g,
    (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!,
  );

/** RSS feed at /mailbox/rss.xml so people can follow the mailbox in a reader. */
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // Links use whatever domain the feed was requested on.
  const proto = String(req.headers["x-forwarded-proto"] ?? "https").split(",")[0];
  const SITE = `${proto}://${req.headers.host ?? "localhost:3000"}`;
  const posts = await loadPosts({ includeDrafts: false });
  const items = posts
    .map(
      (p) => `    <item>
      <title>${escape(p.title)}</title>
      <link>${SITE}/mailbox/${p.slug}</link>
      <guid>${SITE}/mailbox/${p.slug}</guid>
      <pubDate>${new Date(`${p.publishedAt}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escape(p.summary)}</description>
    </item>`,
    )
    .join("\n");

  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  res.end(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>kristineCodes; mailbox</title>
    <link>${SITE}/mailbox</link>
    <description>Notes and stories from Kristine, a software developer in Yokohama.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`);
  return { props: {} };
};

export default function Rss() {
  return null;
}
