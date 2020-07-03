const path = require('path');
const {override, addWebpackAlias, addDecoratorsLegacy} = require('customize-cra');
const WebpackBar = require('webpackbar');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const addCustomize = () => config => {

  if (process.env.ANALYZE) {
    if (config.plugins) {
      config.plugins.push(
        new BundleAnalyzerPlugin()
      );
    }
  }
  if (config.plugins) {
    config.plugins.push(
      new WebpackBar({
        color: 'purple',
        name: 'ssr'
      })
    );
  }
  return config;
};


module.exports = override(
  addCustomize(),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
    'src': path.resolve(__dirname, 'src')
  }),
  addDecoratorsLegacy(["@babel/plugin-proposal-decorators", {"legacy": true}]),
);