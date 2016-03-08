'use strict';

const fs = require('fs');
const path = require('path');
const R = require('ramda');

const isMDFile = R.compose(R.equals('.md'), path.extname);
exports.findMDFile = function findMDFile(fileName, shallow) {
  const filePaths = Array.isArray(fileName) ? fileName : [fileName];
  let mds = [];

  R.forEach((filePath) => {
    const stat = fs.statSync(filePath);
    if (stat.isFile() && isMDFile(filePath)) {
      mds.push(filePath);
    }
    if (stat.isDirectory()) {
      const indexFile = path.join(filePath, 'index.md');
      let hasIndexFile = false;
      try {
        hasIndexFile = fs.statSync(indexFile).isFile();
      } catch (e) {}

      if (shallow && hasIndexFile) {
        mds.push(indexFile);
      } else {
        const subFiles = fs.readdirSync(filePath)
                .map((subFile) => path.join(filePath, subFile));
        mds = mds.concat(findMDFile(subFiles, shallow));
      }
    }
  }, filePaths);

  return mds;
};

exports.stringify = function stringify(data, d) {
  const depth = d || 1;
  const indent = '  '.repeat(depth);
  let output = '';
  if (Array.isArray(data)) {
    output += '[\n';
    data.forEach((item) => output += indent + stringify(item, depth + 1) + ',\n');
    output += indent + ']';
  } else if (data === null) {
    return 'null';
  } else if (typeof data === 'object') {
    output += '{\n';
    for (const key of Object.keys(data)) {
      output += indent + JSON.stringify(key) + ': ' + stringify(data[key], depth + 1) + ',\n';
    }
    output += indent + '}';
  } else if (typeof data === 'function') {
    output += data.toString();
  } else if (typeof data === 'string') {
    output += JSON.stringify(data);
  } else {
    output += data;
  }
  return output
    .replace(/var _antd = require\(['"]antd['"]\);/, '')
    .replace(/require\('antd\/lib/, 'require(\'../../components'); // TODO
};
