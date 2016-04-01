var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var pkg = require('./package');
var autoprefixer = require('autoprefixer');

var entry = {};
entry['demo'] = ['./scripts/demo.js', 'webpack-hot-middleware/client'];

module.exports = {
  entry: entry,

  cache: true,

  resolve: {
    extensions: ['', '.js', '.jsx'],
    unsafeCache: true
  },

  noParse: /_site|node_modules/,

  output: {
    path: path.join(process.cwd(), 'dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'es3ify'
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        presets: ['es2015', 'react', 'stage-0', 'react-hmre'],
        plugins: ['add-module-exports']
      }
    }, {
      test: /\.json$/,
      exclude: /node_modules/,
      loader: 'json-loader'
    }, {
      test: /\.less$/,
      exclude: /node_modules/,
      loader: ExtractTextPlugin.extract(
        'css?sourceMap&-minimize!' + 'postcss-loader!' + 'less?sourceMap'
      )
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loader: ExtractTextPlugin.extract(
        'css?sourceMap&-minimize!' + 'postcss-loader'
      )
    }]
  },

  postcss: [
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8']
    })
  ],

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  devtool: 'cheap-module-source-map'
};
