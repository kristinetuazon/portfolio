import { Head, Html, Main, NextScript } from "next/document";

// No lang attribute here: Next.js sets lang="en" or lang="ja" from the page's locale.
export default function Document() {
  return (
    <Html>
      <Head />
      <body className="bg-charcoal">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
