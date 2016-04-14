const fs = require('fs');
const cwd = process.cwd();
const path = require('path');
const originalIndex = fs.readFileSync(path.join(cwd, 'lib/index.js'), 'utf-8');
const newIndex = originalIndex
  .replace(/\/components\//g, '/');
fs.writeFileSync(path.join(cwd, 'lib/index.js'), newIndex, 'utf-8');
const antdCss = path.join(cwd, 'dist/antd.css');
fs.createReadStream(antdCss)
  .pipe(fs.createWriteStream(path.join(cwd, 'lib/index.css')));
console.log('prenpm done');
