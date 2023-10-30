// doc: https://github.com/raineorshine/npm-check-updates#readme
const path = require('path');

// https://github.com/react-component/
const rcOrg = ['@rc-component/', 'rc-'];
const check = ['@ant-design/', ...rcOrg];

module.exports = {
  packageFile: path.resolve(__dirname, './package.json'),
  upgrade: false, // use `npx npm-check-updates -u` to upgrade
  target: 'semver', // package.json semver
  packageManager: 'npm',
  dep: ['prod'], // check only prod dependencies
  // https://github.com/raineorshine/npm-check-updates#filter
  filter: (name) => check.some((prefix) => name.startsWith(prefix)),
};
