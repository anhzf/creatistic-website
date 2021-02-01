const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    './pages/**/*.js',
    './components/**/*.js',
    './pages/**/*.jsx',
    './components/**/*.jsx',
    './pages/**/*.ts',
    './components/**/*.ts',
    './pages/**/*.tsx',
    './components/**/*.tsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'blue-gray': colors.blueGray,
      },
      fontFamily: {
        mont: [
          'mont',
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
  variants: {
    extend: {
      borderRadius: ['first', 'last'],
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [],
}
