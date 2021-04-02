/* eslint no-console: 0 */
const chalk = require('chalk');
const fs = require('fs');
const { join } = require('path');
const moment = require('moment');

const getChangelogByVersion = (content, version) => {
  const lines = content.split('\n');
  const changeLog = [];
  const startPattern = new RegExp(`^## ${version}`);
  const stopPattern = /^## /; // 前一个版本
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

// eslint-disable-next-line import/no-dynamic-require
const packageJson = require(join(__dirname, '..', 'package.json'));

const { version } = packageJson;

const changeLogContent = fs.readFileSync(join(__dirname, '..', 'CHANGELOG.en-US.md')).toString();

const changeLog = getChangelogByVersion(changeLogContent, version);
if (!changeLog) {
  console.log('\n');
  console.log(chalk.red('[check-version-md]: No changelog found for the version to be released'));
  console.log('\n');
  process.exit(1);
}

if (changeLog) {
  const text = changeLog.split('\n')[0];
  if (text.trim().startsWith('`') && text.trim().endsWith('`')) {
    const date = moment(text.trim().replace('`', '').replace('`', ''));
    if (date.isBetween(moment().add(-2, 'day'), moment().add(2, 'day'))) {
      console.log('\n');
      console.log(chalk.blue('[check-version-md]: Check Passed'));
      console.log('\n');
      process.exit(0);
      return;
    }
  }
  console.log('\n');
  console.log(chalk.red('[check-version-md]: The date wrongly written'));
  console.log('\n');
  process.exit(1);
}
