/* eslint no-param-reassign: 0 */
// This config is for building dist files
const getWebpackConfig = require('@ant-design/tools/lib/getWebpackConfig');
const PacktrackerPlugin = require('@packtracker/webpack-plugin');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const darkVars = require('./scripts/dark-vars');

const { webpack } = getWebpackConfig;

// noParse still leave `require('./locale' + name)` in dist files
// ignore is better: http://stackoverflow.com/q/25384360
function ignoreMomentLocale(webpackConfig) {
  delete webpackConfig.module.noParse;
  webpackConfig.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
}

function addLocales(webpackConfig) {
  let packageName = 'antd-with-locales';
  if (webpackConfig.entry['antd.min']) {
    packageName += '.min';
  }
  webpackConfig.entry[packageName] = './index-with-locales.js';
  webpackConfig.output.filename = '[name].js';
}

function externalMoment(config) {
  config.externals.moment = {
    root: 'moment',
    commonjs2: 'moment',
    commonjs: 'moment',
    amd: 'moment',
  };
}

const webpackConfig = getWebpackConfig(false);
const webpackDarkConfig = getWebpackConfig(false);
if (process.env.RUN_ENV === 'PRODUCTION') {
  webpackConfig.forEach(config => {
    ignoreMomentLocale(config);
    externalMoment(config);
    addLocales(config);
    // Reduce non-minified dist files size
    config.optimization.usedExports = true;
    // skip codesandbox ci
    if (!process.env.CSB_REPO) {
      // https://docs.packtracker.io/uploading-your-webpack-stats/webpack-plugin
      config.plugins.push(
        new PacktrackerPlugin({
          project_token: '8adbb892-ee4a-4d6f-93bb-a03219fb6778',
          upload: process.env.CI === 'true',
          fail_build: true,
          exclude_assets: name => !['antd.min.js', 'antd.min.css'].includes(name),
        }),
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
        }),
      );
    }
  });

  webpackDarkConfig.forEach(config => {
    // rename default entry to dark entry
    Object.keys(config.entry).forEach(entryName => {
      config.entry[entryName.replace('antd', 'antd.dark')] = config.entry[entryName];
      delete config.entry[entryName];
    });

    // apply dark less variables
    config.module.rules.forEach(rule => {
      // filter less rule
      if (rule.test instanceof RegExp && rule.test.test('.less')) {
        rule.use[rule.use.length - 1].options.modifyVars = darkVars;
      }
    });

    // ignore emit dark entry js & js.map file
    config.plugins.push(new IgnoreEmitPlugin(/dark(.min)?\.js(\.map)?$/));

    // skip codesandbox ci
    if (!process.env.CSB_REPO) {
      // https://docs.packtracker.io/uploading-your-webpack-stats/webpack-plugin
      config.plugins.push(
        new PacktrackerPlugin({
          project_token: '8adbb892-ee4a-4d6f-93bb-a03219fb6778',
          upload: process.env.CI === 'true',
          fail_build: true,
          exclude_assets: name => !['antd.dark.min.js', 'antd.dark.min.css'].includes(name),
        }),
      );
    }
  });
}

module.exports = webpackConfig.concat(webpackDarkConfig);
