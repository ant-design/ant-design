import fs from 'fs';
import path from 'path';
import localPackage from '../package.json';

const { version } = localPackage;

fs.writeFileSync(
  path.join(__dirname, '..', 'components', 'version', 'version.ts'),
  `export default '${version}';`,
  'utf8',
);
