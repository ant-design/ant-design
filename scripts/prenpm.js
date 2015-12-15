var fs = require('fs');
var cwd = process.cwd();
var path = require('path');
var pkg = require('../package');

var originalIndex = fs.readFileSync(path.join(cwd, 'lib/index.js'), 'utf-8');
var newIndex = originalIndex
  .replace(/\/components\//g, '/')
  .replace(/require\(\'\.\/package.json\'\)/g, "require('./package')");
fs.writeFileSync(path.join(cwd, 'lib/index.js'), newIndex, 'utf-8');
fs.writeFileSync(
  path.join(cwd, 'lib/package.js'),
  "module.exports = " + JSON.stringify(require('../package.json')) + ";",
  'utf-8'
);
var antdCss = path.join(cwd, 'dist/index.css');
fs.createReadStream(antdCss)
  .pipe(fs.createWriteStream(path.join(cwd, 'lib/index.css')));
console.log('prenpm done');
