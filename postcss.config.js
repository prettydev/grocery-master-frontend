const purgecss = [
  "@fullhuman/postcss-purgecss",
  {
    content: [
      "./*.{ts,tsx}",
      "./pages/**/*.{ts,tsx}",
      "./containers/**/*.{ts,tsx}",
      "./components/**/*.{ts,tsx}",
    ],
    defaultExtractor: (content) => {
      const broadMatches = content.match(/[^<>"'`\\s]*[^<>"'`\\s:]/g) || [];
      const innerMatches =
        content.match(/[^<>"'`\\s.()]*[^<>"'`\\s.():]/g) || [];
      return broadMatches.concat(innerMatches);
    },
  },
];
module.exports = {
  plugins: [
    "tailwindcss",
    // process.env.NODE_ENV === "production" ? purgecss : undefined,
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009",
        },
        stage: 3,
        features: {
          "custom-properties": false,
        },
      },
    ],
  ],
};
