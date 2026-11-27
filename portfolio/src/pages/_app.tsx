import { type AppType } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { Analytics } from "@vercel/analytics/react";
import CornerControls from "../components/CornerControls";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  const { locale, pathname } = useRouter();
  return (
    <div>
      {/* Japanese pages, and mailbox pages with a Japanese letter on them. */}
      {(locale === "ja" || (pageProps as { hasJapanese?: boolean }).hasJapanese === true) && (
        <Head>
          {/* The site's fonts have no Japanese letters; this rounded one matches their feel. */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          {/* eslint-disable-next-line @next/next/no-page-custom-font -- in _app, so every Japanese page gets it; English pages skip the download */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;500;700&display=swap"
          />
        </Head>
      )}
      <CornerControls languages={pathname === "/" || pathname === "/projects"} />
      <Analytics />
      {/* A new language means new text: start the page (and its animations) fresh. */}
      <Component key={locale} {...pageProps} />
    </div>
  );
};

export default MyApp;
