/**
 * Convert dark.less into js vars
 *
 * @example
 *   const darkVars = require('./dark-vars');
 */
const fs = require('fs');
const path = require('path');
const lessToJs = require('less-vars-to-js');

const stylePath = path.join(__dirname, '..', 'components', 'style');
const darkLess = fs.readFileSync(path.join(stylePath, 'themes', 'dark.less'), 'utf8');

const darkPaletteLess = lessToJs(darkLess, {
  stripPrefix: true,
  resolveVariables: false,
});

module.exports = darkPaletteLess;
