#!/usr/bin/env node

/* eslint-disable */
'use strict';

// Build a entry less file to dist/antd.less
var fs = require('fs');
var path = require('path');
var componentsPath = path.join(process.cwd(), 'components');
var entryLessContent = `@import "../lib/style/index.less";`;
console.log('Building a entry less file to dist/antd.less');

fs.readdir(componentsPath, function(err, files) {
  files.forEach(function(file) {
    if (fs.existsSync(path.join(componentsPath, file, 'style', 'index.less'))) {
      entryLessContent += `\n@import "../lib/${path.join(file, 'style', 'index.less')}";`
    }
  });
  fs.writeFileSync(path.join(process.cwd(), 'dist', 'antd.less'), entryLessContent);
});
