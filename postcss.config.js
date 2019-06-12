module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 32,
      propList: ['*'],
      minPixelValue: 3,
      mediaQuery: false
    }
  }
};
