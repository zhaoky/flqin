module.exports = {
  "root": true,
  "parser": "babel-eslint",
  "plugins": ["prettier"],
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': ['google', "plugin:prettier/recommended"],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'rules': {
  },
};
