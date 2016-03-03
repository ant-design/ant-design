'use strict';

const fs = require('fs');
const R = require('ramda');
const utils = require('./utils');

const isMeta = R.complement(R.propEq('type', 'hr'));
const getMeta = R.prop('meta');
const getOrder = R.compose(parseInt, R.path(['meta', 'order']));
const getMenuItems = R.compose(
  R.groupBy(R.compose(R.defaultTo('topLevel'), R.prop('category'))),
  R.map(getMeta)
);
const sortByOrder = R.sortBy(getOrder);
const parse = function parse(fileName) {
  const fileContent = utils.parseFileContent(fileName);
  const meta = utils.parseMeta(fileContent);
  const description = R.tail(R.dropWhile(isMeta, fileContent));

  return { meta, description };
};
module.exports = function buildCommon(inputDir, outputFile) {
  const mds = utils.findMDFile(inputDir, true);
  const parsed = sortByOrder(R.map(parse, mds));

  const result = {
    menuItems: getMenuItems(parsed),
    pagesData: parsed,
  };

  const content = 'module.exports = ' +
          JSON.stringify(result, null, 2) + ';';
  fs.writeFile(outputFile, content);
};
