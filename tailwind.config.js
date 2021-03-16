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
  darkMode: 'class', // or 'media' or 'class'
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
      backgroundColor: ['even', 'odd'],
      borderRadius: ['first', 'last'],
      cursor: ['disabled'],
      opacity: ['disabled'],
      scale: ['active', 'group-hover'],
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
