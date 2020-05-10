const fs = require('fs');
const path = require('path');
const lessToJs = require('less-vars-to-js');

const stylePath = path.join(__dirname, '..', 'components', 'style');
const compactLess = fs.readFileSync(path.join(stylePath, 'themes', 'compact.less'), 'utf8');

const compactPaletteLess = lessToJs(compactLess, {
  stripPrefix: true,
  resolveVariables: false,
});

module.exports = compactPaletteLess;
