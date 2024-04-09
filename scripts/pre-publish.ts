/* eslint-disable camelcase */
import fs from 'node:fs';
import runScript from '@npmcli/run-script';
import { Octokit } from '@octokit/rest';
import AdmZip from 'adm-zip';
import axios from 'axios';
import chalk from 'chalk';
import cliProgress from 'cli-progress';
import ora from 'ora';

import checkRepo from './check-repo';

const { Notification: Notifier } = require('node-notifier');
const simpleGit = require('simple-git');

process.on('SIGINT', () => {
  process.exit(1);
});

const emojify = (status: string = '') => {
  if (!status) {
    return '';
  }
  const emoji = {
    /* status */
    completed: '✅',
    queued: '🕒',
    in_progress: '⌛',
    /* conclusion */
    success: '✅',
    failure: '❌',
    neutral: '⚪',
    cancelled: '❌',
    skipped: '⏭️',
    timed_out: '⌛',
    action_required: '🔴',
  }[status];
  return `${emoji || ''} ${(status || '').padEnd(15)}`;
};

async function downloadArtifact(url: string, filepath: string) {
  const bar = new cliProgress.SingleBar(
    {
      format: `  下载中 [${chalk.cyan(
        '{bar}',
      )}] {percentage}% | 预计还剩: {eta}s | {value}/{total}`,
    },
    cliProgress.Presets.rect,
  );
  bar.start(1, 0);
  const response = await axios.get(url, {
    headers: {
      Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
    },
    responseType: 'arraybuffer',
    onDownloadProgress: (progressEvent) => {
      bar.setTotal(progressEvent.total || 0);
      bar.update(progressEvent.loaded);
    },
  });
  fs.writeFileSync(filepath, Buffer.from(response.data));
}

const runPrePublish = async () => {
  await checkRepo();
  const spinner = ora('Loading unicorns').start();
  spinner.info(chalk.black.bgGreenBright('本次发布将跳过本地 CI 检查，远程 CI 通过后方可发布'));
  const git = simpleGit();
  const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });
  const { current: currentBranch } = await git.branch();

  spinner.start(`正在拉取远程分支 ${currentBranch}`);
  await git.pull('origin', currentBranch);
  spinner.succeed(`成功拉取远程分支 ${currentBranch}`);
  spinner.start(`正在推送本地分支 ${currentBranch}`);
  await git.push('origin', currentBranch);
  spinner.succeed(`成功推送远程分支 ${currentBranch}`);
  spinner.succeed(`已经和远程分支保持同步 ${currentBranch}`);

  const { latest } = await git.log();
  spinner.succeed(`找到本地最新 commit:`);
  spinner.info(chalk.cyan(`  hash: ${latest.hash}`));
  spinner.info(chalk.cyan(`  date: ${latest.date}`));
  spinner.info(chalk.cyan(`  message: ${latest.message}`));
  spinner.info(chalk.cyan(`  author_name: ${latest.author_name}`));
  const owner = 'ant-design';
  const repo = 'ant-design';
  spinner.start(`开始检查远程分支 ${currentBranch} 的 CI 状态`);
  const {
    data: { check_runs },
  } = await octokit.checks.listForRef({
    owner,
    repo,
    ref: latest.hash,
  });
  spinner.succeed(`远程分支 CI 状态：`);
  check_runs.forEach((run) => {
    spinner.info(
      `  ${run.name.padEnd(36)} ${emojify(run.status)} ${emojify(run.conclusion || '')}`,
    );
  });
  const conclusions = check_runs.map((run) => run.conclusion);
  if (
    conclusions.includes('failure') ||
    conclusions.includes('cancelled') ||
    conclusions.includes('timed_out')
  ) {
    spinner.fail(chalk.bgRedBright('远程分支 CI 执行异常，无法继续发布，请尝试修复或重试'));
    spinner.info(`  点此查看状态：https://github.com/${owner}/${repo}/commit/${latest.hash}`);
    process.exit(1);
  }
  const statuses = check_runs.map((run) => run.status);
  if (check_runs.length < 1 || statuses.includes('queued') || statuses.includes('in_progress')) {
    spinner.fail(chalk.bgRedBright('远程分支 CI 还在执行中，请稍候再试'));
    spinner.info(`  点此查看状态：https://github.com/${owner}/${repo}/commit/${latest.hash}`);
    process.exit(1);
  }
  spinner.succeed(`远程分支 CI 已通过`);
  // clean up
  await runScript({ event: 'clean', path: '.', stdio: 'inherit' });
  spinner.succeed(`成功清理构建产物目录`);
  spinner.start(`开始查找远程分支构建产物`);
  const {
    data: { workflow_runs },
  } = await octokit.rest.actions.listWorkflowRunsForRepo({
    owner,
    repo,
    head_sha: latest.hash,
    per_page: 100,
    exclude_pull_requests: true,
    event: 'push',
    status: 'completed',
    conclusion: 'success',
    head_branch: currentBranch,
  });
  const testWorkflowRun = workflow_runs.find((run) => run.name === '✅ test');
  if (!testWorkflowRun) {
    spinner.fail(chalk.bgRedBright('找不到远程构建工作流'));
    process.exit(1);
  }
  const {
    data: { artifacts },
  } = await octokit.actions.listWorkflowRunArtifacts({
    owner,
    repo,
    run_id: testWorkflowRun?.id || 0,
  });
  const artifact = artifacts.find((item) => item.name === 'build artifacts');
  if (!artifact) {
    spinner.fail(chalk.bgRedBright('找不到远程构建产物'));
    process.exit(1);
  }
  spinner.info(`准备从远程分支下载构建产物`);
  const { url } = await octokit.rest.actions.downloadArtifact.endpoint({
    owner,
    repo,
    artifact_id: artifact.id,
    archive_format: 'zip',
  });
  await downloadArtifact(url, 'artifacts.zip');
  spinner.info();
  spinner.succeed(`成功从远程分支下载构建产物`);
  // unzip
  spinner.start(`正在解压构建产物`);
  const zip = new AdmZip('artifacts.zip');
  zip.extractAllTo('./', true);
  spinner.succeed(`成功解压构建产物`);
  await runScript({ event: 'test:dekko', path: '.', stdio: 'inherit' });
  await runScript({ event: 'test:package-diff', path: '.', stdio: 'inherit' });
  spinner.succeed(`文件检查通过，准备发布！`);

  new Notifier().notify({
    title: '✅ 准备发布到 npm',
    message: '产物已经准备好了，快回来输入 npm 校验码了！',
    sound: 'Crystal',
  });
  process.exit(0);
};

runPrePublish();
