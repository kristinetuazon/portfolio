import Head from "next/head";
import { absolute, SITE_NAME } from "../lib/site";

type Props = {
  title: string;
  description: string;
  /** The page's path without a locale prefix, e.g. "/" or "/mailbox/why-programming". */
  path: string;
  /** Absolute URL of the link-preview image. */
  image: string;
  imageAlt: string;
  type?: "website" | "article";
  locale?: "en" | "ja";
  /** The page also exists in Japanese at "/ja" + path. */
  hasJapanese?: boolean;
  /** schema.org data for search engines. */
  jsonLd?: object;
};

const withLocale = (locale: "en" | "ja", path: string) =>
  absolute(locale === "ja" ? `/ja${path === "/" ? "" : path}` : path);

/** Title, description, canonical link, language alternates, link previews and structured data. */
const Seo = ({
  title,
  description,
  path,
  image,
  imageAlt,
  type = "website",
  locale = "en",
  hasJapanese = false,
  jsonLd,
}: Props) => {
  const url = withLocale(locale, path);
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {hasJapanese && (
        <>
          <link rel="alternate" hrefLang="en" href={withLocale("en", path)} />
          <link rel="alternate" hrefLang="ja" href={withLocale("ja", path)} />
          <link rel="alternate" hrefLang="x-default" href={withLocale("en", path)} />
        </>
      )}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={locale === "ja" ? "ja_JP" : "en_US"} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {jsonLd && (
        <script
          type="application/ld+json"
          // JSON with "<" escaped, so a title can't close the script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      )}
    </Head>
  );
};

export default Seo;
