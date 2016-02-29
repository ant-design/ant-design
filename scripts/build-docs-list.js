'use strict';

const fs = require('fs');
const R = require('ramda');
const utils = require('./utils');

const isMeta = R.complement(R.propEq('type', 'hr'));
const isDescription = R.complement(R.propEq('children', 'API'));
module.exports = function buildDocsList(indexes, outputPath) {
  const indexesList = R.map((fileName) => {
    const fileContent = utils.parseFileContent(fileName);
    const meta = utils.parseMeta(fileContent);
    const description = R.tail(R.dropWhile(
      isMeta,
      R.takeWhile(isDescription, fileContent)
    ));
    const api = R.dropWhile(isDescription, fileContent);

    return { meta, description, api };
  }, indexes);

  const content = 'module.exports = ' +
          JSON.stringify(indexesList, null, 2) + ';';

  fs.writeFile(outputPath, content);
};
