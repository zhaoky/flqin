module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 75,
      propList: ['*'],
      minPixelValue: 3,
      mediaQuery: false,
      exclude: /media/
    }
  }
};
