/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  // The RSS feed reads posts at request time, so the Markdown (and the images
  // the loader checks for) must ship with that server function. Mailbox pages
  // themselves are built ahead of time.
  outputFileTracingIncludes: {
    "/mailbox/rss.xml": ["./content/blog/**/*", "./public/blog/**/*"],
  },
  // The blog was renamed "mailbox": keep old links working.
  // (Only page URLs; images still live at /blog/<post>/<file>, two segments deep.)
  async redirects() {
    return [
      { source: "/blog", destination: "/mailbox", permanent: true },
      { source: "/blog/:slug", destination: "/mailbox/:slug", permanent: true },
    ];
  },
  images: {
    // The dango / onigiri artwork is SVG.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default config;
