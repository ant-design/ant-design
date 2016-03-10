'use strict';

const fs = require('fs');
const R = require('ramda');
const utils = require('./utils');

module.exports = function buildCommon(dirs, outputFile) {
  const mds = utils.findMDFile(dirs, true)
          .filter((file) => !/install_en\.md$/gi.test(file)); // TODO

  let content = 'module.exports = {';
  mds.forEach((fileName) => {
    content += `\n  '${fileName}': require('antd-md?fileName=${fileName}!../../${fileName}'),`;
  });
  content += '\n};';

  fs.writeFile(outputFile, content);
};
