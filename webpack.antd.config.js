module.exports = function(webpackConfig) {
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
  return webpackConfig;
};
