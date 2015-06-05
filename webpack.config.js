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
    loaders: [
      {test: /\.jsx?$/, loader: 'babel'},
      {test: /\.json$/, loader: 'json-loader'},
      {test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")},
      {test: /\.css/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")}
    ]
  },

  plugins: [
    new ExtractTextPlugin("[name].css")
  ],

  devtool: "#source-map"
};
