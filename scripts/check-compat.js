/* eslint-disable no-await-in-loop, no-console */

const path = require('path');
const glob = require('glob');
const fs = require('fs-extra');
const chalk = require('chalk');

const KEY_LIST = ['Object.values', 'Object.entries'];

(async () => {
  console.time('Execution...');

  const files = glob.sync(path.join(process.cwd(), 'components/[!_]**/*.?(ts|tsx|js|jsx)'));

  files.forEach(filePath => {
    const content = fs.readFileSync(filePath);

    KEY_LIST.forEach(key => {
      if (content.includes(key)) {
        console.log(filePath);
        console.log(
          '  ',
          `${chalk.red('error')}:`,
          `'${chalk.yellow(key)}' not support in old version browser.`,
        );
        process.exit(1);
      }
    });
  });
})();
