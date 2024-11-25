const $ = require('dekko');
const chalk = require('chalk');
const fs = require('fs');

const includeUseClient = (filename) =>
  fs.readFileSync(filename).toString().includes('"use client"');

$('dist/*')
  .isFile()
  .assert("doesn't contain use client", (filename) => !includeUseClient(filename));
$('{es,lib}/index.js')
  .isFile()
  .assert('contain use client', (filename) => includeUseClient(filename));
$('{es,lib}/*/index.js')
  .isFile()
  .assert('contain use client', (filename) => includeUseClient(filename));

// check tsx files
$('{es,lib}/typography/*.js')
  .isFile()
  .assert('contain use client', (filename) => includeUseClient(filename));

$('{es,lib}/typography/Base/*.js')
  .isFile()
  .filter((filename) => !filename.endsWith('/util.js'))
  .assert('contain use client', (filename) => includeUseClient(filename));

console.log(chalk.green('✨ use client passed!'));
