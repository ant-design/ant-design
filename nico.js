var path = require('path');
var webpackMiddleware = require("webpack-dev-middleware");
var webpack = require('webpack');

// {{ settings for nico
exports.site = {
  name: 'Ant Design'
};
exports.theme = 'theme';
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
exports.writers = [
  'nico-jsx.PageWriter',
  'nico-jsx.StaticWriter',
  'nico-jsx.FileWriter'
];
exports.middlewares = [{
  name: 'webpack',
  filter: /index\.js/,
  handle: webpackMiddleware(webpack(require('./webpack.config')), {
    // all options optional

    noInfo: false,
    // display no info to console (only warnings and errors)

    watchDelay: 300,
    // delay after change (only lazy: false)

    publicPath: "/dist/",
    // public path to bind the middleware to
    // use the same as in webpack

    headers: { "X-Custom-Header": "yes" },
    // custom headers

    stats: {
      colors: true
    }
    // options for formating the statistics
  })
}];
// end settings }}
