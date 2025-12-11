/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        fugazone: ["Fugaz One", ...fontFamily.sans],
      },
      gap: {
        0: "0px",
        1: "0.25rem",
        0.5: "0.5rem",
        2: "2rem",
        3: "3rem",
        15: "1.5rem",
      },
      screens: {
        xs: "360px",
        xxs: "340px",
      },
      animation: {
        lightFlow: "lightFlow 3s linear infinite",
      },
      keyframes: {
        lightFlow: {
          "0%": { top: "-100%" },
          "100%": { top: "150%" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-motion")],
};
