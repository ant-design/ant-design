import fs from 'fs-extra';
import path from 'path';
import localPackage from '../package.json';
import depreciatedVersions from '../depreciated-versions.json';

const outputBase = path.join(__dirname, '..', 'components', 'version');
const { version } = localPackage;

fs.writeFileSync(path.join(outputBase, 'version.ts'), `export default '${version}';`, 'utf8');

fs.writeJsonSync(path.join(outputBase, 'depreciated-version.json'), depreciatedVersions);
