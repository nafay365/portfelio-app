/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: 'class',
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        tertiary: "var(--color-tertiary)",
        "black-100": "var(--color-black-100)",
        "black-200": "var(--color-black-200)",
        "white-100": "var(--color-white-100)",
      },
      boxShadow: {
        card: "0px 35px 120px -15px var(--color-shadow)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "var(--hero-bg, url('/src/assets/herobg.png'))",
        "hero-pattern-light": "url('/src/assets/herobg.png')",
        "hero-pattern-dark": "url('/src/assets/herobg-dark.png')",
      },
    },
  },
  plugins: [],
};
