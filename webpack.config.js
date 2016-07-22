const getWebpackConfig = require('antd-tools/lib/getWebpackConfig');

module.exports = function (webpackConfig) {
  webpackConfig = getWebpackConfig(webpackConfig);
  if (process.env.RUN_ENV === 'PRODUCTION') {
    // Fix ie8 compatibility
    webpackConfig[0].module.loaders.unshift({
      test: /\.(tsx|jsx?)$/,
      loader: 'es3ify-loader',
    });
  }
  return webpackConfig;
};
