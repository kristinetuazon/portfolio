/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      orange: "#DD8E58",
      mint: "#708A81",
      creme: "#E5D1B8",
      coffee: "#C2956E",
      charcoal: "#2B2129",
    },
    fontFamily: {
      title: ['Holipop', 'serif'],
      heading: ['Bargemo', 'serif'],
      bodyNormal: ['Audrey_Normal', 'serif'],
      bodyOblique: ['Audrey_Normal_Oblique', 'serif'],
      bodyMedium: ['Audrey_Medium', 'serif'],
      bodyMediumOblique: ['Audrey_Medium_Oblique', 'serif'],
      bodyBold: ['Audrey_Bold', 'serif'],
      bodyBoldOblique: ['Audrey_Bold_Oblique', 'serif'],
      bodyExtraLight: ['Petrona_ExtraLight', 'serif'],
      bodyLight: ['Petrona_Light', 'serif'],
    },
    extend: {},
  },
  plugins: [],
};
