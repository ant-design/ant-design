const webpack = require('webpack');
const getWebpackConfig = require('antd-tools/lib/getWebpackConfig');

function ignoreMomentLocale(webpackConfig) {
  delete webpackConfig.module.noParse;
  webpackConfig.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
}

module.exports = function (webpackConfig) {
  webpackConfig = getWebpackConfig(webpackConfig);
  if (process.env.RUN_ENV === 'PRODUCTION') {
    // Fix ie8 compatibility
    webpackConfig[0].module.loaders.unshift({
      test: /\.(tsx|jsx?)$/,
      loader: 'es3ify-loader',
    });
    // noParse still leave `require('./locale' + name)` in dist files
    // ignore is better
    // http://stackoverflow.com/q/25384360
    ignoreMomentLocale(webpackConfig[0]);
    ignoreMomentLocale(webpackConfig[1]);
  }
  return webpackConfig;
};
