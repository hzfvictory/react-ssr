const path = require('path')
const nodeExternals = require('webpack-node-externals')
const merge = require('webpack-merge')
const config = require('./webpack.base')
const {OUTPUTSERVER, OUTPUTCLIENT} = require("./outputPath")

const outputPath = `../${OUTPUTSERVER}`

const serverConfig = {
  target: 'node',
  mode: 'development',
  entry: path.resolve(__dirname, '../server/index.js'),
  // https://webpack.docschina.org/configuration/externals/
  externals: [nodeExternals()], // 为了忽略node_modules文件夹中的所有模块
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules|antd\.css/,
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
          outputPath: `../${OUTPUTCLIENT}`,
          publicPath: '/'
        }
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, outputPath),
    publicPath: '/'  // 重点
  }
}

module.exports = merge(config, serverConfig)