module.exports = function(webpackConfig) {
  webpackConfig.entry = {
    index: './site/entry/index.jsx',
  };
  return webpackConfig;
};
