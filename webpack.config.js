const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const WebpackBar = require('webpackbar');
const packageJson = require('./package.json');
const WebpackStylish = require('webpack-stylish');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // prettier-ignore
const _DEV_ = process.env.NODE_ENV === 'development';

const config = {
  mode: process.env.NODE_ENV || 'production',
  entry: path.resolve(__dirname, './src/index.js'),
  devtool: 'eval',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: _DEV_ ? 'bundle.js' : 'bundle.[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['happypack/loader?id=babel']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'images/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory']
    }),
    new WebpackStylish(),
    new WebpackBar(),
    new webpack.BannerPlugin(`${packageJson.name} v${packageJson.version}`)
  ]
};
if (_DEV_) {
  config.devtool = 'eval-source-map';
  config.devServer = {
    stats: 'errors-only',
    overlay: true,
    contentBase: path.join(__dirname, 'dist')
  };
  config.module.rules.push(
    {
      test: /\.less$/,
      use: ['happypack/loader?id=less']
    },
    {
      test: /\.css/,
      use: ['happypack/loader?id=css']
    }
  );
  config.plugins.push(
    new HappyPack({
      id: 'less',
      loaders: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
    }),
    new HappyPack({
      id: 'css',
      loaders: ['style-loader', 'css-loader', 'postcss-loader']
    })
  );
} else {
  config.stats = 'none';
  config.module.rules.push(
    {
      test: /\.less$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'less-loader'
      ]
    },
    {
      test: /\.css/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
    }
  );
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),
    new OptimizeCssAssetsPlugin()
  );
  config.optimization = {
    runtimeChunk: { name: 'runtime' },
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        commons: {
          minChunks: 2,
          name: 'commons',
          reuseExistingChunk: true
        },
        vendors: {
          priority: 1,
          name: 'vendors',
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]/
        },
        styles: {
          priority: 2,
          enforce: true,
          name: 'styles',
          chunks: 'initial',
          test: /\.(css|less)$/
        }
      }
    }
  };
}
if (process.env.MODE === 'analysis') {
  config.plugins.push(new BundleAnalyzerPlugin());
}
module.exports = config;
