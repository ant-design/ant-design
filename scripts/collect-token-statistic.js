/* eslint-disable import/no-unresolved,no-console,global-require,import/no-dynamic-require */

const chalk = require('chalk');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const ProgressBar = require('progress');
const { statistic } = require('../components/theme/util/statistic');
const { DesignTokenContext } = require('../components/theme/internal');
const seedToken = require('../components/theme/themes/seed');

console.log(chalk.green(`🔥 Collecting token statistics...`));

const EmptyElement = React.createElement('div');

const styleFiles = glob.globSync(
  path.join(
    process.cwd(),
    'components/!(version|config-provider|icon|locale-provider|auto-complete|col|row|time-picker|)/style/index.?(ts|tsx)',
  ),
);

const bar = new ProgressBar('🚀 Collecting by component: [:bar] :component (:current/:total)', {
  complete: '=',
  incomplete: ' ',
  total: styleFiles.length,
});

styleFiles.forEach((file) => {
  const pathArr = file.split('/');
  const styleIndex = pathArr.lastIndexOf('style');
  const componentName = pathArr[styleIndex - 1];
  bar.tick(1, { component: componentName });
  let useStyle = () => {};
  if (file.includes('grid')) {
    const { useColStyle, useRowStyle } = require(file);
    useStyle = () => {
      useRowStyle();
      useColStyle();
    };
  } else {
    useStyle = require(file).default;
  }
  const Component = () => {
    useStyle('file');
    return EmptyElement;
  };
  ReactDOMServer.renderToString(React.createElement(Component));
  // Render wireframe
  ReactDOMServer.renderToString(
    React.createElement(
      DesignTokenContext.Provider,
      { value: { token: { ...seedToken, wireframe: true } } },
      React.createElement(Component),
    ),
  );
});

(() => {
  const tokenPath = `${process.cwd()}/components/version/token.json`;
  fs.writeJsonSync(tokenPath, statistic, 'utf8');

  console.log(chalk.green(`✅  Collected token statistics successfully, check it in`), tokenPath);
})();
