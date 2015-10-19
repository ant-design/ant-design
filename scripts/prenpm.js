var fs = require('fs');
var cwd = process.cwd();
var path = require('path');
var pkg = require('../package');

var originalIndex = fs.readFileSync(path.join(cwd, 'index.js'), 'utf-8');
var newIndex = originalIndex
  .replace(/\/components\//g, '/')
  .replace("require('./package.json').version", "require('./version')")
fs.writeFileSync(path.join(cwd, 'lib/index.js'), newIndex, 'utf-8');
fs.writeFileSync(path.join(cwd, 'lib/version.js'), "module.exports = '" + require('../package.json').version + "';", 'utf-8');

console.log('prenpm done');
