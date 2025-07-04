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
];

async function execute() {
  const logResult = await git.log();
  let all = logResult.all.filter(({ author_email: email }) => {
    for (let i = 0; i < excludes.length; i++) {
      const item = excludes[i];
      if (email.includes(item)) {
        return false;
      }
    }
    return true;
  });

  all = sortBy(unionBy(all, 'author_email'), 'author_name');

  fs.writeFileSync(
    path.join(cwd, 'contributors.json'),
    JSON.stringify(
      Array.from(new Set<string>(all.map((authorItem) => authorItem.author_name))),
      null,
      2,
    ),
  );
}

execute();
