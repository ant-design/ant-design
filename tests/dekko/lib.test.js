const $ = require('dekko');
const chalk = require('chalk');

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

// eslint-disable-next-line
console.log(chalk.green('✨ `lib` directory is valid.'));
