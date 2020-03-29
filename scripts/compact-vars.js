const fs = require('fs');
const path = require('path');
const lessToJs = require('less-vars-to-js');

const stylePath = path.join(__dirname, '..', 'components', 'style');
const colorLess = fs.readFileSync(path.join(stylePath, 'color', 'colors.less'), 'utf8');
const defaultLess = fs.readFileSync(path.join(stylePath, 'themes', 'default.less'), 'utf8');
const compactLess = fs.readFileSync(path.join(stylePath, 'themes', 'compact.less'), 'utf8');

const compactPaletteLess = lessToJs(`${colorLess}${defaultLess}${compactLess}`, {
  stripPrefix: true,
  resolveVariables: false,
});

module.exports = compactPaletteLess;
