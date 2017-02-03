#!/usr/bin/env node

/* eslint-disable */
'use strict';

// Build a entry less file to dist/antd.less
const fs = require('fs');
const path = require('path');
const packageInfo = require('../package.json');

if (fs.existsSync(path.join(__dirname, '../dist'))) {
  fs.writeFileSync(path.join(process.cwd(), 'lib', 'version.js'), `
module.exports = '${packageInfo.version}';
`);

  const antdV = `
  (function(root) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports.version = '${packageInfo.version}';
	else
		root["antd"].version = '${packageInfo.version}';
})(this);
`;

  const antdPath = path.join(process.cwd(), 'dist', 'antd.js');
  const antdMinPath = path.join(process.cwd(), 'dist', 'antd.min.js');

  if (fs.existsSync(antdPath)) {
    const content = fs.readFileSync(antdPath, 'utf-8');
    const minContent = fs.readFileSync(antdMinPath, 'utf-8');
    fs.writeFileSync(antdPath, `
${content}
${antdV}
`);
    fs.writeFileSync(antdMinPath, `
${minContent}
${antdV}
`);
  }

  console.log('Building a entry less file to dist/antd.less');
  const componentsPath = path.join(process.cwd(), 'components');
  let componentsLessContent = '';

  // Build components in one file: lib/style/components.less
  fs.readdir(componentsPath, function (err, files) {
    files.forEach(function (file) {
      if (fs.existsSync(path.join(componentsPath, file, 'style', 'index.less'))) {
        componentsLessContent += `@import "../${path.join(file, 'style', 'index.less')}";\n`
      }
    });
    fs.writeFileSync(path.join(process.cwd(), 'lib', 'style', 'components.less'), componentsLessContent);

    // Build less entry file: dist/antd.less
    fs.writeFileSync(
      path.join(process.cwd(), 'dist', 'antd.less'),
      '@import "../lib/style/index.less";\n@import "../lib/style/components.less";'
    );
  });
}
