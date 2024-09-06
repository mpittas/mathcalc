/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem'
      },
      screens: {
        xl: '1180px'
      }
    }
  },
  plugins: []
}
