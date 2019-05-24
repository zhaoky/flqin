module.exports = {
  presets: ["@babel/env"],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: 3
      }
    ]
  ]
};
