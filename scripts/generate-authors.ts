import fs from 'fs';
import _ from 'lodash';
import path from 'path';
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
  let logs = (await git.log()).all;
  logs = _.remove(logs, ({ author_email: email }) => {
    for (let i = 0; i < excludes.length; i++) {
      const item = excludes[i];
      if (email.includes(item)) {
        return false;
      }
    }
    return true;
  });
  logs = _.sortBy(_.unionBy(logs, 'author_email'), 'author_name');
  fs.writeFileSync(
    path.join(cwd, 'AUTHORS.txt'),
    logs.map((item) => `${item.author_name} <${item.author_email}>`).join('\n'),
  );
}

execute();
