import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { Readable } from 'node:stream';
import { finished } from 'node:stream/promises';
import { checkbox, confirm, input, select } from '@inquirer/prompts';
import { Octokit } from '@octokit/rest';
import envPaths from 'env-paths';
import fg from 'fast-glob';
import fs from 'fs-extra';
import difference from 'lodash/difference';
import minimist from 'minimist';
import open from 'open';
import { getUserAgent, resolveCommand } from 'package-manager-detector';
import simpleGit from 'simple-git';
import { extract } from 'tar';

const ROOT = path.resolve(__dirname, '../../');
// ==================== 环境变量 ====================
const GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'ant-design';
const GITHUB_REPO = process.env.GITHUB_REPO || 'ant-design';

// ==================== 阿里云 OSS 配置 ====================
const ALI_OSS_BUCKET = process.env.ALI_OSS_BUCKET || 'antd-visual-diff';
const ALI_OSS_REGION = process.env.ALI_OSS_REGION || 'oss-accelerate';
const OSS_DOMAIN = `https://${ALI_OSS_BUCKET}.${ALI_OSS_REGION}.aliyuncs.com`;

// ==================== 本地存储路径 ====================
const _VISUAL_STORE_PATH = envPaths('visual-regression').cache;
const STORE_PATH = path.join(_VISUAL_STORE_PATH, GITHUB_OWNER, GITHUB_REPO);

// ==================== 初始化 ====================
fs.ensureDirSync(STORE_PATH);
const git = simpleGit(ROOT);
const octokit = new Octokit({ auth: GITHUB_TOKEN });
const packageManager = getUserAgent();

const components = fg
  .sync('components/*/index.ts[x]', { cwd: ROOT })
  .reduce<string[]>((acc, file) => {
    const basePath = path.dirname(file);
    const requiredFiles = ['index.en-US.md', 'demo', '__tests__'];
    if (requiredFiles.every((item) => fs.existsSync(path.join(basePath, item)))) {
      acc.push(basePath);
    }
    return acc;
  }, []);

// ==================== scripts ====================
const imagesTestsScript = 'test:image';
const visualTestsScript = 'test:visual-regression';

async function parseArgs() {
  const argv = minimist(process.argv.slice(2));
  let baseRef = argv['base-ref'];

  const { latest } = await git.log();

  if (!baseRef) {
    baseRef = await select({
      message: '📚 请选择基准分支',
      default: 'master',
      choices: [
        'master',
        'feature',
        'next',
        // '✍️ Custom Input', // 临时关闭自定义
      ],
    });

    if (baseRef.endsWith('Custom Input')) {
      baseRef = await input({
        message: '📚 请输入基准分支',
        default: 'master',
      });
    }
  }

  return {
    baseRef,
    currentRef: latest?.hash.slice(0, 8) || '',
  };
}

// 获取 commit sha
async function getCommitSha(ref: string) {
  const { data } = await octokit.repos.getCommit({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    ref,
  });

  return data.sha;
}

// 获取 oss branch hash
async function getOssBranchHash(branch: string) {
  const uri = new URL(`${OSS_DOMAIN}/${branch}/visual-regression-ref.txt`);

  const res = await fetch(uri.toString());
  const text = await res.text();
  return text.trim();
}

function runImageTests(args: string[]) {
  // Windows 环境下特殊处理
  const isWindows = process.platform === 'win32';

  const { command, args: realArgs } = resolveCommand(packageManager!, 'run', args)!;
  spawnSync(command, realArgs, {
    stdio: 'inherit',
    env: {
      ...process.env,
      LOCAL: 'true', // 总是本地运行
    },
    shell: isWindows, // Windows 下使用 shell 执行
  });
}

async function downloadVisualSnapshots(sha: string) {
  const uri = new URL(`${OSS_DOMAIN}/${sha}/imageSnapshots.tar.gz`);
  const tarPath = path.join(STORE_PATH, `imageSnapshots-${sha}.tar.gz`);

  if (fs.existsSync(tarPath) && fs.statSync(tarPath).size > 10 * 1024 * 1024) {
    console.log(`📦 视觉回归快照已存在，跳过下载`);
  } else {
    console.log(`📦 正在下载视觉回归快照`);
    const res = await fetch(uri);
    if (!res.ok || res.status !== 200) {
      throw new Error(`Download file failed: ${new URL(uri).href}`);
    }
    // @ts-ignore
    const body = Readable.fromWeb(res.body);
    await finished(body.pipe(fs.createWriteStream(tarPath)));

    if (fs.statSync(tarPath).size < 10 * 1024 * 1024) {
      console.log(`📦 下载完成 ${tarPath}`);
    }
  }

  return tarPath;
}

