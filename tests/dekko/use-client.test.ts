import $ from 'dekko';
import chalk from 'chalk';
import fs from 'node:fs';

const includeUseClient = (filename: string) =>
  fs.readFileSync(filename).toString().includes('"use client"');
const isIndexProxy = (filename: string) => fs.existsSync(filename.slice(0, -3));

$('dist/*')
  .isFile()
  .assert("doesn't contain use client", (filename: string) => !includeUseClient(filename));
$('{es,lib}/index.js')
  .isFile()
  .assert('contain use client', (filename: string) => includeUseClient(filename));
$('{es,lib}/*/index.js')
  .isFile()
  .assert('contain use client', (filename: string) => includeUseClient(filename));

// check tsx files
$('{es,lib}/typography/*.js')
  .isFile()
  .filter((filename: string) => !isIndexProxy(filename))
  .assert('contain use client', (filename: string) => includeUseClient(filename));

$('{es,lib}/typography/Base/*.js')
  .isFile()
  .filter((filename: string) => !filename.endsWith('/util.js'))
  .assert('contain use client', (filename: string) => includeUseClient(filename));

console.log(chalk.green('✨ use client passed!'));
