const glob = require('glob');
const fs = require('fs');
const { uniq } = require('lodash');

function getExternalResources() {
  const files = glob.sync('{./{components,docs}/**/*.md,./site/**/*.{less,js,jsx}}');
  const resources = files.reduce((acc, file) => {
    const content = fs.readFileSync(file, 'utf-8');
    const pattern = new RegExp('(https://.+\\.alipayobjects\\.com/.+\\.(png|jpg|svg)|)', 'mg');
    const matches = content.match(pattern);
    if (matches) {
      acc = acc.concat(matches);
    }
    return acc;
  }, []);
  return uniq(resources);
}

module.exports = getExternalResources;
