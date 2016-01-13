var webpack = require('webpack');
var config = require('./webpack.config');

delete config.devtool;
config.plugins.push(new webpack.optimize.UglifyJsPlugin({
  sourceMap: false,
  output: {
    ascii_only: true
  }
}));

module.exports = config;
