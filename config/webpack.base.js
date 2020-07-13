const path = require('path')
const isEnvProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isEnvProduction ? 'production' : 'development',
  module: {
    rules: [{
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
          ["@babel/plugin-proposal-decorators", {"legacy": true}],
          ["@babel/plugin-proposal-class-properties", {"loose": true}],
          // ["import", { "libraryName": "antd", "style": true }]
          ["react-loadable/babel"]
        ]
      }
    }]
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