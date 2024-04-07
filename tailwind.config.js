/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}", // Or similar path to your 'pages' components
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        global: "#1F1F1F",
      },
    },
  },
  plugins: [],
};