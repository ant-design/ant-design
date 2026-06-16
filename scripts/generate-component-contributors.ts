import fs from 'node:fs/promises';
import path from 'node:path';
import { Octokit } from '@octokit/rest';
import cliProgress from 'cli-progress';
import dotenv from 'dotenv';

dotenv.config({ override: true });

const cwd = process.cwd();
const owner = 'ant-design';
const repo = 'ant-design';
const componentsDir = path.join(cwd, 'components');
const outputDir = path.join(cwd, 'public', 'component-contributors');
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
const docFiles = [
  { filename: 'index.zh-CN.md', locale: 'zhCN' },
  { filename: 'index.en-US.md', locale: 'enUS' },
];

const token = process.env.GITHUB_ACCESS_TOKEN;

if (!token) {
  throw new Error('GITHUB_ACCESS_TOKEN is required to generate component contributors.');
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

async function getComponentNames() {
  const entries = await fs.readdir(componentsDir, { withFileTypes: true });
  const componentNames: string[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory() || excludeComponents.has(entry.name)) {
      continue;
    }

    const componentPath = path.join(componentsDir, entry.name);
    const hasDoc = await Promise.all(
      docFiles.map(({ filename }) => pathExists(path.join(componentPath, filename))),
    ).then((results) => results.some(Boolean));

    if (hasDoc) {
      componentNames.push(entry.name);
    }
  }

  return componentNames.sort();
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
  const componentNames = await getComponentNames();

  await fs.mkdir(outputDir, { recursive: true });

  const progressBar = new cliProgress.SingleBar(
    {
      format: 'Generate component contributors [{bar}] {value}/{total} {component}',
    },
    cliProgress.Presets.shades_classic,
  );

  progressBar.start(componentNames.length, 0, { component: '' });

  for (const componentName of componentNames) {
    const componentPath = path.join(componentsDir, componentName);

    progressBar.update({ component: componentName });

    for (const { filename, locale } of docFiles) {
      const docFilePath = path.join(componentPath, filename);

      if (!(await pathExists(docFilePath))) {
        continue;
      }

      const contributors = await getFileCommits(docFilePath);
      const outputFile = path.join(outputDir, `${componentName}-${locale}.json`);

      await fs.writeFile(outputFile, `${JSON.stringify(contributors, null, 2)}\n`);
    }

    progressBar.increment();
  }

  progressBar.stop();
}

execute();
