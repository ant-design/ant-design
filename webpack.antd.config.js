var config = require('./webpack.config');
config.entry = {
  'antd': ['./index.js']
};
config.externals = {
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
config.output.library = 'antd';
config.output.libraryTarget = 'umd';
module.exports = config;