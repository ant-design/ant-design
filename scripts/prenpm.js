var fs = require('fs');
var cwd = process.cwd();
var path = require('path');
var originalIndex = fs.readFileSync(path.join(cwd, 'lib/index.js'), 'utf-8');
var newIndex = originalIndex
  .replace(/\/components\//g, '/');
fs.writeFileSync(path.join(cwd, 'lib/index.js'), newIndex, 'utf-8');
var antdCss = path.join(cwd, 'dist/antd.css');
fs.createReadStream(antdCss)
  .pipe(fs.createWriteStream(path.join(cwd, 'lib/index.css')));
console.log('prenpm done');
