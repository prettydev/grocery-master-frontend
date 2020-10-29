const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  // purge: [
  //   "./*.{ts,tsx}",
  //   "./pages/**/*.{ts,tsx}",
  //   "./containers/**/*.{ts,tsx}",
  //   "./components/**/*.{ts,tsx}",
  // ],
  purge: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [
    require("@tailwindcss/ui")({
      layout: "sidebar",
    }),
  ],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
