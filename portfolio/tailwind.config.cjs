/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: '400px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    // Theme colors come from CSS variables (src/styles/globals.css), so the
    // light theme can swap them: "charcoal" is the page background and "white"
    // the main text, whichever theme is on. `ink` and `paper` never change; use
    // them on things that are always light, like the scrapbook notes.
    colors: {
      orange: "rgb(var(--c-orange) / <alpha-value>)",
      mint: "rgb(var(--c-mint) / <alpha-value>)",
      creme: "rgb(var(--c-creme) / <alpha-value>)",
      coffee: "rgb(var(--c-coffee) / <alpha-value>)",
      charcoal: "rgb(var(--c-charcoal) / <alpha-value>)",
      white: "rgb(var(--c-white) / <alpha-value>)",
      plum: "rgb(var(--c-plum) / <alpha-value>)",
      pink: "#c88e95",
      ink: "#2B2129",
      paper: "#FBF6EA",
      // blackboard: "#OC1301",
    },
    fontFamily: {
      title: ['Audrey_Normal','Zen Maru Gothic', 'serif'],
      heading: ['Audrey_Normal', 'Zen Maru Gothic', 'serif'],
      audreyNormal: ['Audrey_Normal', 'Zen Maru Gothic', 'serif'],
      audreyOblique: ['Audrey_Normal_Oblique', 'Zen Maru Gothic', 'serif'],
      audreyMedium: ['Audrey_Medium', 'Zen Maru Gothic', 'serif'],
      audreyMediumOblique: ['Audrey_Medium_Oblique', 'Zen Maru Gothic', 'serif'],
      audreyBold: ['Audrey_Bold', 'Zen Maru Gothic', 'serif'],
      aurdreyBoldOblique: ['Audrey_Bold_Oblique', 'Zen Maru Gothic', 'serif'],
      bodyExtraLight: ['Petrona_ExtraLight', 'Zen Maru Gothic', 'serif'],
      bodyLight: ['Petrona_Light', 'Zen Maru Gothic', 'serif'],
      bodyRegular: ['Petrona_Regular', 'Zen Maru Gothic', 'serif'],
      bodyThin: ['Petrona_Thin', 'Zen Maru Gothic', 'serif'],
      bodyRegularItalic: ['Petrona_Italic', 'Zen Maru Gothic', 'serif'],
      bodyThinItalic: ['Petrona_Thin_Italic', 'Zen Maru Gothic', 'serif'],
    },
    extend: {
      // Blog post styling (the `prose` classes), in the site's palette and fonts.
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "rgb(var(--c-white))",
            "--tw-prose-headings": "rgb(var(--c-white))",
            "--tw-prose-lead": "rgb(var(--c-creme))",
            "--tw-prose-links": "rgb(var(--c-creme))",
            "--tw-prose-bold": "rgb(var(--c-white))",
            "--tw-prose-counters": "rgb(var(--c-coffee))",
            "--tw-prose-bullets": "rgb(var(--c-coffee))",
            "--tw-prose-hr": "rgb(var(--c-mint))",
            "--tw-prose-quotes": "rgb(var(--c-creme))",
            "--tw-prose-quote-borders": "rgb(var(--c-orange))",
            "--tw-prose-captions": "rgb(var(--c-creme))",
            "--tw-prose-code": "rgb(var(--c-creme))",
            "--tw-prose-pre-code": "rgb(var(--c-white))",
            "--tw-prose-pre-bg": "rgb(var(--c-pre))",
            "--tw-prose-th-borders": "rgb(var(--c-mint))",
            "--tw-prose-td-borders": "rgb(var(--c-white) / 0.2)",
            fontFamily: theme("fontFamily.bodyLight").join(", "),
            "h1, h2, h3, h4": {
              fontFamily: theme("fontFamily.audreyMedium").join(", "),
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              fontWeight: "normal",
            },
            a: { textDecorationColor: "rgb(var(--c-orange))", textUnderlineOffset: "4px" },
            "a:hover": { color: "rgb(var(--c-white))" },
            strong: { fontFamily: theme("fontFamily.bodyRegular").join(", "), fontWeight: "normal" },
            img: { borderRadius: "0.5rem" },
            code: { fontWeight: "normal" },
            "code::before": { content: "none" },
            "code::after": { content: "none" },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
