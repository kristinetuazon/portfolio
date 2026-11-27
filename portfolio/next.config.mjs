/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  // The RSS feed reads posts at request time, so the Markdown must ship with
  // that server function. (Blog pages themselves are built ahead of time.)
  outputFileTracingIncludes: {
    "/blog/rss.xml": ["./content/blog/**/*"],
  },
  images: {
    // The dango / onigiri artwork is SVG.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default config;
