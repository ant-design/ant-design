const $ = require('dekko');
const chalk = require('chalk');

$('lib/version')
  .isDirectory()
  .hasFile('index.js')
  .hasFile('index.d.ts');

$('lib/style')
  .isDirectory()
  .hasFile('components.less');

$('dist')
  .isDirectory()
  .hasFile('antd.less');

// eslint-disable-next-line
console.log(chalk.green('✨ Pre-publish `dist` files is valid.'));
