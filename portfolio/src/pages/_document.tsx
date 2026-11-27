import { Head, Html, Main, NextScript } from "next/document";
import { THEME_SCRIPT } from "../components/ThemeToggle";

// No lang attribute here (and no data-theme: the script sets it): Next.js sets lang="en" or lang="ja" from the page's locale.
export default function Document() {
  return (
    <Html>
      <Head>
        {/* Apply a saved light theme before the first paint. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </Head>
      <body className="bg-charcoal">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
