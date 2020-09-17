const path = require('path');
const WebpackBar = require('webpackbar');
const WebpackStylish = require('webpack-stylish');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const _DEV_ = process.env.NODE_ENV === 'development';
const _SEO_ = process.env.BUILD_TYPE === 'seo';

const config = {
  mode: process.env.NODE_ENV || 'production',
  entry: {
    main: path.resolve(__dirname, `./src/js/${_SEO_ ? 'index-seo.js' : 'index.js'}`)
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: _DEV_ ? 'bundle.js' : '[name].[chunkhash:8].js',
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader?cacheDirectory']
      },
      {
        test: /\.(c|le)ss$/,
        use: [MiniCssExtractPlugin.loader, `css-loader?sourceMap=${_DEV_}`, 'postcss-loader', 'less-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'assets/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `src/template/${_SEO_ ? 'index-seo.html' : 'index.html'}`,
      favicon: 'src/assets/favicon.ico'
    }),
    new MiniCssExtractPlugin({
      filename: _DEV_ ? 'css/[name].css' : '[name].[contenthash:8].css',
      chunkFilename: _DEV_ ? 'css/[name].css' : '[name].[contenthash:8].css'
    }),
    new WebpackStylish(),
    new WebpackBar()
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: 1,
          name: 'vendors',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/
        }
      }
    }
  }
};

if (_DEV_) {
  config.devtool = 'eval-source-map';
  config.devServer = {
    host: '0.0.0.0',
    port: 8080,
    stats: 'errors-only',
    overlay: true,
    contentBase: path.join(__dirname, 'dist')
  };
} else {
  config.stats = 'none';
  config.plugins.push(
    new OptimizeCssAssetsPlugin(),
    new ScriptExtHtmlWebpackPlugin({
      inline: [/runtime\.[a-z0-9]{8}\.js$/],
      preload: {
        chunks: 'initial',
        test: [/vendors\.[a-z0-9]{8}\.js$/, /main\.[a-z0-9]{8}\.js$/]
      }
    })
  );
}
if (process.env.MODE === 'analysis') {
  config.plugins.push(new BundleAnalyzerPlugin());
}
module.exports = config;
