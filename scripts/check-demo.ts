import fs from 'fs';
import { globSync } from 'glob';
import path from 'path';
import { loadFront } from 'yaml-front-matter';

const demoFiles = globSync(path.join(process.cwd(), 'components/**/demo/*.md'));
// eslint-disable-next-line no-restricted-syntax
for (const url of demoFiles) {
  const demoContent = fs.readFileSync(url);
  const meta = loadFront(demoContent);
  if (meta.only) {
    throw Error(`there is a 'only': ${url}`);
  }
}
