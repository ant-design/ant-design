import fs from 'fs-extra';
import path from 'path';
import localPackage from '../package.json';
import deprecatedVersions from '../deprecated-versions.json';

const outputBase = path.join(__dirname, '..', 'components', 'version');
const { version } = localPackage;

fs.writeFileSync(path.join(outputBase, 'version.ts'), `export default '${version}';`, 'utf8');

// Compression formatting and rename to deprecated.json
fs.writeJsonSync(path.join(outputBase, 'deprecated.json'), deprecatedVersions);
