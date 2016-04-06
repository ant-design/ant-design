const webpack = require('atool-build/lib/webpack');

module.exports = function(webpackConfig) {
  if (process.env.ANTD === 'WEBSITE') {
    webpackConfig.entry = {
      index: './site/entry/index.jsx',
    };
    webpackConfig.resolve.root = process.cwd();
    webpackConfig.resolve.alias = {
      antd: 'index',
      BrowserDemo: 'site/component/BrowserDemo',
    };
  }

  if (process.env.ANTD === 'PRODUCTION') {
    const entry = ['./style/index.less', './index.js'];
    webpackConfig.entry = {
      'antd.min': entry,
    };
    webpackConfig.externals = {
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
    };
    webpackConfig.output.library = 'antd';
    webpackConfig.output.libraryTarget = 'umd';

    const uncompressedWebpackConfig = Object.assign({}, webpackConfig);
    uncompressedWebpackConfig.entry = {
      antd: entry,
    };
    uncompressedWebpackConfig.plugins = webpackConfig.plugins.filter((plugin) => {
      return !(plugin instanceof webpack.optimize.UglifyJsPlugin);
    });

    return [
      webpackConfig,
      uncompressedWebpackConfig,
    ];
  }

  return webpackConfig;
};
