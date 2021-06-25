// tailwind.config.js
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        'almost': 'calc(100vh - 200px)',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}