import fs from 'fs';
import path from 'path';
import _ from 'lodash';
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
  let { all } = await git.log();
  all = _.remove(all, ({ author_email: email }) => {
    for (let i = 0; i < excludes.length; i++) {
      const item = excludes[i];
      if (email.includes(item)) {
        return false;
      }
    }
    return true;
  });

  all = _.sortBy(_.unionBy(all, 'author_email'), 'author_name');

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
