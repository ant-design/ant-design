/* eslint-disable no-console */
import { spawnSync, execSync } from 'child_process';
import chalk from 'chalk';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import inquirer from 'inquirer';
import fetch from 'isomorphic-fetch';
import semver from 'semver';
import ora from 'ora';

import deprecatedVersions from '../BUG_VERSIONS.json';
import { version as packageVersion } from '../package.json';

dayjs.extend(relativeTime);

const CONCH_TAG = 'conch-v5';

function matchDeprecated(v: string) {
  const match = Object.keys(deprecatedVersions).find((depreciated) =>
    semver.satisfies(v, depreciated),
  );

  const reason = deprecatedVersions[match as keyof typeof deprecatedVersions] || [];

  return {
    match,
    reason: Array.isArray(reason) ? reason : [reason],
  };
}

const SAFE_DAYS_START = 1000 * 60 * 60 * 24 * 15; // 15 days
const SAFE_DAYS_DIFF = 1000 * 60 * 60 * 24 * 3; // 3 days not update seems to be stable

(async function process() {
  console.log('🤖 Post Publish Scripting...\n');

  // git tag
  const spinner = ora(chalk.cyan(`Tagging ${packageVersion}`)).start();
  execSync(`git tag ${packageVersion}`);
  execSync(`git push origin ${packageVersion}:${packageVersion}`);
  spinner.succeed(
    chalk.cyan(
      `Tagged ${packageVersion} 📦: https://github.com/ant-design/ant-design/releases/tag/${packageVersion}`,
    ),
  );
  console.log();

  const { time, 'dist-tags': distTags } = await fetch('http://registry.npmjs.org/antd').then(
    (res: Response) => res.json(),
  );

  console.log('🐚 Latest Conch Version:', chalk.green(distTags[CONCH_TAG] || 'null'), '\n');

  // Sort and get the latest versions
  const versionList = Object.keys(time)
    .filter((version) => semver.valid(version) && !semver.prerelease(version))
    .sort((v1, v2) => {
      const time1 = dayjs(time[v1]).valueOf();
      const time2 = dayjs(time[v2]).valueOf();

      return time2 - time1;
    });

  // Slice for choosing the latest versions
  const latestVersions = versionList
    // Cut off
    .slice(0, 30)
    // Formatter
    .map((version) => ({
      publishTime: time[version],
      timeDiff: dayjs().diff(dayjs(time[version])),
      value: version,
      depreciated: matchDeprecated(version).match,
    }));

  const filteredLatestVersions = latestVersions
    // Filter deprecated versions
    .filter(({ depreciated }) => !depreciated);

  const startDefaultVersionIndex = filteredLatestVersions.findIndex(
    ({ timeDiff }) => timeDiff >= SAFE_DAYS_START,
  );
  const defaultVersionList = filteredLatestVersions
    .slice(0, startDefaultVersionIndex + 1)
    .reverse();

  // Find safe version
  let defaultVersionObj;
  for (let i = 0; i < defaultVersionList.length - 1; i += 1) {
    defaultVersionObj = defaultVersionList[i];
    const nextVersionObj = defaultVersionList[i + 1];

    if (defaultVersionObj.timeDiff - nextVersionObj.timeDiff > SAFE_DAYS_DIFF) {
      break;
    }

    defaultVersionObj = null;
  }

  // Not find to use the latest version instead
  defaultVersionObj = defaultVersionObj || defaultVersionList[defaultVersionList.length - 1];
  let defaultVersion = defaultVersionObj ? defaultVersionObj.value : null;

  // If default version is less than current, use current
  if (semver.compare(defaultVersion!, distTags[CONCH_TAG]) < 0) {
    defaultVersion = distTags[CONCH_TAG];
  }

  // Selection
  let { conchVersion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'conchVersion',
      default: defaultVersion,
      message: 'Please select Conch Version:',
      choices: latestVersions.map((info) => {
        const { value, publishTime, depreciated } = info;
        const desc = dayjs(publishTime).fromNow();

        //

        return {
          ...info,
          name: [
            // Warning
            depreciated ? '🚨' : '✅',
            // Version
            value,
            // Date Diff
            `(${desc})`,
            // Default Mark
            value === defaultVersion ? '(default)' : '',
            // Current Mark
            value === distTags[CONCH_TAG] ? chalk.gray('- current') : '',
          ]
            .filter((str) => String(str).trim())
            .join(' '),
        };
      }),
    },
  ]);

  // Make sure it's not deprecated version
  const deprecatedObj = matchDeprecated(conchVersion);
  if (deprecatedObj.match) {
    console.log('\n');
    console.log(chalk.red('Deprecated For:'));
    deprecatedObj.reason.forEach((reason) => {
      console.log(chalk.yellow(`  * ${reason}`));
    });
    console.log('\n');

    const { conchConfirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'conchVersion',
        default: false,
        message: 'SURE to continue?!!',
      },
    ]);

    if (!conchConfirm) {
      conchVersion = null;
    }
  }

  // Check if need to update
  if (!conchVersion || distTags[CONCH_TAG] === conchVersion) {
    console.log(`🎃 Conch Version not change. Safe to ${chalk.green('ignore')}.`);
  } else {
    console.log('💾 Tagging Conch Version:', chalk.green(conchVersion));
    spawnSync('npm', ['dist-tag', 'add', `antd@${conchVersion}`, CONCH_TAG], { stdio: 'inherit' });
  }
})();
