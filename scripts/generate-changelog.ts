import { spawn } from 'child_process';
import path from 'path';
import { input, select } from '@inquirer/prompts';
import chalk from 'chalk';
import fs from 'fs-extra';
import simpleGit from 'simple-git';

const cwd = process.cwd();
const git = simpleGit(cwd);

interface ChangelogItem {
  hash: string;
  pr?: string;
  committer: string;
  commitMessage: string;
  english?: string;
  chinese?: string;
  category?: string;
}

function execGh(args: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    const proc = spawn('gh', args, { cwd });
    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    proc.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    proc.on('close', (code) => {
      if (code === 0) {
        resolve(stdout.trim());
      } else {
        reject(new Error(`gh command failed: ${stderr}`));
      }
    });
  });
}

async function fetchPRDetails(
  prNumber: string,
): Promise<{ title: string; body: string; author: string } | null> {
  try {
    const result = await execGh(['pr', 'view', prNumber, '--json', 'title,body,author']);
    const data = JSON.parse(result);
    return {
      title: data.title || '',
      body: data.body || '',
      author: data.author?.login || '',
    };
  } catch (error) {
    console.log(chalk.red(`❌ Failed to fetch PR #${prNumber}: ${error}`));
    return null;
  }
}

function extractDescriptions(body: string): { english: string; chinese: string } {
  const lines = body.split('\n');
  let english = '';
  let chinese = '';
  let currentLang = '';

  for (const line of lines) {
    if (
      line.includes('🇺🇸 English') ||
      line.includes('🇺🇸') ||
      line.toLowerCase().includes('english:')
    ) {
      currentLang = 'english';
      continue;
    }
    if (
      line.includes('🇨🇳 Chinese') ||
      line.includes('🇨🇳') ||
      line.toLowerCase().includes('chinese:')
    ) {
      currentLang = 'chinese';
      continue;
    }

    if (currentLang === 'english' && line.trim().startsWith('-')) {
      english += line.trim().substring(1).trim() + ' ';
    } else if (currentLang === 'chinese' && line.trim().startsWith('-')) {
      chinese += line.trim().substring(1).trim() + ' ';
    }
  }

  return { english: english.trim(), chinese: chinese.trim() };
}

function identifyCategory(title: string, body: string): string {
  const componentNames = [
    'Button',
    'Checkbox',
    'Radio',
    'Switch',
    'Input',
    'Select',
    'TreeSelect',
    'Cascader',
    'DatePicker',
    'TimePicker',
    'Calendar',
    'Upload',
    'Modal',
    'Drawer',
    'Message',
    'Notification',
    'Popconfirm',
    'Tooltip',
    'Popover',
    'Table',
    'List',
    'Tree',
    'Tabs',
    'Steps',
    'Progress',
    'Spin',
    'Avatar',
    'Badge',
    'Tag',
    'Card',
    'Collapse',
    'Carousel',
    'Breadcrumb',
    'Pagination',
    'Menu',
    'Dropdown',
    'Form',
    'Descriptions',
    'Skeleton',
    'Empty',
    'Result',
    'Alert',
    'Typography',
    'Layout',
    'Grid',
    'Space',
    'Flex',
    'ConfigProvider',
    'App',
    'Watermark',
    'ColorPicker',
    'QRCode',
    'Segmented',
  ];

  const searchText = `${title} ${body}`.toLowerCase();

  for (const name of componentNames) {
    const lowerName = name.toLowerCase();
    if (searchText.includes(lowerName)) {
      return name;
    }
  }

  return 'MISC';
}

function generateTempChangelog(items: ChangelogItem[], version: string): string {
  const lines: string[] = [];
  lines.push('# Changelog Temp File');
  lines.push(`# Version: ${version}`);
  lines.push(`# Generated: ${new Date().toISOString()}`);
  lines.push('');
  lines.push('---');
  lines.push('');

  for (const item of items) {
    lines.push(`## ${item.hash}`);
    lines.push(`- PR: ${item.pr || 'N/A'}`);
    lines.push(`- Committer: ${item.committer}`);
    lines.push(`- Commit: ${item.commitMessage}`);
    lines.push(`- Category: ${item.category || 'MISC'}`);
    lines.push(`- English: ${item.english || ''}`);
    lines.push(`- Chinese: ${item.chinese || ''}`);
    lines.push('');
  }

  return lines.join('\n');
}

