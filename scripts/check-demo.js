const path = require('path');
const fs = require('fs');
const yfm = require('yaml-front-matter');
const glob = require('glob');

const demoFiles = glob.sync(path.join(process.cwd(), 'components/**/demo/*.md'));
// eslint-disable-next-line no-restricted-syntax
for (const url of demoFiles) {
  const demoContent = fs.readFileSync(url);
  const meta = yfm.loadFront(demoContent);
  if (meta.only) {
    throw Error(`there is a 'only': ${url}`);
  }
}
