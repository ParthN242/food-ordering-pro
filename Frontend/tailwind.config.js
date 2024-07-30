/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        md2: "448px",
      },
      colors: {
        primary: "#f13a01",
        darkPrimary: "rgb(216 ,54 ,4)",
        card: "rgb(229 231 235)",
        textColor: "rgb(107 114 128)",
        headingColor: "#000000",
      },
    },
  },
  plugins: [],
};
