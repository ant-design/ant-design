#!/usr/bin/env node

/* eslint-disable */
'use strict';

const fs = require('fs');
const path = require('path');
const packageInfo = require('../package.json');

if (fs.existsSync(path.join(__dirname, '../lib'))) {
  // Build package.json version to lib/version/index.js
  // prevent json-loader needing in user-side
  const versionFilePath = path.join(process.cwd(), 'lib', 'version', 'index.js');
  const versionFileContent = fs.readFileSync(versionFilePath).toString();
  fs.writeFileSync(
    versionFilePath,
    versionFileContent.replace(`require('../../package.json')`, `{ version: '${packageInfo.version}' }`)
  );
  console.log('Wrote version into lib/version/index.js');

  // Build package.json version to lib/version/index.d.ts
  // prevent https://github.com/ant-design/ant-design/issues/4935
  const versionDefPath = path.join(process.cwd(), 'lib', 'version', 'index.d.ts');
  fs.writeFileSync(
    versionDefPath,
    `declare var _default: "${packageInfo.version}";\nexport default _default;\n`
  );
  console.log('Wrote version into lib/version/index.d.ts');
}

if (fs.existsSync(path.join(__dirname, '../dist'))) {
  // Build a entry less file to dist/antd.less
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
  console.log('Built a entry less file to dist/antd.less');
}
