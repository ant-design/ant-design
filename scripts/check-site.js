/* eslint-disable no-useless-escape */
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');
const uniq = require('lodash/uniq');
const difference = require('lodash/difference');
const fetch = require('node-fetch');

const sitePath = path.join(process.cwd(), '_site');

const throwError = keyfile => {
  console.log(chalk.red(`❌ Check site file ${keyfile} failed`));
  process.exit(1);
};

const removeNameHash = filename => {
  return filename
    .replace(/(?<=\.)\w{6}(?:\.)/g, '')
    .replace(/(?<=demo\-0\.).*?(?:\.)/g, '')
    .replace(/(?<=\-)\w{8}(?:-)/g, '')
    .replace(/(?<=\-)\w{8}(?:\.)/g, '');
};

const getPrevfiles = async () => {
  const { tree } = await fetch(
    'https://api.github.com/repos/ant-design/ant-design/git/trees/gh-pages?recursive=1',
  )
    .then(res => res.json())
    .catch(e => {
      console.log(chalk.red('❌ fetch api github failed', e));
    });
  const files = uniq(
    tree
      .filter(item => item && Number(item.mode) === 100644)
      .map(item => removeNameHash(item.path)),
  );
  return files;
};

const startCheck = async () => {
  const globOpts = {
    nodir: true,
  };
  console.log(chalk.cyan('Checking site file...'));
  const prevFiles = await getPrevfiles();

  const nextFiles = uniq(
    glob
      .sync(path.join(process.cwd(), '_site', '**'), globOpts)
      .map(file => removeNameHash(file.replace(`${sitePath}/`, ''))),
  );
  const diff = difference(prevFiles, nextFiles);
  console.log('diff', diff);
  // create files
  if (prevFiles.length >= nextFiles.length && diff.length > 0) {
    throwError(JSON.stringify(diff));
  }
  console.log(chalk.green('✅ Check site files success'));
};

startCheck();
