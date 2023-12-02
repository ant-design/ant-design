/* eslint-disable no-console */
import fs from 'fs';
import { join } from 'path';
import chalk from 'chalk';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import localPackage from '../package.json';

const { version } = localPackage;

dayjs.extend(isBetween);

const getChangelogByVersion = (content: string, vers: string) => {
  const lines = content.split('\n');
  const changeLog: string[] = [];
  const startPattern = new RegExp(`^## ${vers}`);
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

if (!/^\d+\.\d+\.\d+$/.test(version)) {
  console.log('\n');
  console.log(chalk.blue('[check-version-md]: Prerelease Version. Skipped.'));
  console.log('\n');
  process.exit(0);
}

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
    const date = dayjs(text.trim().replace('`', '').replace('`', ''));
    if (date.isBetween(dayjs().add(-2, 'day'), dayjs().add(2, 'day'))) {
      console.log('\n');
      console.log(chalk.blue('[check-version-md]: Check Passed'));
      console.log('\n');
      process.exit(0);
    }
  }
  console.log('\n');
  console.log(chalk.red('[check-version-md]: The date wrongly written'));
  console.log('\n');
  process.exit(1);
}