async function run() {
  const args = await parseArgs();
  const { baseRef, currentRef } = args;

  const baseSha = await getCommitSha(baseRef);

  if (baseSha === currentRef) {
    console.log(`
👋 你好像没有提交任何代码，不需要进行视觉回归测试。
或者你可以切到你提交 PR 的分支上进行本地测试。
`);
  }

  const visualSha = await getOssBranchHash(baseRef);

  if (baseSha !== visualSha) {
    console.warn(
      `
⚠️ 基准分支提交和 oss 分支提交不一致，可能会导致视觉回归测试不准确
- 基准分支提交：${baseSha} [${baseRef}]
- oss 分支提交：${visualSha} [${baseRef}]
    `.trim(),
    );
  }

  const basePath = path.join(ROOT, `imageSnapshots-${baseRef}`); // 本地基准快照存储路径
  const targetPath = path.join(ROOT, 'imageSnapshots'); // 本地目标快照存储路径

  // ==================== 生成目标快照(选择组件 ==================
  let appliedComponents: 'all' | string[];

  const selected = await checkbox<string>({
    message: '📚 请选择需要测试的组件，不建议选择全部【全量快照生成需要耗费很长时间】\n',
    pageSize: Math.floor(components.length / 4),
    loop: false,
    choices: components.map((component) => ({
      value: component,
      checked: component.endsWith('components/button'), // 默认选中 button
    })),
  });

  if (selected.length === 0 || difference(components, selected).length === 0) {
    appliedComponents = 'all';
  } else {
    appliedComponents = selected;
  }

  // ==================== 生成目标快照(运行快照测试 ==================
  const needRun = await confirm({
    message: '📚 是否进行快照截图？【如果你已经运行过了，可以忽略】',
    default: true,
  });

  if (needRun) {
    fs.emptyDirSync(targetPath);
    runImageTests([imagesTestsScript, ...(appliedComponents === 'all' ? [] : appliedComponents)]);
  } else {
    fs.ensureDirSync(targetPath);
  }

  // ==================== 下载基准快照 ==================
  const visualTarPath = await downloadVisualSnapshots(visualSha);

  // 解压 tar 包
  fs.emptyDirSync(basePath);
  await extract({
    strip: 1,
    file: visualTarPath,
    C: basePath,
  });

  if (appliedComponents !== 'all') {
    // components/avatar => avatar
    const componentNames = appliedComponents.map((component) => path.basename(component));

    console.log(`🧹 正在清理基准快照`);

    const files = fs.readdirSync(basePath);
    files.forEach((file) => {
      // 删除不在选择范围内的组件
      if (!componentNames.some((name) => file.startsWith(name))) {
        fs.removeSync(path.join(basePath, file));
      }
    });
  }

  // ==================== 对比快照 ==================
  const reportFile = path.join(ROOT, 'visualRegressionReport', 'report.html');
  const alternativeReportFile = path.join(ROOT, 'visualRegressionReport', 'index.html');
  fs.emptyDirSync(path.dirname(reportFile));
  // https://github.com/ant-design/ant-design/wiki/Development#run-visual-regression-diff-locally
  runImageTests([visualTestsScript, `--base-ref=${baseRef}`, `--pr-id=local`]);

  // ==================== 提示 ==================
  console.log(`🎉 本地视觉回归测试完成, 报告: ${path.relative(process.cwd(), reportFile)}`);

  const needOpen = await confirm({
    message: '📚 是否打开报告查看？',
    default: true,
  });

  if (needOpen) {
    open(reportFile);
    fs.existsSync(alternativeReportFile) && open(alternativeReportFile);
  }
}

/**
 * 运行本地视觉回归测试
 * 开始前请确保本地安装了所需依赖，没有的话请执行以下命令安装
 * npx puppeteer browsers install chrome
 */
run().catch((e) => {
  console.error(e);
  process.exit(1);
});
