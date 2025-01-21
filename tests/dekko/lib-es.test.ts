import $ from 'dekko';
import chalk from 'chalk';

$('lib').isDirectory().hasFile('index.js').hasFile('index.d.ts');

$('lib/*')
  .filter(
    (filename: string) => !['index.js', 'index.d.ts', '.map'].some((ext) => filename.endsWith(ext)),
  )
  .isDirectory()
  .filter((filename: string) => !['style', '_util', 'locale'].some((ext) => filename.endsWith(ext)))
  .hasFile('index.js')
  .hasFile('index.d.ts');

console.log(chalk.green('✨ `lib` directory is valid.'));

$('es').isDirectory().hasFile('index.js').hasFile('index.d.ts');

$('es/*')
  .filter(
    (filename: string) => !['index.js', 'index.d.ts', '.map'].some((ext) => filename.endsWith(ext)),
  )
  .isDirectory()
  .filter((filename: string) => !['style', '_util', 'locale'].some((ext) => filename.endsWith(ext)))
  .hasFile('index.js')
  .hasFile('index.d.ts');

console.log(chalk.green('✨ `es` directory is valid.'));
