const path = require('path');
const {override, addWebpackAlias, addDecoratorsLegacy, fixBabelImports, addLessLoader} = require('customize-cra');
const WebpackBar = require('webpackbar');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

const addCustomize = () => (config) => {
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
      }),
      new AntdDayjsWebpackPlugin()
    );
  }

  const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
  // 开启cssmodules
  loaders[3].use[1].options.modules = true;

  return config;
};


module.exports = override(
  addCustomize(),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
    'src': path.resolve(__dirname, 'src')
  }),
  addDecoratorsLegacy(["@babel/plugin-proposal-decorators", {"legacy": true}]),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  })
);