const path = require('path')
const nodeExternals = require('webpack-node-externals')
const merge = require('webpack-merge')
const config = require('./webpack.base')
const {OUTPUTSERVER, OUTPUTCLIENT} = require("./outputPath")

const outputPath = `../${OUTPUTSERVER}`

const serverConfig = {
  target: 'node',
  // https://webpack.docschina.org/configuration/externals/
  externals: [nodeExternals()], // 为了忽略node_modules文件夹中的所有模块
  entry: path.resolve(__dirname, '../server/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, outputPath),
    publicPath: '/'  // **
  },
  module: {
    rules: [
      {
        test: [/\.css|less$/],
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
          outputPath: `../${OUTPUTCLIENT}/img`,
          publicPath: '/img'
        }
      }
    ]
  }
}

module.exports = merge(config, serverConfig)