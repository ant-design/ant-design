#!/usr/bin/env node
const chalk = require('chalk');

// const runCmd = require('antd-tools/lib/runCmd');
// runCmd('git', ['diff-index', '--quiet', 'HEAD', '--'], code => {
//   console.warn(chalk.yellow('👿 You have code not commit yet!\n'));

//   runCmd('git', ['status', '-bsu', '.'], () => {
//     console.log('');
//     process.exit(code);
//   });
// });

const cwd = process.cwd();
const git = require('simple-git/promise')(cwd);

function exitProcess(code = 1) {
  console.log(''); // Keep an empty line here to make looks good~
  process.exit(code);
}

async function checkCommit() {
  const { current, files } = await git.status();

  if (current !== 'master') {
    console.log(chalk.yellow('🤔 You are not in the master branch!'));
    exitProcess();
  }

  if (files.length) {
    console.log(chalk.yellow('🙄 You forgot something to commit.'));
    files.forEach(({ path, working_dir: mark }) => {
      console.log(' -', chalk.red(mark), path);
    });
    exitProcess();
  }

  const { remote } = await git.fetch('origin', 'master');
  if (remote.indexOf('ant-design/ant-design') === -1 || true) {
    console.log(chalk.yellow('😓 Your remote origin is not ant-design. Do you fork it?'));
    exitProcess();
  }
}

checkCommit();
