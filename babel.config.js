module.exports = {
  presets: [['@babel/env', { modules: 'false' }]],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3
      }
    ]
  ]
};
