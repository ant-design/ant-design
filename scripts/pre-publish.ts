import { Octokit } from '@octokit/rest';
import ora from 'ora';

const simpleGit = require('simple-git');
const { Notification: Notifier } = require('node-notifier');

const emojify = (status: string = '') => {
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
  const git = simpleGit();
  const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });
  const spinner = ora('Loading unicorns').start();
  const { current: currentBranch } = await git.branch();
  /*
  if (currentBranch !== 'master') {
    spinner.fail(`无法在非 master 分支进行发布，当前分支：${currentBranch}`);
    process.exit(1);
  }
  */
  spinner.text = '正在检查本地 git 状态';
  const status = await git.status();
  if (!status.isClean()) {
    spinner.fail('本地尚有未提交的代码，请先提交所有改动');
    process.exit(1);
  }

  spinner.succeed(`git 状态检查完毕，没有未提交的改动`);
  spinner.start(`正在拉取远程分支 ${currentBranch}`);
  await git.pull('origin', currentBranch);
  spinner.succeed(`成功拉取远程分支 ${currentBranch}`);
  spinner.start(`正在推送本地分支 ${currentBranch}`);
  await git.push('origin', currentBranch);
  spinner.succeed(`成功推送远程分支 ${currentBranch}`);
  const headCommitSha = await git.revparse('HEAD');
  spinner.succeed(`找到本地最新 commit: ${headCommitSha}`);
  const owner = 'ant-design';
  const repo = 'ant-design';
  spinner.start(`开始检查远程分支 CI 状态 ${currentBranch}`);
  const result = await octokit.checks.listForRef({
    owner,
    repo,
    ref: headCommitSha,
  });
  result.data.check_runs.forEach((run) => {
    spinner.info(` ${run.name.padEnd(30)} ${emojify(run.status)} ${emojify(run.conclusion)}`);
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
    spinner.fail('远程分支 CI 还在执行中，请稍候');
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
