var path = require('path');
var package = require('./package');
var webpack = require('webpack');
var inspect = require('util').inspect;
var Busboy = require('busboy');
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
exports.package = package;
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
  if (/^(_site|_theme|node_modules|site|\.idea)/.test(subdir)) {
    return false;
  }
  return true;
};
exports.middlewares = [
  {
    name: 'upload',
    filter: /upload\.do?$/,
    handle: function(req, res, next) {
      if (req.method === 'POST') {
        var busboy = new Busboy({headers: req.headers});
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
          console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
          file.on('data', function(data) {
            console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
          });
          file.on('end', function() {
            console.log('File [' + fieldname + '] Finished');
          });
        });
        busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
          console.log('Field [' + fieldname + ']: value: ' + inspect(val));
        });
        busboy.on('finish', function() {
          console.log('Done parsing form!');
          //res.writeHead(303, { Connection: 'close', Location: '/' });
          res.end('success');
        });
        req.pipe(busboy);
      }
    }
  },
  {
  name: 'webpackDevMiddleware',
  filter: /\.(js|css)(\.map)?$/,
  handle: function(req, res, next) {
    handler = handler || webpackMiddleware(webpackCompiler, {
      publicPath: '/dist/',
      lazy: true,
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

process.on('uncaughtException', function(err) {
  console.log(err);
});
