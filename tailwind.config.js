/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  daisyui: {
    themes: ["light", "dark", "lofi", "black"],
  },
  plugins: [require("daisyui")],
};
