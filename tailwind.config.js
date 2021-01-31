const defaultTheme = require('tailwindcss/defaultTheme');

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
    },
  },
  plugins: [],
}
