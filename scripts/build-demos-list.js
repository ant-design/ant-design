'use strict';

const fs = require('fs');
const path = require('path');
const R = require('ramda');
const devil = require('./devil'); // TODO: extract as a module?
const utils = require('./utils');

const isIntro = function isIntro(element) {
  const type = element.type;
  return type !== 'h1' && type !== 'ul' && type !== 'code' && type !== 'hr';
};
const isCode = R.whereEq({ type: 'code', props: { lang: 'jsx' } });
const isStyle = R.whereEq({ type: 'code', props: { lang: 'css' } });
const getChildren = R.compose(R.prop('children'), R.defaultTo({}));
const sortByOrder = R.sortBy(R.prop('order'));
const parseDemosList = function parseDemosList(demoList) {
  const demos = R.map((fileName) => {
    const data = utils.parseFileContent(fileName);
    const parts = fileName.split(path.sep);

    const demo = {};
    demo.order = parseInt(utils.parseMeta(data).order);
    demo.parent = parts[parts.indexOf('components') + 1];
    demo.id = 'components-' + demo.parent + '-demo-' + path.basename(fileName, '.md');
    demo.title = data[0].children;
    demo.intro = data.filter(isIntro);
    demo.code = getChildren(data.find(isCode));
    demo.preview = devil(demo.code);
    demo.style = getChildren(data.find(isStyle));

    return demo;
  }, demoList);

  const demosList = R.groupBy((demo) => demo.parent.replace('-', ''), demos);
  const sortedDemosList = R.mapObjIndexed(sortByOrder, demosList);
  return sortedDemosList;
};

module.exports = function buildDemosList(demoList, outputPath) {
  const parsedDemosList = parseDemosList(demoList);
  const content = 'const React = require(\'react\');\n' +
          'const ReactDOM = require(\'react-dom\');\n' +
          'const _antd = require(\'../../\');\n' +
          'module.exports = ' +
          utils.stringify(parsedDemosList, null, 2) + ';';

  fs.writeFile(outputPath, content);
};
module.exports.parse = parseDemosList;
