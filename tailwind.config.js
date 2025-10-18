/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        glass: 'rgba(255,255,255,0.06)'
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.3)'
      },
      backdropBlur: {
        xs: '2px'
      }
    },
  },
  plugins: [],
}
