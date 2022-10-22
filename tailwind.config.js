/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "Work Sans", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      keyframes: {
        shake: {
          "0%, 50%": { transform: "translateX(-2px)" },
          "25%, 75%": { transform: "translateX(2px)" },
        },
      },
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/forms"),
  ],
};
