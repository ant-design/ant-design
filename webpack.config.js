var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var pkg = require('./package');

var entry = {};
entry[pkg.name] = './index.js';
entry[pkg.name + '-' + pkg.version] = './index.js';

module.exports = {
  entry: entry,

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[name].js'
  },

  externals: {
    react: "React"
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract(
        'css?sourceMap&-restructuring!' +
        'less?sourceMap'
      )
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(
        'css?sourceMap'
      )
    }]
  },

  plugins: [
    new ExtractTextPlugin('[name].css')
  ],

  devtool: 'source-map'
};
