// This config is for building dist files
const webpack = require('webpack');
const getWebpackConfig = require('antd-tools/lib/getWebpackConfig');
const WebpackBar = require('webpackbar');

// noParse still leave `require('./locale' + name)` in dist files
// ignore is better
// http://stackoverflow.com/q/25384360
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

function usePrettyWebpackBar(config) {
  // remove old progress plugin.
  config.plugins = config.plugins
    .filter((plugin) => {
      return !(plugin instanceof webpack.ProgressPlugin)
        && !(plugin instanceof WebpackBar);
    });

  // use brand new progress bar.
  config.plugins.push(
    new WebpackBar({
      name: '📦  Webpack',
      minimal: false,
    })
  );
}

const webpackConfig = getWebpackConfig(false);
if (process.env.RUN_ENV === 'PRODUCTION') {
  webpackConfig.forEach((config) => {
    ignoreMomentLocale(config);
    externalMoment(config);
    addLocales(config);
    usePrettyWebpackBar(config);
  });
}

module.exports = webpackConfig;
