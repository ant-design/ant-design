var webpack = require('webpack');

module.exports = {
  entry: './index.js',

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  output: {
    path: 'dist',
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
      {test: /\.css/, loader: 'style!css'}
    ]
  },
};
