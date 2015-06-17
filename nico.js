var path = require('path');
var package = require('./package');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackConfig = require('./webpack.config');
var webpackCompiler = webpack(webpackConfig);
var handler;

// {{ settings for nico
exports.site = {
  name: package.title,
  description: package.description,
  repo: package.repository.url,
  issues: package.bugs.url
};
exports.theme = 'site';
exports.source = process.cwd();
exports.output = path.join(process.cwd(), '_site');
exports.permalink = '{{directory}}/{{filename}}';
exports.ignorefilter = function(filepath, subdir) {
  var extname = path.extname(filepath);
  if (extname === '.tmp' || extname === '.bak') {
    return false;
  }
  if (/\.DS_Store/.test(filepath)) {
    return false;
  }
  if (/^(_site|_theme|node_modules|\.idea)/.test(subdir)) {
    return false;
  }
  return true;
};
exports.middlewares = [{
  name: 'webpackDevMiddleware',
  filter: /antd\.(js|css)(\.map)?$/,
  handle: function(req, res, next) {
    handler = handler || webpackMiddleware(webpackCompiler, {
      publicPath: '/dist/',
      lazy: false,
      watchDelay: 300,
      stats: {
        hash: false,
        cached: false,
        cachedAssets: false,
        colors: true
      }
    });
    try {
      return handler(req, res, next);
    } catch(e) {}
  }
}];
exports.writers = [
  'nico-jsx.PageWriter',
  'nico-jsx.StaticWriter',
  'nico-jsx.FileWriter'
];
// end settings }}
