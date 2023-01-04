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
    colors: {
      orange: "#DD8E58",
      mint: "#708A81",
      creme: "#E5D1B8",
      coffee: "#C2956E",
      charcoal: "#2B2129",
      white: "#F6FBF4",
      pink: "#c88e95",
      // blackboard: "#OC1301",
    },
    fontFamily: {
      title: ['Holipop', 'serif'],
      heading: ['Bargemo', 'serif'],
      audreyNormal: ['Audrey_Normal', 'serif'],
      audreyOblique: ['Audrey_Normal_Oblique', 'serif'],
      audreyMedium: ['Audrey_Medium', 'serif'],
      audreyMediumOblique: ['Audrey_Medium_Oblique', 'serif'],
      audreyBold: ['Audrey_Bold', 'serif'],
      aurdreyBoldOblique: ['Audrey_Bold_Oblique', 'serif'],
      bodyExtraLight: ['Petrona_ExtraLight', 'serif'],
      bodyLight: ['Petrona_Light', 'serif'],
      bodyRegular: ['Petrona_Regular', 'serif'],
      bodyThin: ['Petrona_Thin', 'serif'],
      bodyRegularItalic: ['Petrona_Italic', 'serif'],
      bodyThinItalic: ['Petrona_Thin_Italic', 'serif'],
    },
    extend: {},
  },
  plugins: [],
};
