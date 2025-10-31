// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <--- Essential for watching all your components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}