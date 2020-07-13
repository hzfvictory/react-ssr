const path = require('path')
const nodeExternals = require('webpack-node-externals')
const merge = require('webpack-merge')
const config = require('./webpack.base')
const {OUTPUTSERVER} = require("./outputPath")

const outputPath = `../${OUTPUTSERVER}`

const serverConfig = {
  target: 'node',
  // https://webpack.docschina.org/configuration/externals/
  externals: [nodeExternals()], // 为了忽略node_modules文件夹中的所有模块
  entry: path.resolve(__dirname, '../server/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, outputPath),
    publicPath: '/'  // ** 这里路径一点要搞对
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
      }
    ]
  }
}

module.exports = merge(config, serverConfig)