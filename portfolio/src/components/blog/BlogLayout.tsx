import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import Seo from "../Seo";
import { absolute, ogImage } from "../../lib/site";

type Props = {
  title: string;
  description: string;
  /** Path of this page, e.g. "/mailbox/why-programming". */
  path: string;
  /** Title drawn on the link-preview card; leave out for the mailbox itself. */
  letterTitle?: string;
  /** Cover image to use as the link preview instead of the drawn card. */
  image?: string;
  imageAlt?: string;
  jsonLd?: object;
  children: ReactNode;
};

/** Shell for the blog pages: a quiet top bar back to the portfolio, then the content. */
const BlogLayout = ({
  title,
  description,
  path,
  letterTitle,
  image,
  imageAlt,
  jsonLd,
  children,
}: Props) => (
  <div className="blog min-h-screen bg-charcoal text-white">
    <Seo
      title={title}
      description={description}
      path={path}
      type={letterTitle ? "article" : "website"}
      image={image ? absolute(image) : ogImage(letterTitle, letterTitle ? "letter" : "home")}
      imageAlt={
        image && imageAlt
          ? imageAlt
          : letterTitle
            ? `${letterTitle}: a letter from Kristine Tuazon`
            : "Kristine Tuazon's mailbox"
      }
      jsonLd={jsonLd}
    />
    <Head>
      <link rel="icon" href="/favicon.svg" />
      <link
        rel="alternate"
        type="application/rss+xml"
        title="kristineCodes; mailbox"
        href="/mailbox/rss.xml"
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
        href="/mailbox"
        className="font-audreyMedium uppercase tracking-widest text-white hover:text-creme"
      >
        Mailbox
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
