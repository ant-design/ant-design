const fs = require('fs-extra');
const path = require('path');

const { version } = require('../package.json');

fs.writeFileSync(path.join(__dirname, '..', 'version.js'), `export default '${version}'`, 'utf8');
