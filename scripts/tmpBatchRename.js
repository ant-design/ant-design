/**
 * ZombieJ: This file is used for https://github.com/ant-design/ant-design/pull/31496 It's safe to
 * remove after css variables function out
 */

// @import '../../style/themes/index';
// import '../../style/index.less';

const fse = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const components = fse.readdirSync('./components');

let count = 0;

components.forEach(dir => {
  const dirPath = path.resolve('components', dir);
  if (!fse.lstatSync(dirPath).isDirectory) {
    return;
  }

  const stylePath = path.resolve(dirPath, 'style', 'index.tsx');
  if (!fse.existsSync(stylePath) || !fse.lstatSync(stylePath).isFile) {
    return;
  }

  const styleFolderPath = path.dirname(stylePath);
  const styleMvPath = path.resolve(styleFolderPath, 'style.tsx');

  console.log(chalk.cyan('SRC:'), stylePath);
  console.log(chalk.green('TGT:'), styleMvPath);
  count += 1;
});

console.log('>>>', count);
