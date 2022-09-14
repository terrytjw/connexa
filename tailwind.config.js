/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    theme: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: {
        blue: "#1f43f4",
        // purple: "#7e5bef",
        // pink: "#ff49db",
        // orange: "#ff7849",
        // green: "#13ce66",
        // yellow: "#ffc82c",
        // "gray-dark": "#273444",
        // gray: "#8492a6",
        // "gray-light": "#d3dce6",
      },
      fontFamily: {
        sans: ["Work Sans", "sans-serif"],
        // serif: ["Merriweather", "serif"],
      },
      extend: {
        spacing: {
          // 128: "32rem",
          // 144: "36rem",
        },
        borderRadius: {
          // "4xl": "2rem",
        },
      },
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/forms"),
  ],
};
