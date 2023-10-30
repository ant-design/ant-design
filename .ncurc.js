// doc: https://github.com/raineorshine/npm-check-updates#readme
const path = require('path');

// https://github.com/react-component/
const rcOrg = ['@rc-component/', 'rc-'];
const check = ['@ant-design/', ...rcOrg];

module.exports = {
  packageFile: path.resolve(__dirname, './package.json'),
  upgrade: false, // use `npx npm-check-updates -u` to upgrade
  target: 'latest', // always latest
  packageManager: 'npm',
  // https://github.com/raineorshine/npm-check-updates#filter
  filter: (name) => check.some((prefix) => name.startsWith(prefix)),
};
