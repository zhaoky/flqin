module.exports = {
  plugins: {
    'postcss-preset-env': {},
    'postcss-pxtorem': {
      rootValue: 75,
      propList: ['*'],
      minPixelValue: 3,
      mediaQuery: false,
      exclude: /media/
    }
  }
};
