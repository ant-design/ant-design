// webpack.config.production.js
// release full dist files
var pkg = require('./package');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = require("./webpack.config.js");

delete config.entry.demo;
delete config.entry[pkg.name];
delete config.devtool;

module.exports = config;
