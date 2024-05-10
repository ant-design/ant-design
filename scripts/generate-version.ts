import fs from 'fs';
import path from 'path';

import { version } from '../package.json';

fs.writeFileSync(
  path.join(__dirname, '..', 'components', 'version', 'version.ts'),
  `export default '${version}';`,
  'utf8',
);
