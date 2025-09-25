import fs from 'fs';
import path from 'path';
import sortBy from 'lodash/sortBy';
import unionBy from 'lodash/unionBy';
import simpleGit from 'simple-git';

const cwd = process.cwd();

const git = simpleGit(cwd);

const excludes = [
  'users.noreply.github.com',
  'gitter.im',
  '.local',
  'alibaba-inc.com',
  'alipay.com',
  'taobao.com',
  'ant-design-bot',
  'github-actions',
  'copilot',
  'renovate',
  'renovate[bot]',
  'dependabot',
  'dependabot[bot]',
];

async function execute() {
  const logResult = await git.log();

  const filtered = logResult.all.filter(({ author_name, author_email }) => {
    const name = author_name.toLowerCase();
    const email = author_email.toLowerCase();
    return !excludes.some((item) => email.includes(item) || name.includes(item));
  });

  const all = sortBy(unionBy(filtered, 'author_email'), 'author_name');

  fs.writeFileSync(
    path.join(cwd, 'contributors.json'),
    JSON.stringify(Array.from(new Set(all.map((authorItem) => authorItem.author_name))), null, 2),
  );
}

execute();
