/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    // The dango / onigiri artwork is SVG.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default config;
