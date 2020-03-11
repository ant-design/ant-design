const fs = require('fs');
const path = require('path');
const lessToJs = require('less-vars-to-js');

const stylePath = path.join(__dirname, '..', 'components', 'style');
const colorLess = fs.readFileSync(path.join(stylePath, 'color', 'colors.less'), 'utf8');
const defaultLess = fs.readFileSync(path.join(stylePath, 'themes', 'default.less'), 'utf8');
const narrowLess = fs.readFileSync(path.join(stylePath, 'themes', 'narrow.less'), 'utf8');

const narrowPaletteLess = lessToJs(`${colorLess}${defaultLess}${narrowLess}`, {
  stripPrefix: true,
  resolveVariables: false,
});

module.exports = narrowPaletteLess;
