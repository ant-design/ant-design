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
    const demoIndex = parts.indexOf('demo');
    demo.parent = parts.slice(0, demoIndex).join('/') + '/index.md';
    demo.id = 'components-' + demo.parent + '-demo-' + path.basename(fileName, '.md');
    demo.title = data[0].children;
    demo.intro = data.filter(isIntro);
    demo.code = getChildren(data.find(isCode));
    demo.preview = devil(demo.code, ['React', 'ReactDOM', '_antd', 'BrowserDemo']);
    demo.style = getChildren(data.find(isStyle));

    return demo;
  }, demoList);

  const demosList = R.groupBy((demo) => demo.parent.replace('-', ''), demos);
  const sortedDemosList = R.mapObjIndexed(sortByOrder, demosList);
  return sortedDemosList;
};

module.exports = function buildDemosList(demoList, outputPath) {
  const groupedDemos = R.groupBy((fileName) => {
    const parts = fileName.split(path.sep);
    const demoIndex = parts.indexOf('demo');
    const relativeIndex = path.join(parts.slice(0, demoIndex).join(path.sep), 'index.md');
    return relativeIndex;
  }, demoList);

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
module.exports.parse = parseDemosList;
