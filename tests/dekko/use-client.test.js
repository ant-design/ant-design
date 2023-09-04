const $ = require('dekko');
const chalk = require('chalk');
const fs = require('fs');

const includeUseClient = (filename) =>
  fs.readFileSync(filename).toString().includes('"use client"');

if (process.env.LIB_DIR === 'dist') {
  $('dist/*')
    .isFile()
    .assert("doesn't contain use client", (filename) => !includeUseClient(filename));
} else {
  $('{es,lib}/index.js')
    .isFile()
    .assert('contain use client', (filename) => includeUseClient(filename));

  $('{es,lib}/*/index.js')
    .isFile()
    .assert('contain use client', (filename) => includeUseClient(filename));
}

// eslint-disable-next-line no-console
console.log(chalk.green('✨ use client passed!'));
