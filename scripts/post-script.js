/* eslint-disable no-console */
const fetch = require('isomorphic-fetch');
const semver = require('semver');
const moment = require('moment');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { spawnSync } = require('child_process');

const SAFE_DAYS_START = 1000 * 60 * 60 * 24 * 15; // 15 days
const SAFE_DAYS_DIFF = 1000 * 60 * 60 * 24 * 3; // 3 days not update seems to be stable

(async function process() {
  console.log(chalk.cyan('🤖 Post Publish Scripting...\n'));
  const { time, 'dist-tags': distTags } = await fetch('http://registry.npmjs.org/antd').then(res =>
    res.json(),
  );

  console.log('🐚 Latest Conch Version:', chalk.green(distTags.conch || 'null'), '\n');

  // Sort and get the latest versions
  const versionList = Object.keys(time)
    .filter(version => semver.valid(version) && !semver.prerelease(version))
    .sort((v1, v2) => {
      const time1 = moment(time[v1]).valueOf();
      const time2 = moment(time[v2]).valueOf();

      return time2 - time1;
    });

  // Slice for choosing the latest versions
  const latestVersions = versionList.slice(0, 20).map(version => ({
    publishTime: time[version],
    timeDiff: moment().diff(moment(time[version])),
    value: version,
  }));

  const startDefaultVersionIndex = latestVersions.findIndex(
    ({ timeDiff }) => timeDiff >= SAFE_DAYS_START,
  );
  const defaultVersionList = latestVersions.slice(0, startDefaultVersionIndex + 1).reverse();

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
  const defaultVersion = defaultVersionObj ? defaultVersionObj.value : null;

  // Selection
  const { conchVersion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'conchVersion',
      default: defaultVersion,
      message: 'Please select Conch Version:',
      choices: latestVersions.map(info => {
        const { value, publishTime } = info;
        const desc = moment(publishTime).fromNow();

        return {
          ...info,
          name: `${value} (${desc}) ${value === defaultVersion ? '(default)' : ''}`,
        };
      }),
    },
  ]);

  // Check if need to update
  if (distTags.conch === conchVersion) {
    console.log(`🎃 Conch Version not change. Safe to ${chalk.green('ignore')}.`);
  } else {
    console.log('💾 Tagging Conch Version:', chalk.green(conchVersion));
    spawnSync('npm', ['dist-tag', 'add', `antd@${conchVersion}`, 'conch'], {
      stdio: 'inherit',
      stdin: 'inherit',
    });
  }
})();
