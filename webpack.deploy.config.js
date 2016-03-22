var webpack = require('webpack');
var config = require('./webpack.config');

delete config.devtool;
config.entry.demo = [config.entry.demo[0]];

config.plugins = [config.plugins[0], new webpack.optimize.UglifyJsPlugin({
  sourceMap: false,
  output: {
    ascii_only: true
  },
  compress: {
    warnings: false
  }
})];

config.module.loaders.forEach(function(loader) {
  if (loader.loader === 'babel') {
    // remove preset hmre
    loader.query.presets = loader.query.presets.slice(0, 3);
  }
  return loader;
});

module.exports = config;
