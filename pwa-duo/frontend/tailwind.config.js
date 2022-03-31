module.exports = {
  darkMode: "media",
  content: [
    "./src/**/*.{js,vue,ts}",
    "./public/index.html",
    "./src/*.{js,vue,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
