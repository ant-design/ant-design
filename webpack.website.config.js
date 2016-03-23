module.exports = function(webpackConfig) {
  webpackConfig.entry = {
    index: './site/entry/index.jsx',
  };
  webpackConfig.resolve.root = process.cwd();
  webpackConfig.resolve.alias = {
    antd: 'index',
    BrowserDemo: 'site/component/BrowserDemo',
  };

  return webpackConfig;
};
