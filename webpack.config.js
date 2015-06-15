var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

module.exports = {
  entry: {
    antd: './index.js'
  },

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
        'css?sourceMap!' +
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
    new ExtractTextPlugin('[name].css'),
    new webpack.NewWatchingPlugin()
  ],

  devtool: '#source-map'
};
