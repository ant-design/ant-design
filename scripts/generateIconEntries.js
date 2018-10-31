const fs = require('fs');
const shell = require('shelljs');
const { camelCase, capitalize, upperFirst } = require('lodash');
const manifest = require('@ant-design/icons/lib/manifest').default;

const themeMap = {
  fill: 'filled',
  outline: 'outlined',
  twotone: 'twoTone',
};

shell.rm('-rf', 'icons');
shell.mkdir('-p', 'icons/es');
shell.cp('./lib/icon/icons/index.js', './icons');
shell.cp('./es/icon/icons/index.js', './icons/es');

const icons = [];
Object.keys(manifest).forEach(theme => {
  manifest[theme].forEach(name => {
    const baseName = upperFirst(camelCase(name));
    const componentName = baseName + capitalize(themeMap[theme]);
    icons.push(componentName);
    fs.writeFileSync(
      `./icons/es/${componentName}.js`,
      `
import ${componentName} from '../es/icon/icons/${componentName}';
export default ${componentName};
    `,
    );

    fs.writeFileSync(
      `./icons/${componentName}.js`,
      `
'use strict';
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _${componentName} = require('../lib/icon/icons/${componentName}');
var _${componentName}2 = _interopRequireDefault(_${componentName});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = _${componentName}2['default'];
module.exports = exports['default'];
    `,
    );
  });
});
