const glob = require('glob');
const fs = require('fs');
const { uniq } = require('lodash');

function getExternalResources() {
  let resources = [];
  const files = glob.sync('{./{components,docs}/**/*.md,./site/**/*.{less,js,jsx}}');
  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf-8');
    const pattern = new RegExp('(https://.+\\.alipayobjects\\.com/.+\\.(png|jpg|svg)|)', 'mg');
    const matches = content.match(pattern);
    if (matches) {
      resources = resources.concat(matches);
    }
  });
  return uniq(resources);
}

module.exports = getExternalResources;
