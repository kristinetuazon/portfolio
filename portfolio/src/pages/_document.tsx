import { Head, Html, Main, NextScript } from "next/document";
import { THEME_SCRIPT } from "../components/ThemeToggle";

// No lang attribute here (and no data-theme: the script sets it): Next.js sets lang="en" or lang="ja" from the page's locale.
export default function Document() {
  return (
    <Html>
      <Head>
        {/* Apply a saved light theme before the first paint. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        {/* The two fonts in the intro (the first thing on screen). */}
        <link
          rel="preload"
          href="/fonts/Audrey-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Petrona-Thin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <body className="bg-charcoal">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
