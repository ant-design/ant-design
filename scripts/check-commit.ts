/* eslint-disable no-console */
import chalk from 'chalk';
import fetch from 'isomorphic-fetch';
import type { StatusResult } from 'simple-git';
import simpleGit from 'simple-git';
import localPackage from '../package.json';

const { version } = localPackage;

const cwd = process.cwd();
const git = simpleGit(cwd);

function exitProcess(code = 1) {
  console.log(''); // Keep an empty line here to make looks good~
  process.exit(code);
}

async function checkVersion() {
  try {
    const { versions } = await fetch('http://registry.npmjs.org/antd').then((res: Response) =>
      res.json(),
    );
    if (version in versions) {
      console.log(chalk.yellow('😈 Current version already exists. Forget update package.json?'));
      console.log(chalk.cyan(' => Current:'), version);
      exitProcess();
    }
  } catch {
    console.log(chalk.red('🚨 Check version failed. Skip...'));
  }
}

async function checkBranch({ current }: StatusResult) {
  if (
    version.includes('-alpha.') ||
    version.includes('-beta.') ||
    version.includes('-rc.') ||
    version.includes('-experimental.')
  ) {
    console.log(chalk.cyan('😃 Alpha version. Skip branch check.'));
  } else if (current !== 'master' && current !== '4.0-prepare') {
    console.log(chalk.yellow('🤔 You are not in the master branch!'));
    exitProcess();
  }
}

async function checkCommit({ files }: StatusResult) {
  if (files.length) {
    console.log(chalk.yellow('🙄 You forgot something to commit.'));
    files.forEach(({ path: filePath, working_dir: mark }) => {
      console.log(' -', chalk.red(mark), filePath);
    });
    exitProcess();
  }
}

async function checkRemote() {
  try {
    const { remote } = await git.fetch('origin', 'master');
    console.log(chalk.blue('⛳ Checking origin master with `git fetch origin master`'));
    if (!remote?.includes('ant-design/ant-design')) {
      console.log(chalk.blue('⛳ Checking locally with `git config --get remote.origin.url`'));
      const { value } = await git.getConfig('remote.origin.url');
      if (!value?.includes('ant-design/ant-design')) {
        console.log(
          chalk.yellow('🧐 Your remote origin is not ant-design/ant-design, did you fork it?'),
        );
        exitProcess();
      }
    }
  } catch {
    console.log(chalk.red('🚨 Check remote failed. Skip...'));
  }
}

async function checkAll() {
  const status = await git.status();

  await checkVersion();

  await checkBranch(status);

  await checkCommit(status);

  await checkRemote();
}

checkAll();
