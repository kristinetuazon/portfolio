import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTs,
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
  // Config files that tools load as CommonJS.
  { files: ["**/*.cjs"], rules: { "@typescript-eslint/no-require-imports": "off" } },
];

export default config;
