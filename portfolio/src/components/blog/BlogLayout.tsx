import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  image?: string;
  children: ReactNode;
};

/** Shell for the blog pages: a quiet top bar back to the portfolio, then the content. */
const BlogLayout = ({ title, description, image, children }: Props) => (
  <div className="blog min-h-screen bg-charcoal text-white">
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      <link rel="icon" href="/favicon.svg" />
      <link
        rel="alternate"
        type="application/rss+xml"
        title="kristineCodes; blog"
        href="/blog/rss.xml"
      />
    </Head>

    <header className="mx-auto flex max-w-3xl items-center justify-between px-4 pt-8 sm:px-6">
      <Link
        href="/"
        className="font-audreyMedium uppercase tracking-widest text-white hover:text-creme"
      >
        kristineCodes;
      </Link>
      <Link
        href="/blog"
        className="font-audreyMedium uppercase tracking-widest text-white hover:text-creme"
      >
        Blog
      </Link>
    </header>

    <main className="mx-auto max-w-3xl px-4 pb-32 pt-16 sm:px-6">{children}</main>
  </div>
);

export default BlogLayout;

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export const Tags = ({ tags }: { tags: string[] }) =>
  tags.length ? (
    <ul className="flex flex-wrap gap-2" aria-label="Tags">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-mint px-3 py-0.5 font-bodyRegular text-sm lowercase text-creme"
        >
          {tag}
        </li>
      ))}
    </ul>
  ) : null;
