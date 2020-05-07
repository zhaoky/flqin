const path = require('path');
const HappyPack = require('happypack');
const WebpackBar = require('webpackbar');
const WebpackStylish = require('webpack-stylish');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // prettier-ignore
const _DEV_ = process.env.NODE_ENV === 'development';

const config = {
  mode: process.env.NODE_ENV || 'production',
  entry: {
    main: path.resolve(__dirname, './src/index.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: _DEV_ ? 'bundle.js' : 'js/[name].[chunkhash:8].js'
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
      template: 'src/index.html',
      favicon: 'src/assets/favicon.ico'
    }),
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory']
    }),
    new WebpackStylish(),
    new WebpackBar()
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
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../'
          }
        },
        'css-loader',
        'postcss-loader',
        'less-loader'
      ]
    },
    {
      test: /\.css/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../'
          }
        },
        'css-loader',
        'postcss-loader'
      ]
    }
  );
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),
    new OptimizeCssAssetsPlugin(),
    new ScriptExtHtmlWebpackPlugin({
      inline: [/runtime\.[a-z0-9]{8}\.js$/],
      preload: {
        chunks: 'initial',
        test: [/vendors\.[a-z0-9]{8}\.js$/, /main\.[a-z0-9]{8}\.js$/]
      }
    }),
    new StyleExtHtmlWebpackPlugin({
      cssRegExp: /vendors\.[a-z0-9]{8}\.css$/
    })
  );
  config.optimization = {
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
  };
}
if (process.env.MODE === 'analysis') {
  config.plugins.push(new BundleAnalyzerPlugin());
}
module.exports = config;
