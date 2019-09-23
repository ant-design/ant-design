const fs = require('fs');
const path = require('path');
const packageInfo = require('../package.json');

packageInfo.publishConfig.registry = 'https://npm.pkg.github.com';

fs.writeFileSync(path.join(__dirname, '../package.json'), JSON.stringify(packageInfo));
