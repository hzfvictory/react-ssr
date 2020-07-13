const path = require('path')
const merge = require('webpack-merge')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

const config = require('./webpack.base')
const {OUTPUTCLIENT} = require("./outputPath")
const hasPublicPath = process.env.PUBLIC_PATH;

const outputPath = `../${OUTPUTCLIENT}`
// const externals = {
//   antd: 'antd'
// }

const clientConfig = {
  entry: path.resolve(__dirname, '../client/index.js'),
  output: {
    filename: 'js/[name].[chunkhash:8].js', // 'index.[chunkhash:8].js',
    path: path.resolve(__dirname, outputPath), // 输出文件路径
    publicPath: hasPublicPath ? hasPublicPath : '/'
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
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-preset-env')({
                  autoprefixer: {
                    flexbox: 'no-2009',
                  },
                  stage: 3,
                }),
              ]
            }
          },
          'less-loader',
        ]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new AntdDayjsWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {from: path.resolve(__dirname, '../public/favicon.ico'), to: path.resolve(__dirname, outputPath + '/img')},
        {from: path.resolve(__dirname, '../src/index.css'), to: path.resolve(__dirname, outputPath + '/css')},
      ],
      options: {}
    }),
    // new ReactLoadablePlugin({
    //   filename: path.resolve(__dirname, outputPath + '/react-loadable.json'),
    // }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
      }),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        common: {
          name: 'common',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
        },
        // 指定组件
        antd: {
          name: 'antd',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/,
        }
      }
    },
  }
}

module.exports = merge(config, clientConfig)