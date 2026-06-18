import fs from 'node:fs/promises';
import path from 'node:path';
import { Octokit } from '@octokit/rest';
import cliProgress from 'cli-progress';
import dotenv from 'dotenv';

dotenv.config({ override: true });

const cwd = process.cwd();
const owner = 'ant-design';
const repo = 'ant-design';
const outputDir = process.argv[2] || path.join(cwd, '_site', 'contributors');
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

const token = process.env.GITHUB_ACCESS_TOKEN;

if (!token) {
  console.log('GITHUB_ACCESS_TOKEN is not set, skipping contributors generation.');
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
  /** Return doc file paths for a given locale suffix */
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
        if (!entry.isDirectory() || excludeComponents.has(entry.name)) continue;

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
    if (!entry.isFile() || !entry.name.endsWith(`.${localeSuffix}.md`)) continue;

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
    }, new Set()),
  );
}

async function execute() {
  // Collect all doc files across modules to get total count for progress bar
  const allTasks: {
    module: ModuleConfig;
    locale: string;
    localeSuffix: string;
    key: string;
    filePath: string;
  }[] = [];

  for (const mod of modules) {
    for (const { locale, suffix } of locales) {
      const docs = await mod.getDocFiles(suffix);
      for (const { key, filePath } of docs) {
        allTasks.push({ module: mod, locale, localeSuffix: suffix, key, filePath });
      }
    }
  }

  await fs.mkdir(outputDir, { recursive: true });

  const progressBar = new cliProgress.SingleBar(
    {
      format: 'Generate contributors [{bar}] {value}/{total} {module}',
    },
    cliProgress.Presets.shades_classic,
  );

  progressBar.start(allTasks.length, 0, { module: '' });

  // result[module][key][locale] = contributors[]
  const result: Record<string, Record<string, Record<string, string[]>>> = {};

  try {
    for (const { module: mod, locale, key, filePath } of allTasks) {
      progressBar.update({ module: `${mod.name}/${key}` });

      const contributors = await getFileCommits(filePath);

      result[mod.name] ??= {};
      result[mod.name][key] ??= {};
      result[mod.name][key][locale] = contributors;

      progressBar.increment();
    }
  } finally {
    progressBar.stop();
    process.stdout.write('\n');
  }

  // Write 8 JSON files: {module}-{locale}.json
  for (const mod of modules) {
    const moduleData = result[mod.name];
    if (!moduleData) continue;

    for (const { locale } of locales) {
      const localeData: Record<string, string[]> = {};

      for (const [key, localesMap] of Object.entries(moduleData)) {
        if (localesMap[locale]) {
          localeData[key] = localesMap[locale];
        }
      }

      const outputFile = path.join(outputDir, `${mod.name}-${locale}.json`);
      await fs.writeFile(outputFile, `${JSON.stringify(localeData, null, 2)}\n`);
    }
  }
}

execute();
