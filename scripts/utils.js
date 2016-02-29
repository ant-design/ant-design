'use strict';

const fs = require('fs');
const path = require('path');
const R = require('ramda');

const isMDFile = R.compose(R.equals('.md'), path.extname);
exports.findMDFile = function findMDFile(dirPath) {
  let mds = [];

  R.forEach((fileName) => {
    const filePath = path.join(dirPath, fileName);
    const stat = fs.statSync(filePath);
    if (stat.isFile() && isMDFile(filePath)) {
      mds.push(filePath);
    }
    if (stat.isDirectory()) {
      mds = mds.concat(findMDFile(filePath));
    }
  }, fs.readdirSync(dirPath));

  return mds;
};
exports.isIndex = R.compose(R.equals('index.md'), R.unary(path.basename));
exports.isDemo = R.complement(exports.isIndex);

const MT = require('mark-twain');
exports.parseFileContent = R.pipe(
  fs.readFileSync,
  R.toString,
  MT,
  R.prop('content')
);

const parseBasicMeta = R.pipe(
  R.path(['1', 'children']),
  R.map((child) => R.split(/:\s?/, child.children[0].children)),
  R.fromPairs
);
const parseEnglishTitle = R.path(['0', 'children']);
exports.parseMeta = function parseMeta(fileContent) {
  const meta = parseBasicMeta(fileContent);
  meta.english = parseEnglishTitle(fileContent);
  meta.title = `${meta.english} ${meta.chinese || ''}`;

  return meta;
};
