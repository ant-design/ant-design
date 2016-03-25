'use strict';

const fs = require('fs');
const path = require('path');
const R = require('ramda');
const utils = require('./utils');

module.exports = function buildCommon(dirs, outputFile) {
  const mds = utils.findMDFile(dirs, true)
          .filter((file) => !/install_en\.md$/gi.test(file)); // TODO

  let content = 'module.exports = {';
  mds.forEach((fileName) => {
    const requirePath = path.relative(path.dirname(outputFile), fileName);
    content += `\n  '${fileName}': require('antd-md!${requirePath}'),`;
  });
  content += '\n};';

  fs.writeFile(outputFile, content);
};
