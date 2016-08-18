/* eslint strict: 0 */
'use strict';

const fs = require('fs');
const path = require('path');
const utils = require('./utils');

module.exports = function buildCommon(dirs, outputFile) {
  const mds = utils.findMDFile(dirs, true)
    .filter((file) => !/\/demo$/i.test(path.dirname(file)))
    .filter((file) => !/install_en\.md$/gi.test(file)); // TODO

  const addedMd = [];
  let content = 'module.exports = {';
  mds.forEach((fileName) => {
    const localeId = path.basename(fileName, '.md').split('.')[1];
    const simplifiedFileName = fileName.replace(`.${localeId}`, '');
    if (addedMd.indexOf(simplifiedFileName) > -1) return;

    const isLocalized = ['zh-CN', 'en-US'].indexOf(localeId) > -1;
    if (isLocalized) {
      content += `\n  '${simplifiedFileName}': {` +
        '\n    localized: true,' +
        `\n    'zh-CN': require('${path.relative(path.dirname(outputFile), fileName.replace(localeId, 'zh-CN'))}'),` +
        `\n    'en-US': require('${path.relative(path.dirname(outputFile), fileName.replace(localeId, 'en-US'))}'),` +
        '\n  },';
      addedMd.push(simplifiedFileName);
    } else {
      const requirePath = path.relative(path.dirname(outputFile), fileName);
      content += `\n  '${simplifiedFileName}': require('${requirePath}'),`;
    }
  });
  content += '\n};';

  fs.writeFile(outputFile, content);
};
