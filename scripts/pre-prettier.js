/**
 * copy to https://github.com/facebook/react/blob/master/scripts/prettier/index.js
 * prettier api doc https://prettier.io/docs/en/api.html
 *----------*****--------------
 *  pre commit prettier file
 *----------*****--------------
 */

const prettier = require('prettier');
const fs = require('fs');

const prettierConfigPath = require.resolve('../.prettierrc');

const files = process.argv.slice(2);

let didError = false;

files.forEach(file => {
  const options = prettier.resolveConfig.sync(file, {
    config: prettierConfigPath,
  });
  try {
    const fileInfo = prettier.getFileInfo.sync(file);
    if (fileInfo.ignored) {
      return;
    }
    const input = fs.readFileSync(file, 'utf8');
    const withParserOptions = {
      ...options,
      parser: fileInfo.inferredParser,
    };
    const output = prettier.format(input, withParserOptions);
    if (output !== input) {
      fs.writeFileSync(file, output, 'utf8');
      // eslint-disable-next-line no-console
      console.log(`\x1b[34m ${file} is prettier`);
    }
  } catch (e) {
    didError = true;
  }
});

if (didError) {
  process.exit(1);
}
// eslint-disable-next-line no-console
console.log('\x1b[32m prettier success!');
