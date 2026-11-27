/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  // English at "/", Japanese at "/ja". No automatic redirect based on the
  // browser's language: visitors pick with the EN / 日本語 switch.
  i18n: { locales: ["en", "ja"], defaultLocale: "en", localeDetection: false },
  // The RSS feed reads posts at request time, so the Markdown (and the images
  // the loader checks for) must ship with that server function. Mailbox pages
  // themselves are built ahead of time.
  outputFileTracingIncludes: {
    "/mailbox/rss.xml": ["./content/blog/**/*", "./public/blog/**/*"],
    "/sitemap.xml": ["./content/blog/**/*", "./public/blog/**/*"],
    // Fonts for the link-preview images.
    "/api/og": [
      "./Assets/Fonts/Audrey_Body/Audrey-Medium.otf",
      "./Assets/Fonts/Petrona_Body/static/Petrona-Italic.ttf",
    ],
  },
  // The blog was renamed "mailbox": keep old links working.
  // (Only page URLs; images still live at /blog/<post>/<file>, two segments deep.)
  async redirects() {
    return [
      { source: "/blog", destination: "/mailbox", permanent: true },
      { source: "/blog/:slug", destination: "/mailbox/:slug", permanent: true },
      // The letters (and the sitemap) are only in English.
      { source: "/ja/sitemap.xml", destination: "/sitemap.xml", locale: false, permanent: false },
      {
        source: "/ja/mailbox/:path*",
        destination: "/mailbox/:path*",
        locale: false,
        permanent: false,
      },
    ];
  },
  images: {
    // The dango / onigiri artwork is SVG.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default config;
