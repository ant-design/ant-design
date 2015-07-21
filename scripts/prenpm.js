var fs = require('fs');
var cwd = process.cwd();
var path = require('path');
var pkg = require('../package');

var originalIndex = fs.readFileSync(path.join(cwd, 'index.js'), 'utf-8');
var newIndex = originalIndex
  .replace(/\/components\//g, '/')
  .replace("require('./package.json').version", "'" + require('../package.json').version + "'")
  .replace("require('./style/index.less')", "require('./index.css')");
fs.writeFileSync(path.join(cwd, 'lib/index.js'), newIndex, 'utf-8');

var antdCss = path.join(cwd, 'dist/' + pkg.name + '-' + pkg.version + '.css');
fs.createReadStream(antdCss)
  .pipe(fs.createWriteStream(path.join(cwd, 'lib/index.css')));
console.log('prenpm done');
