import chalk from 'chalk';
import fetch from 'isomorphic-fetch';
import ora from 'ora';
import simpleGit from 'simple-git';
import type { StatusResult } from 'simple-git';

import { version } from '../package.json';

const cwd = process.cwd();
const git = simpleGit(cwd);
const spinner = ora('Loading unicorns').start('开始检查仓库状态');

function exitProcess(code = 1) {
  console.log(''); // Keep an empty line here to make looks good~
  process.exit(code);
}

async function checkVersion() {
  spinner.start('正在检查当前版本是否已经存在');

  const checkUrls = ['https://registry.npmmirror.com/antd', 'http://registry.npmjs.org/antd'];
  const promises = checkUrls.map(
    (url) =>
      new Promise<Record<string, any>>((resolve) => {
        fetch(url)
          .then((res: Response) => res.json())
          .then(({ versions }) => {
            resolve(versions);
          })
          .catch(() => {
            // Do nothing.
          });
      }),
  );

  // Any one of the promises resolved, we can continue.
  const versions = Promise.race(promises);

  if (version in versions) {
    spinner.fail(chalk.yellow('😈 Current version already exists. Forget update package.json?'));
    spinner.info(`${chalk.cyan(' => Current:')}: version`);
    exitProcess();
  }
  spinner.succeed('版本检查通过');
}

async function checkBranch({ current }: StatusResult) {
  spinner.start('正在检查当前分支是否合法');
  if (
    version.includes('-alpha.') ||
    version.includes('-beta.') ||
    version.includes('-rc.') ||
    version.includes('-experimental.')
  ) {
    spinner.info(chalk.cyan('😃 Alpha version. Skip branch check.'));
  } else if (current !== 'master') {
    spinner.fail(chalk.red('🤔 You are not in the master branch!'));
    exitProcess();
  }
  spinner.succeed('分支检查通过');
}

async function checkCommit({ files }: StatusResult) {
  spinner.start('正在检查当前 git 状态');
  if (files.length) {
    spinner.fail(chalk.red('🙄 You forgot something to commit.'));
    files.forEach(({ path: filePath, working_dir: mark }) => {
      console.log(' -', chalk.red(mark), filePath);
    });
    exitProcess();
  }
  spinner.succeed('git 状态检查通过');
}

async function checkRemote() {
  spinner.start('正在检查远程分支');
  const { remote } = await git.fetch('origin', 'master');
  if (!remote?.includes('ant-design/ant-design')) {
    const { value } = await git.getConfig('remote.origin.url');
    if (!value?.includes('ant-design/ant-design')) {
      spinner.fail(
        chalk.red('🧐 Your remote origin is not ant-design/ant-design, did you fork it?'),
      );
      exitProcess();
    }
  }
  spinner.succeed('远程分支检查通过');
}

async function checkToken() {
  if (!process.env.GITHUB_ACCESS_TOKEN) {
    console.log(
      spinner.fail(
        chalk.red(
          '🚨 请先设置 GITHUB_ACCESS_TOKEN 环境变量到本地，请不要泄露给任何在线页面: https://octokit.github.io/rest.js/v20#authentication',
        ),
      ),
    );
    exitProcess();
  }
  spinner.succeed('GITHUB_ACCESS_TOKEN 检查通过');
}

export default async function checkRepo() {
  const status = await git.status();
  await checkVersion();
  await checkBranch(status);
  await checkCommit(status);
  await checkRemote();
  await checkToken();
}
