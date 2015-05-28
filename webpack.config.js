var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './index.js',

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: 'index.js'
  },

  externals: {
    react: "React"
  },

  module: {
    loaders: [
      {test: /\.jsx$/, loader: 'jsx-loader?harmony'},
      {test: /\.js$/, loader: 'jsx-loader?harmony'},
      {test: /\.json$/, loader: 'json-loader'},
      {test: /\.less$/, loader: "style!css!less"},
      {test: /\.css/, loader: 'style!css'}
    ]
  },

  devtool: "#source-map"
};
