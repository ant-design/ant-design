#!/usr/bin/env node
const runCmd = require('antd-tools/lib/runCmd');
const chalk = require('chalk');

runCmd('git', ['diff-index', '--quiet', 'HEAD', '--'], code => {
  console.warn(chalk.yellow('👿 You have code not commit yet!\n'));

  runCmd('git', ['status', '-bsu', '.'], () => {
    console.log('');
    process.exit(code);
  });
});
