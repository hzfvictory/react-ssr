const path = require('path')
const {OUTPUTCLIENT} = require("./outputPath")

const outputPath = `../${OUTPUTCLIENT}`
const isEnvProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isEnvProduction ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', ['@babel/preset-env', {
            targets: {
              browsers: ['last 2 versions']
            }
          }]],
          plugins: [
            "react-loadable/babel",
            ["@babel/plugin-proposal-decorators", {"legacy": true}],
            ["@babel/plugin-proposal-class-properties", {"loose": true}]
            // ["import", {"libraryName": "antd","libraryDirectory": 'es', "style": 'css'}]
          ]
        }
      },
      {
        test: /\.(png|jpeg|jpg|gif|svg)?$/,
        loader: 'url-loader',
        options: {
          limit: 8000,
          outputPath: outputPath + '/img',
          publicPath: '/img'
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      'src': path.resolve(__dirname, '../src')
    },
    // 省略后缀
    extensions: ['.js', '.jsx', '.less', '.json', '.css'],
  },
}