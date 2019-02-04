const $ = require('dekko');
const chalk = require('chalk');

try {
  $('lib')
    .isDirectory()
    .hasFile('index.js')
    .hasFile('index.d.ts');

  $('lib/*')
    .filter(filename => !filename.endsWith('index.js') && !filename.endsWith('index.d.ts'))
    .isDirectory()
    .filter(filename => !filename.endsWith('style') && !filename.endsWith('_util'))
    .hasFile('index.js')
    .hasFile('index.d.ts')
    .hasDirectory('style');

  $('lib/*/style')
    .hasFile('css.js')
    .hasFile('index.js');

  $('lib/style').hasFile('v2-compatible-reset.css');
} catch (error) {
  // eslint-disable-next-line
  console.log(chalk.red('✨ ' + error));
}
