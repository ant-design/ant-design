'use strict';

const fs = require('fs');
const R = require('ramda');
const utils = require('./utils');

module.exports = function buildComponentsList(indexes, outputPath) {
  const componentMetas = R.map((fileName) => {
    const fileContent = utils.parseFileContent(fileName);
    return utils.parseMeta(fileContent);
  }, indexes);

  const groupByType = R.groupBy(R.compose(R.defaultTo('其它'), R.prop('type')));
  const componentsList = groupByType(componentMetas);

  const content = 'module.exports = ' +
          JSON.stringify(componentsList, null, 2) + ';';

  fs.writeFile(outputPath, content);
};
