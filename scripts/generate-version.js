const path = require('path');
const fs = require('fs-extra');

const { version } = require('../package.json');

fs.ensureDirSync(path.join(__dirname, '..', 'components', 'version'));

fs.writeFileSync(
  path.join(__dirname, '..', 'components', 'version', 'index.ts'),
  `export default '${version}'`,
  'utf8',
);
