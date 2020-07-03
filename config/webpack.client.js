const path = require('path')
const merge = require('webpack-merge')
const config = require('./webpack.base')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {ReactLoadablePlugin} = require('react-loadable/webpack');
const {OUTPUTCLIENT} = require("./outputPath")

const outputPath = `../${OUTPUTCLIENT}`

const clientConfig = {
  mode: 'development',
  entry: path.resolve(__dirname, '../src/client/index.js'),
  module: {
    rules: [
      {
        test: /\.css?$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            }
          }
        ]
      },
      {
        test: /\.(png|jpeg|jpg|gif|svg)?$/,
        loader: 'url-loader',
        options: {
          limit: 8000,
          outputPath: outputPath,
          publicPath: '/'
        }
      }
    ]
  },
  output: {
    filename: 'index.[chunkhash:6].js', // 'index.[chunkhash:6].js',
    path: path.resolve(__dirname, outputPath),
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ReactLoadablePlugin({
      filename: path.resolve(__dirname, outputPath + '/react-loadable.json'),
    }),
  ]
}

module.exports = merge(config, clientConfig)