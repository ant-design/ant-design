const $ = require('dekko');
const chalk = require('chalk');

$('dist')
  .isDirectory()
  .hasFile('antd-with-locales.js')
  .hasFile('antd-with-locales.js.map')
  .hasFile('antd-with-locales.min.js')
  .hasFile('antd-with-locales.min.js.map')
  .hasFile('antd.js')
  .hasFile('antd.js.map')
  .hasFile('antd.min.js')
  .hasFile('antd.min.js.map')
  .hasFile('reset.css');

// eslint-disable-next-line no-console
console.log(chalk.green('✨ `dist` directory is valid.'));
