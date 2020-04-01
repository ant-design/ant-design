/**
 * convert dark.less into js vars
 *
 * const darkVars = require('./dark-vars');
 */
const fs = require('fs');
const path = require('path');
const lessToJs = require('less-vars-to-js');

const stylePath = path.join(__dirname, '..', 'components', 'style');
const colorLess = fs.readFileSync(path.join(stylePath, 'color', 'colors.less'), 'utf8');
const defaultLess = fs.readFileSync(path.join(stylePath, 'themes', 'default.less'), 'utf8');
const darkLess = fs.readFileSync(path.join(stylePath, 'themes', 'dark.less'), 'utf8');

const darkPaletteLess = lessToJs(`${colorLess}${defaultLess}${darkLess}`, {
  stripPrefix: true,
  resolveVariables: false,
});

module.exports = darkPaletteLess;
