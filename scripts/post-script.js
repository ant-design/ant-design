/* eslint-disable no-console */
const { spawnSync } = require('child_process');
const fetch = require('isomorphic-fetch');
const semver = require('semver');
const moment = require('moment');
const chalk = require('chalk');

const DEPRECIATED_VERSION = {
  '>= 4.21.6 < 4.22.0': ['https://github.com/ant-design/ant-design/pull/36682'],
  '>=4.22.2 <=4.22.5': [
    'https://github.com/ant-design/ant-design/issues/36932',
    'https://github.com/ant-design/ant-design/pull/36800',
    'https://github.com/ant-design/ant-design/issues/37024',
  ],
  '4.23.0': ['https://github.com/ant-design/ant-design/issues/37461'],
  '4.23.5': [
    'https://github.com/ant-design/ant-design/issues/37929',
    'https://github.com/ant-design/ant-design/issues/37931',
  ],
  '4.24.0': ['https://github.com/ant-design/ant-design/issues/38371'],
  '4.24.11': ['https://github.com/react-component/field-form/pull/593'],
};

function matchDeprecated(version) {
  const match = Object.keys(DEPRECIATED_VERSION).find((depreciated) =>
    semver.satisfies(version, depreciated),
  );

  const reason = DEPRECIATED_VERSION[match] || [];

  return {
    match,
    reason: Array.isArray(reason) ? reason : [reason],
  };
}

const SAFE_DAYS_START = 1000 * 60 * 60 * 24 * 15; // 15 days
const SAFE_DAYS_DIFF = 1000 * 60 * 60 * 24 * 3; // 3 days not update seems to be stable

(async function process() {
  console.log(chalk.cyan('🤖 Post Publish Scripting...\n'));
  const { time, 'dist-tags': distTags } = await fetch('http://registry.npmjs.org/antd').then(
    (res) => res.json(),
  );

  console.log('🐚 Latest Conch Version:', chalk.green(distTags.conch || 'null'), '\n');

  // Sort and get the latest versions
  const versionList = Object.keys(time)
    .filter((version) => semver.satisfies(version, '4.x'))
    .filter((version) => semver.valid(version) && !semver.prerelease(version))
    .sort((v1, v2) => {
      const time1 = moment(time[v1]).valueOf();
      const time2 = moment(time[v2]).valueOf();

      return time2 - time1;
    });

  // Slice for choosing the latest versions
  const latestVersions = versionList
    // Cut off
    .slice(0, 30)
    // Formatter
    .map((version) => ({
      publishTime: time[version],
      timeDiff: moment().diff(moment(time[version])),
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
  if (semver.compare(defaultVersion, distTags.conch) < 0) {
    defaultVersion = distTags.conch;
  }

  const { default: inquirer } = await import('inquirer');
  // Selection
  let { conchVersion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'conchVersion',
      default: defaultVersion,
      message: 'Please select Conch Version:',
      choices: latestVersions.map((info) => {
        const { value, publishTime, depreciated } = info;
        const desc = moment(publishTime).fromNow();
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
            value === distTags.conch ? chalk.gray('- current') : '',
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
  if (!conchVersion || distTags.conch === conchVersion) {
    console.log(`🎃 Conch Version not change. Safe to ${chalk.green('ignore')}.`);
  } else {
    console.log('💾 Tagging Conch Version:', chalk.green(conchVersion));
    spawnSync('npm', ['dist-tag', 'add', `antd@${conchVersion}`, 'conch'], {
      stdio: 'inherit',
      stdin: 'inherit',
    });
  }
})();
