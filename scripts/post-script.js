const fetch = require('isomorphic-fetch');
const semver = require('semver');
const moment = require('moment');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { spawnSync } = require('child_process');

const SAFE_DAYS_DIFF = 1000 * 60 * 60 * 24 * 15; // 15 days

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
  const latestVersions = versionList.slice(0, 10).map(version => ({
    publishTime: time[version],
    timeDiff: moment().diff(moment(time[version])),
    value: version,
  }));

  const defaultVersionObj = latestVersions.find(({ timeDiff }) => timeDiff >= SAFE_DAYS_DIFF);
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
