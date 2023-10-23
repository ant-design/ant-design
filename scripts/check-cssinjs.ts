/* eslint-disable no-console */
import {
  StyleProvider,
  legacyNotSelectorLinter,
  logicalPropertiesLinter,
  parentSelectorLinter,
} from '@ant-design/cssinjs';
import chalk from 'chalk';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { generateCssinjs } from './generate-cssinjs';

console.log(chalk.green(`🔥 Checking CSS-in-JS...`));

let errorCount = 0;
const originError = console.error;
console.error = (msg: any) => {
  if (msg.includes('Warning: [Ant Design CSS-in-JS]')) {
    errorCount += 1;
    console.log(chalk.red(`❌ `), msg.slice(msg.indexOf('Error in')).replace(/\s+/g, ' '));
  } else {
    originError(msg);
  }
};

(async () => {
  await generateCssinjs({
    key: 'check',
    render(Component: any) {
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
})();
