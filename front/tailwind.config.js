/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#778bd9",
        secondary: "#a9c8f6",
        terciary: "#d8edf5",
        dark: "#151515",
        backgroudDark: "#444",
        backgroudLigth: "#f0f6f7",
      },
    },
  },
  plugins: [],
};
