'use strict';

const fs = require('fs');
const path = require('path');
const R = require('ramda');
const devil = require('./devil'); // TODO: extract as a module?
const utils = require('./utils');

const stringify = function stringify(data, d) {
  const depth = d || 1;
  const indent = '  '.repeat(depth);
  let output = '';
  if (Array.isArray(data)) {
    output += '[\n';
    data.forEach((item) => output += indent + stringify(item, depth + 1) + ',\n');
    output += indent + ']';
  } else if (typeof data === 'object') {
    output += '{\n';
    for (const key of Object.keys(data)) {
      output += indent + JSON.stringify(key) + ': ' + stringify(data[key], depth + 1) + ',\n';
    }
    output += indent + '}';
  } else if (typeof data === 'function') {
    output += data.toString();
  } else if (typeof data === 'string') {
    output += JSON.stringify(data);
  } else {
    output += data;
  }
  return output
    .replace(/var _antd = require\(['"]antd['"]\);/, '')
    .replace(/require\('antd\/lib/, 'require(\'../../components'); // TODO
};

const isIntro = function isIntro(element) {
  const type = element.type;
  return type !== 'h1' && type !== 'ul' && type !== 'code' && type !== 'hr';
};
const isCode = R.whereEq({ type: 'code', props: { lang: 'jsx' } });
const isStyle = R.whereEq({ type: 'code', props: { lang: 'css' } });
const getChildren = R.compose(R.prop('children'), R.defaultTo({}));
const sortByOrder = R.sortBy(R.prop('order'));
module.exports = function buildDemosList(demoList, outputPath) {
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
  const content = 'const React = require(\'react\');\n' +
          'const ReactDOM = require(\'react-dom\');\n' +
          'const _antd = require(\'../../\');\n' +
          'module.exports = ' +
          stringify(sortedDemosList, null, 2) + ';';

  fs.writeFile(outputPath, content);
};
