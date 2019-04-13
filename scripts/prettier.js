/**
 * copy to https://github.com/facebook/react/blob/master/scripts/prettier/index.js
 * prettier api doc https://prettier.io/docs/en/api.html
 *----------*****--------------
 *  prettier all js and all ts.
 *----------*****--------------
 */

const glob = require('glob');
const prettier = require('prettier');
const fs = require('fs');
const chalk = require('chalk');
const program = require('commander');

program
  .option('--pre', 'pre-prettier')
  .option('--lint', 'lint-prettier')
  .parse(process.argv);

const prettierConfigPath = require.resolve('../.prettierrc');

let files = [];
if (program.pre) {
  files = program.args;
} else {
  const ignoreFiles = [
    '**/node_modules/**',
    'build/**',
    'es/**',
    'lib/**',
    '**/**.snap',
    '**/**.map',
    '**/components/style/color/**',
    '**/dist/**',
    '_site/**',
  ];

  // get all ts, js, less files
  ['**/*.ts*', '**/*.js*', '**/*.less'].forEach(pattern => {
    const matchFiles = glob.sync(pattern, {
      ignore: ignoreFiles,
    });
    files = files.concat(matchFiles);
  });
}
if (!files.length) {
  return;
}

let didError = false;
let didWarn = false;

files.forEach(file => {
  const options = prettier.resolveConfig.sync(file, {
    config: prettierConfigPath,
  });
  const fileInfo = prettier.getFileInfo.sync(file);
  if (fileInfo.ignored) {
    return;
  }
  try {
    const input = fs.readFileSync(file, 'utf8');
    const withParserOptions = {
      ...options,
      parser: fileInfo.inferredParser,
    };
    if (program.lint) {
      const isPrettier = prettier.check(input, withParserOptions);
      if (!isPrettier) {
        // eslint-disable-next-line no-console
        console.log(chalk.red(`${file} is no prettier, please use npm run prettier and git add !`));
        didWarn = true;
      }
    } else {
      const output = prettier.format(input, withParserOptions);
      if (output !== input) {
        fs.writeFileSync(file, output, 'utf8');
        // eslint-disable-next-line no-console
        console.log(chalk.blue(`${file} is prettier`));
      }
    }
  } catch (e) {
    didError = true;
  }
});

if (didWarn || didError) {
  process.exit(1);
}
// eslint-disable-next-line no-console
console.log(chalk.green('prettier success!'));
