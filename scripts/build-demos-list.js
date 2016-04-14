const fs = require('fs');
const path = require('path');
const R = require('ramda');
const utils = require('./utils');

const isDemo = R.compose(R.test(/\/demo$/i), path.dirname);
module.exports = function buildDemosList(dirs, outputPath) {
  const mds = utils.findMDFile(dirs);
  const demos = R.filter(isDemo, mds);
  const groupedDemos = R.groupBy((fileName) => {
    const parts = fileName.split(path.sep);
    const demoIndex = parts.indexOf('demo');
    const relativeIndex = path.join(parts.slice(0, demoIndex).join(path.sep), 'index.md');
    return relativeIndex;
  }, demos);

  let content =
        'const React  = require("react");\n' +
        'const ReactDOM = require("react-dom");\n' +
        'module.exports = {';
  Object.keys(groupedDemos).forEach((key) => {
    content += `\n  '${key}': [`;
    groupedDemos[key].forEach((fileName) => {
      const requirePath = path.relative(path.dirname(outputPath), fileName);
      content += `\n    require('${requirePath}'),`;
    });
    content += '\n  ],';
  });
  content += '\n};\n';

  // Extract preview as a component
  content +=
    'Object.keys(module.exports).map((key) => module.exports[key])\n' +
    '  .forEach((demos) => {\n' +
    '    demos.forEach((demo) => {\n' +
    '      if (typeof demo.preview !== "function") return;\n' +
    '      demo.preview = demo.preview(React, ReactDOM);\n' +
    '    });\n' +
    '  });';

  fs.writeFile(outputPath, content);
};
