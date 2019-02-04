const $ = require('dekko');
const chalk = require('chalk');

try {
  $('dist')
    .isDirectory()
    .hasFile('antd.css')
    .hasFile('antd.min.css')
    .hasFile('antd.js')
    .hasFile('antd.min.js');
} catch (error) {
  // eslint-disable-next-line
  console.log(chalk.red('✨ ' + error));
}
