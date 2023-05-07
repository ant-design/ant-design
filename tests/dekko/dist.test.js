const $ = require('dekko');

$('dist')
  .isDirectory()
  .hasFile('antd-with-locales.js')
  .hasFile('antd-with-locales.min.js')
  .hasFile('antd.js')
  .hasFile('antd.min.js')
  .hasFile('reset.css');

(async function printLog() {
  const { default: chalk } = await import('chalk');
  // eslint-disable-next-line no-console
  console.log(chalk.green('✨ `dist` directory is valid.'));
})();
