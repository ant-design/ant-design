import { Octokit } from '@octokit/rest';
import ora from 'ora';
import chalk from 'chalk';

const simpleGit = require('simple-git');
const { Notification: Notifier } = require('node-notifier');

const emojify = (status: string = '') => {
  if (!status) {
    return '';
  }
  const emoji = {
    /* status */
    completed: '☑️',
    queued: '🕒',
    in_progress: '🕒',
    /* conclusion */
    success: '✅',
    failure: '❌',
    neutral: '⚪',
    cancelled: '❌',
    skipped: '⏭️',
    timed_out: '⌛',
    action_required: '🔴',
  }[status];
  return `${emoji || ''} ${(status || '').padEnd(10)}`;
};

const runPrePublish = async () => {
  const spinner = ora('Loading unicorns').start();
  spinner.info(chalk.black.bgGreenBright('本次发布将跳过本地 CI 检查，远程 CI 通过后方可发布'));
  const git = simpleGit();
  if (!process.env.GITHUB_ACCESS_TOKEN) {
    spinner.fail(
      '请先设置 GITHUB_ACCESS_TOKEN 环境变量到本地，请不要泄露给任何在线页面: https://octokit.github.io/rest.js/v20#authentication',
    );
    process.exit(1);
  }
  const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });
  const { current: currentBranch } = await git.branch();
  const headCommitSha = await git.revparse('HEAD');
  spinner.succeed(`找到本地最新 commit: ${headCommitSha}`);
  const { latest } = await git.log('-1');
  spinner.info(`  date: ${latest.date}`);
  spinner.info(`  message: ${latest.message}`);
  spinner.info(`  body: ${latest.body}`);
  spinner.info(`  author_name: ${latest.author_name}`);
  const owner = 'ant-design';
  const repo = 'ant-design';
  spinner.start(`开始检查远程分支 CI 状态 ${currentBranch}`);
  const result = await octokit.checks.listForRef({
    owner,
    repo,
    ref: headCommitSha,
  });
  spinner.succeed(`远程分支 CI 状态：`);
  result.data.check_runs.forEach((run) => {
    spinner.info(
      `  ${run.name.padEnd(30)} ${emojify(run.status)} ${emojify(run.conclusion || '')}`,
    );
  });
  const conclusions = result.data.check_runs.map((run) => run.conclusion);
  if (
    conclusions.includes('failure') ||
    conclusions.includes('cancelled') ||
    conclusions.includes('timed_out')
  ) {
    spinner.fail('远程分支 CI 执行异常，无法继续发布，请尝试修复或重试');
    spinner.info(`  点此查看状态：https://github.com/${owner}/${repo}/commit/${headCommitSha}`);
    process.exit(1);
  }
  const statuses = result.data.check_runs.map((run) => run.status);
  if (
    result.data.check_runs.length < 1 ||
    statuses.includes('queued') ||
    statuses.includes('in_progress')
  ) {
    spinner.fail('远程分支 CI 还在执行中，请稍候再试');
    spinner.info(`  点此查看状态：https://github.com/${owner}/${repo}/commit/${headCommitSha}`);
    process.exit(1);
  }

  // 远程分支 CI 跑过才能继续
  spinner.succeed(`远程分支 CI 已通过，准备开始发布`);
  new Notifier().notify({
    title: '✅ 准备发布到 npm',
    message: '测试用例执行完毕，快回来输入 npm 校验码了！',
    sound: 'Crystal',
  });
  process.exit(0);
};

runPrePublish();
