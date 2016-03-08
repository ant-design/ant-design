'use strict';

const fs = require('fs');
const path = require('path');
const R = require('ramda');
const utils = require('./utils');

const isDemo = R.compose(R.test(/\/demo$/i), path.dirname);
module.exports = function buildDemosList(dirs, outputPath) {
  const mds = utils.findMDFile(dirs);
  const demos = R.filter(isDemo, mds);
  const groupedDemos = R.groupBy((fileName) => {
    const parts = fileName.split(path.sep);
    const demoIndex = parts.indexOf('demo');
    const relativeIndex = path.join(parts.slice(0, demoIndex).join(path.sep), 'index.md');
    return relativeIndex;
  }, demos);

  let content = 'module.exports = {';
  Object.keys(groupedDemos).forEach((key) => {
    content += `\n  '${key}': [`;
    groupedDemos[key].forEach((fileName) => {
      content += `\n    require('antd-md?demo&fileName=${fileName}!../../${fileName}'),`;
    });
    content += '\n  ],'
  });
  content += '\n};';

  fs.writeFile(outputPath, content);
};
