const sassResourcesLoader = require('craco-sass-resources-loader');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, 
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    {
      plugin: sassResourcesLoader,
      options: {
        resources: './src/scss/main.scss',
      },
    },
  ],
}
