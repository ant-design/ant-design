const $ = require('dekko');
const chalk = require('chalk');

$('dist')
  .isDirectory()
  .hasFile('antd.css')
  .hasFile('antd.min.css')
  .hasFile('antd.js')
  .hasFile('antd.min.js');

// eslint-disable-next-line
console.log(chalk.green('✨ `dist` directory is valid.'));
