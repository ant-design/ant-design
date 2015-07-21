// webpack.config.production.js
// release full dist files
var pkg = require('./package');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = require("./webpack.config.js");

config.plugins = [
  new ExtractTextPlugin('[name].css')
];
delete config.entry.demo;
delete config.entry[pkg.name];

module.exports = config;
