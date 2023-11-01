// doc: https://github.com/raineorshine/npm-check-updates/tree/v16.14.6#readme
const path = require('path');

const rcOrg = ['@rc-component/', 'rc-'];
const check = ['@ant-design/', ...rcOrg];

// rules: https://github.com/ant-design/ant-design/pull/45593#issuecomment-1784891887
module.exports = {
  packageFile: path.resolve(__dirname, './package.json'),
  upgrade: false, // use `npx npm-check-updates -u` to upgrade
  packageManager: 'npm',
  dep: ['prod'], // check only prod dependencies
  // https://github.com/raineorshine/npm-check-updates#filter
  filter: (name) => check.some((prefix) => name.startsWith(prefix)),
  // https://github.com/raineorshine/npm-check-updates#target
  target: (name, semver) => {
    const { operator } = semver[0] ?? {};

    // rc-component
    if (rcOrg.some((prefix) => name.startsWith(prefix))) {
      // `^` always upgrade latest, otherwise follow semver.
      if (operator === '^') {
        return 'latest';
      }
    }

    return 'semver';
  },
};
