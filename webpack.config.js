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
    webpackConfig.entry = {
      'antd': ['./style/index.less', './index.js']
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
  }

  return webpackConfig;
};
