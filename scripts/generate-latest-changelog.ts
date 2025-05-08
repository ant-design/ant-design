import path from 'path';
import fse from 'fs-extra';
import assert from 'assert';

import { version } from '../package.json';

const ROOT = path.resolve(__dirname, '../');
const OUTPUT_DIR = path.join(ROOT, '.dumi/preset');

const originENChangelog = fse.readFileSync(path.join(ROOT, 'CHANGELOG.en-US.md'), 'utf-8');
const originCNChangelog = fse.readFileSync(path.join(ROOT, 'CHANGELOG.zh-CN.md'), 'utf-8');

const getChangelog = (content: string, v = version) => {
  const lines = content.split('\n');
  const changeLog = [];
  const startPattern = new RegExp(`^## ${v}`);
  const stopPattern = /^## /; // 前一个版本
  // const skipPattern = /^`/; // 日期
  let begin = false;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (begin && stopPattern.test(line)) {
      break;
    }
    if (begin && line) {
      changeLog.push(line);
    }
    if (!begin) {
      begin = startPattern.test(line);
    }
  }
  return changeLog.join('\n');
};

const main = async () => {
  const latestENChangelog = getChangelog(originENChangelog);
  const latestCNChangelog = getChangelog(originCNChangelog);

  assert(latestCNChangelog, 'latestCNChangelog is empty');
  fse.writeFileSync(path.join(OUTPUT_DIR, 'latest-changelog.en-US.md'), latestENChangelog, 'utf-8');

  assert(latestENChangelog, 'latestENChangelog is empty');
  fse.writeFileSync(path.join(OUTPUT_DIR, 'latest-changelog.zh-CN.md'), latestCNChangelog, 'utf-8');
};

// \\\\\\\\\\\
// \\\ run \\\
// \\\\\\\\\\\
main()
  .then(() => {
    console.log('✅ last changelog generated');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
