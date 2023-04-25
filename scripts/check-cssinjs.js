/* eslint-disable import/no-unresolved,no-console,global-require,import/no-dynamic-require */
const chalk = require('chalk');
const {
  StyleProvider,
  logicalPropertiesLinter,
  legacyNotSelectorLinter,
  parentSelectorLinter,
} = require('@ant-design/cssinjs');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { generateCssinjs } = require('./generate-cssinjs');

console.log(chalk.green(`🔥 Checking CSS-in-JS...`));

let errorCount = 0;
const originError = console.error;
console.error = (msg) => {
  if (msg.includes('Warning: [Ant Design CSS-in-JS]')) {
    errorCount += 1;
    console.log(chalk.red(`❌ `), msg.slice(msg.indexOf('Error in')).replace(/\s+/g, ' '));
  } else {
    originError(msg);
  }
};

generateCssinjs({
  key: 'check',
  render: (Component) => {
    ReactDOMServer.renderToString(
      React.createElement(
        StyleProvider,
        { linters: [logicalPropertiesLinter, legacyNotSelectorLinter, parentSelectorLinter] },
        React.createElement(Component),
      ),
    );
  },
});

if (errorCount > 0) {
  console.log(chalk.red(`❌  CSS-in-JS check failed with ${errorCount} errors.`));
  process.exit(1);
} else {
  console.log(chalk.green(`✅  CSS-in-JS check passed.`));
}
