const path = require('path');
const glob = require('glob');
const chalk = require('chalk');

function checkKeyFilesExist() {
  const keyfiles = [
    '/index.html',
    '/index-cn.html',
    '/404.html',
    '/CNAME',
    '/color.less',
    '/config.yml',
    '/changelog.html',
    '/changelog-cn.html',
  ];
  const sitePath = path.join(process.cwd(), '_site');

  console.log(chalk.cyan('Checking site file...'));
  const nextSiteFiles = glob
    .sync(path.join(sitePath, '**'))
    .map(filepath => filepath.replace(sitePath, ''));

  // eslint-disable-next-line no-restricted-syntax
  for (const keyfile of keyfiles) {
    if (!nextSiteFiles.includes(keyfile)) {
      console.log(chalk.red(`❌ Check site file ${keyfile} failed...`));
      throw new Error(`keyfile ${keyfile} not existed`);
    }
  }

  console.log(chalk.green('✅ Check site files success...'));
}

checkKeyFilesExist();
