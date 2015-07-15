var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var pkg = require('./package');

var entry = {};
entry[pkg.name] = './index.js';
entry[pkg.name + '-' + pkg.version] = './index.js';
entry['demo'] = './scripts/demo.js';

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
    react: "React",
    jquery: 'jQuery'
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
        'css?sourceMap&-restructuring!' + 'autoprefixer-loader!' + 'less?sourceMap'
      )
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(
        'css?sourceMap!' + 'autoprefixer-loader'
      )
    }]
  },

  plugins: [
    new ExtractTextPlugin('[name].css')
  ],

  devtool: 'source-map'
};
