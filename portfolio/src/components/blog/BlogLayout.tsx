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
  /** Language of the letter on this page. */
  lang?: "en" | "ja";
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
  lang = "en",
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
      contentLang={lang}
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

/** "27 November 2026", or "2026年11月27日" for a Japanese letter. */
export const formatDate = (iso: string, lang: "en" | "ja" = "en") =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString(lang === "ja" ? "ja-JP" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

/** The little bits of text around a letter, in the letter's own language. */
export const LETTER_COPY = {
  en: {
    from: "a letter from Kristine",
    read: (minutes: number) => `${minutes} min read`,
    open: (title: string) => `Open the letter: ${title}`,
    updated: (date: string) => `Last updated ${date}`,
    back: "← Back to all letters",
    stamp: "",
  },
  ja: {
    from: "クリスティンからの手紙",
    read: (minutes: number) => `${minutes}分で読めます`,
    open: (title: string) => `手紙を開く：${title}`,
    updated: (date: string) => `${date} 更新`,
    back: "← お手紙一覧へもどる",
    stamp: "日本語",
  },
};

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
