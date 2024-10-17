/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "white-100": "#f3f3f3",
        header: "#003366",
        background: "#070029",
        accent: "#D6A9F3",
        middle: "#B388EB",
        secondAccent: "#FFFFFF",
      },
      boxShadow: {
        card: "0px 10px 40px -15px #004080",
        glow: "0 0 25px rgba(64, 224, 208, 0.8)",
      },
      screens: {
        xs: "350px",
      },
      scale: {
        105: "1.05",
      },
    },
  },
  plugins: [],
};
