import fs from 'node:fs';
import path from 'node:path';

import { version } from '../package.json';

fs.writeFileSync(
  path.join(__dirname, '..', 'components', 'version', 'version.ts'),
  `export default '${version}';`,
  'utf8',
);
