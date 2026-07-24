import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: [
      ".agents/**",
      ".claude/**",
      ".next/**",
      ".opencode/**",
      ".velite/**",
      "node_modules/**",
      "out/**",
    ],
  },
  ...nextVitals,
];

export default config;
