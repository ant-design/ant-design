'use strict';

const fs = require('fs');
const path = require('path');
const R = require('ramda');
const buildDemosList = require('./build-demos-list');
const devil = require('./devil');
const utils = require('./utils');

const isMeta = R.complement(R.propEq('type', 'hr'));
const getMeta = R.prop('meta');
const getOrder = R.compose(parseInt, R.path(['meta', 'order']));
const getMenuItems = R.compose(
  R.groupBy(R.compose(R.defaultTo('topLevel'), R.prop('category'))),
  R.map(getMeta)
);
const sortByOrder = R.sortBy(getOrder);
const parseDemos = function parseDemos(fileName) {
  const demosPath = path.join(path.dirname(fileName), 'demo');
  const demosMDFild = utils.findMDFile(demosPath);

  return buildDemosList.parse(demosMDFild).docs; // TODO
};
const parse = function parse(fileName) {
  const fileContent = utils.parseFileContent(fileName);
  const meta = utils.parseMeta(fileContent);
  const description = R.map(
    (node) => {
      if (node.type === 'code' && node.props.lang === '__react') {
        return devil(node.children, ['React', 'antd']);
      }
      return node;
    },
    R.tail(R.dropWhile(isMeta, fileContent))
  );

  const demos = !utils.isIndex(fileName) ? null : parseDemos(fileName);

  return { meta, description, demos };
};
module.exports = function buildCommon(inputDir, outputFile) {
  const mds = utils.findMDFile(inputDir, true);

  let content = 'module.exports = {';
  mds.forEach((md) => {
    content += `\n  '${md}': require('antd-md!../../${md}'),`;
  });
  content += '\n};';

  fs.writeFile(outputFile, content);
};
