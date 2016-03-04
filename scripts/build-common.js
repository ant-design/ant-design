'use strict';

const fs = require('fs');
const R = require('ramda');
const utils = require('./utils');

module.exports = function buildCommon(dirs, outputFile) {
  const mds = utils.findMDFile(dirs, true)
          .filter((file) => !/install_en\.md$/gi.test(file)); // TODO

  let content = 'module.exports = {';
  mds.forEach((md) => {
    content += `\n  '${md}': require('antd-md!../../${md}'),`;
  });
  content += '\n};';

  fs.writeFile(outputFile, content);
};
