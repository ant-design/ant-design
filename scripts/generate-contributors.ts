import fs from 'node:fs/promises';
import path from 'node:path';
import { Octokit } from '@octokit/rest';
import chalk from 'chalk';
import cliProgress from 'cli-progress';
import dotenv from 'dotenv';
import ora from 'ora';

const spinner = ora('开始检查仓库状态...').start();

dotenv.config({ override: true });

const cwd = process.cwd();
const owner = 'ant-design';
const repo = 'ant-design';

const outputFile = process.argv[2] || path.join(cwd, '_site', 'contributors.json');

const excludeComponents = new Set(['_util', 'overview']);

const blockList = [
  'github-actions',
  'github-actions[bot]',
  'copilot',
  'renovate',
  'renovate[bot]',
  'dependabot',
  'dependabot[bot]',
  'gemini-code-assist[bot]',
];

const locales = [
  { locale: 'zhCN', suffix: 'zh-CN' },
  { locale: 'enUS', suffix: 'en-US' },
];

const token = process.env.GITHUB_ACCESS_TOKEN || process.env.GITHUB_TOKEN;

const relativePath = path.relative(cwd, outputFile).replace(/\\/g, '/');

if (token) {
  spinner.succeed(
    chalk.green(
      `✅ ${process.env.GITHUB_ACCESS_TOKEN ? 'GITHUB_ACCESS_TOKEN' : 'GITHUB_TOKEN'} 验证成功，已完成权限校验，正在生成文件：${relativePath}`,
    ),
  );
  console.log(''); // Keep an empty line here to make looks good~
} else {
  spinner.fail(
    chalk.red('🚨 请先设置 GITHUB_ACCESS_TOKEN 或 GITHUB_TOKEN 环境变量，请不要泄露给任何在线页面'),
  );
  console.log(''); // Keep an empty line here to make looks good~
  process.exit(0);
}

const octokit = new Octokit({ auth: token });

function toGitHubPath(filePath: string) {
  return path.relative(cwd, filePath).replace(/\\/g, '/');
}

async function pathExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

interface ModuleConfig {
  name: string;
  dir: string;
  getDocFiles: (localeSuffix: string) => Promise<{ key: string; filePath: string }[]>;
}

const modules: ModuleConfig[] = [
  {
    name: 'components',
    dir: path.join(cwd, 'components'),
    async getDocFiles(localeSuffix) {
      const entries = await fs.readdir(this.dir, { withFileTypes: true });
      const result: { key: string; filePath: string }[] = [];

      for (const entry of entries) {
        if (!entry.isDirectory() || excludeComponents.has(entry.name)) {
          continue;
        }
        const filePath = path.join(this.dir, entry.name, `index.${localeSuffix}.md`);
        if (await pathExists(filePath)) {
          result.push({ key: entry.name, filePath });
        }
      }

      return result;
    },
  },
  {
    name: 'blog',
    dir: path.join(cwd, 'docs', 'blog'),
    async getDocFiles(localeSuffix) {
      return getDocsFromFlatDir(this.dir, localeSuffix);
    },
  },
  {
    name: 'react',
    dir: path.join(cwd, 'docs', 'react'),
    async getDocFiles(localeSuffix) {
      return getDocsFromFlatDir(this.dir, localeSuffix);
    },
  },
  {
    name: 'spec',
    dir: path.join(cwd, 'docs', 'spec'),
    async getDocFiles(localeSuffix) {
      return getDocsFromFlatDir(this.dir, localeSuffix);
    },
  },
];

async function getDocsFromFlatDir(dir: string, localeSuffix: string) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const result: { key: string; filePath: string }[] = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(`.${localeSuffix}.md`)) {
      continue;
    }
    const key = entry.name.replace(`.${localeSuffix}.md`, '');
    result.push({ key, filePath: path.join(dir, entry.name) });
  }

  return result;
}

async function getFileCommits(filePath: string) {
  const commits = await octokit.paginate(octokit.rest.repos.listCommits, {
    owner,
    repo,
    path: toGitHubPath(filePath),
    per_page: 100,
  });

  return Array.from(
    commits.reduce<Set<string>>((loginSet, commit) => {
      const login = commit.author?.login;
      if (login && !blockList.includes(login.toLowerCase())) {
        loginSet.add(login);
      }
      return loginSet;
    }, new Set<string>()),
  );
}

async function execute() {
  const allLogins: string[] = [];
  const loginIndex = new Map<string, number>();

  const getLoginIndex = (login: string) => {
    let idx = loginIndex.get(login);
    if (idx === undefined) {
      idx = allLogins.length;
      allLogins.push(login);
      loginIndex.set(login, idx);
    }
    return idx;
  };

  // Collect all doc files across modules
  const allTasks: { module: ModuleConfig; locale: string; key: string; filePath: string }[] = [];

  for (const mod of modules) {
    for (const { locale, suffix } of locales) {
      const docs = await mod.getDocFiles(suffix);
      for (const { key, filePath } of docs) {
        allTasks.push({ module: mod, locale, key, filePath });
      }
    }
  }

  const dir = path.dirname(outputFile);
  await fs.mkdir(dir, { recursive: true });

  const progressBar = new cliProgress.SingleBar(
    {
      format: 'Generate contributors [{bar}] {value}/{total} {module}',
      clearOnComplete: true,
    },
    cliProgress.Presets.shades_classic,
  );

  progressBar.start(allTasks.length, 0, { module: '' });

  // moduleData[module][key][locale] = number[]
  const moduleData: Record<string, Record<string, Record<string, number[]>>> = {};

  try {
    for (const { module: mod, locale, key, filePath } of allTasks) {
      progressBar.update({ module: `${mod.name}/${key}` });

      const logins = await getFileCommits(filePath);
      const indices = logins.map<number>(getLoginIndex);

      moduleData[mod.name] ??= {};
      moduleData[mod.name][key] ??= {};
      moduleData[mod.name][key][locale] = indices;

      progressBar.increment();
    }
  } finally {
    progressBar.stop();
    process.stdout.write('\n');
  }

  // Merge into single output: { logins, components, blog, react, spec }
  const output: Record<string, unknown> = { logins: allLogins };

  for (const mod of modules) {
    const data = moduleData[mod.name];
    if (!data) {
      continue;
    }

    // Flatten: merge locales for the same key, deduplicate indices
    const merged: Record<string, number[]> = {};

    for (const [key, localesMap] of Object.entries(data)) {
      const indices = new Set<number>();
      for (const localeIndices of Object.values(localesMap)) {
        for (const idx of localeIndices) {
          indices.add(idx);
        }
      }
      merged[key] = Array.from(indices);
    }

    output[mod.name] = merged;
  }

  await fs.writeFile(outputFile, `${JSON.stringify(output)}\n`);
}

execute();