async function main() {
  console.log(chalk.cyan('🚀 Ant Design Changelog Generator'));
  console.log(chalk.gray('Using gh CLI to fetch PR information\n'));

  const tags = await git.tags();
  const validTags = tags.all
    .filter((item) => !item.includes('experimental'))
    .filter((item) => !item.includes('alpha'))
    .filter((item) => !item.includes('resource'))
    .reverse()
    .slice(0, 50);

  const fromVersion = await select({
    message: '🏷 Please choose tag to compare from:',
    choices: [
      ...validTags.map((item) => ({ name: item, value: item })),
      { name: 'custom input ⌨️', value: 'custom' },
    ],
  });

  let finalFromVersion = fromVersion;
  if (fromVersion === 'custom') {
    finalFromVersion = await input({
      message: '🏷 Please input custom tag name:',
      validate: (value: string) => {
        if (!value.trim()) {
          return 'Tag name cannot be empty';
        }
        return true;
      },
    });
  }

  const toVersion = await select({
    message: `🔀 Please choose branch to compare with ${chalk.magenta(finalFromVersion)}:`,
    choices: [
      { name: 'master', value: 'master' },
      { name: 'feature', value: 'feature' },
      { name: 'custom input ⌨️', value: 'custom' },
    ],
  });

  let finalToVersion = toVersion;
  if (toVersion === 'custom') {
    finalToVersion = await input({
      default: 'master',
      message: `🔀 Please input custom git hash id or branch name:`,
    });
  }

  if (!/\d+\.\d+\.\d+/.test(finalFromVersion)) {
    console.log(chalk.red(`🤪 tag (${chalk.magenta(finalFromVersion)}) is not valid.`));
    return;
  }

  console.log(
    chalk.blue(
      `📊 Fetching commits from ${chalk.magenta(finalFromVersion)} to ${chalk.magenta(finalToVersion)}...`,
    ),
  );

  const logs = await git.log({ from: finalFromVersion, to: finalToVersion });
  console.log(chalk.yellow(`📝 Found ${logs.all.length} commits`));

  const changelogItems: ChangelogItem[] = [];
  const processedPRs = new Set<string>();

  for (let i = 0; i < logs.all.length; i++) {
    const { message, hash, author_name: committer } = logs.all[i];
    const text = message;

    const match = text.match(/#\d+/g);
    const prNumbers = match?.map((pr) => pr.slice(1)) || [];

    console.log(
      chalk.green(
        `[${i + 1}/${logs.all.length}]`,
        hash.slice(0, 6),
        '-',
        prNumbers.length ? prNumbers.join(',') : 'no PR',
      ),
    );

    for (const prNumber of prNumbers) {
      if (processedPRs.has(prNumber)) {
        continue;
      }
      processedPRs.add(prNumber);

      let english = '';
      let chinese = '';
      let prTitle = message;

      try {
        const prDetails = await fetchPRDetails(prNumber);

        if (prDetails) {
          prTitle = prDetails.title;
          const { english: en, chinese: ch } = extractDescriptions(prDetails.body);
          english = en || prDetails.title;
          chinese = ch || prDetails.title;
        } else {
          english = message;
          chinese = message;
        }
      } catch (error) {
        console.log(chalk.yellow(`  ⚠️ Using commit message for #${prNumber}`));
        english = message;
        chinese = message;
      }

      const category = identifyCategory(prTitle, english);

      changelogItems.push({
        hash,
        pr: prNumber,
        committer,
        commitMessage: message,
        english,
        chinese,
        category,
      });

      if (english) {
        console.log(`  🇺🇸  ${english.substring(0, 60)}`);
      }
      if (chinese) {
        console.log(`  🇨🇳  ${chinese.substring(0, 60)}`);
      }
    }
  }

  if (changelogItems.length === 0) {
    console.log(chalk.yellow('⚠️  No PRs found.'));
    return;
  }

  console.log(chalk.green(`\n✅ Collected ${changelogItems.length} PRs`));

  const versionMatch = finalFromVersion.match(/(\d+)\.(\d+)\.(\d+)/);
  let newVersion = finalFromVersion;
  if (versionMatch) {
    const [_, major, minor] = versionMatch;
    newVersion = `${major}.${parseInt(minor) + 1}.0`;
  }

  const tempChangelog = generateTempChangelog(changelogItems, newVersion);
  const tempFilePath = path.join(cwd, '~changelog.md');

  try {
    fs.writeFileSync(tempFilePath, tempChangelog, 'utf8');
    console.log(chalk.green(`\n✅ Temp changelog generated: ${tempFilePath}`));
    console.log(chalk.blue(`📄 ${changelogItems.length} items written`));
  } catch (error) {
    console.log(chalk.red(`❌ Failed to write temp file: ${error}`));
  }

  console.log(chalk.gray('\n---'));
  console.log(chalk.cyan('Next steps:'));
  console.log(chalk.gray('1. Review ~changelog.md'));
  console.log(
    chalk.gray('2. Run changelog-collect skill to process and update official changelog'),
  );
  console.log(
    chalk.gray('3. Or manually edit and merge into CHANGELOG.zh-CN.md / CHANGELOG.en-US.md'),
  );
}

main();
