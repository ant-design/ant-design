var webpack = require('webpack');
var config = require('./webpack.config');

delete config.devtool;
config.entry.demo = [config.entry.demo[0]];
config.plugins.push(new webpack.optimize.UglifyJsPlugin({
  sourceMap: false,
  output: {
    ascii_only: true
  }
}));

module.exports = config;
