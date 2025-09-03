/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  darkMode: 'class', // or 'class'
  theme: {
    accentColor: ({ theme }) => ({
      ...theme('colors'),
      auto: 'auto',
    }),
  },
  plugins: [],
}

