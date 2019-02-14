const fs = require('fs');
const { camelCase, capitalize, upperFirst } = require('lodash');
const manifest = require('@ant-design/icons/lib/manifest').default;

const themeMap = {
  fill: 'filled',
  outline: '', // default theme
  twotone: 'twoTone',
};

const icons = [];
Object.keys(manifest).forEach(theme => {
  manifest[theme].forEach(name => {
    const baseName = upperFirst(camelCase(name));
    const componentName = baseName + capitalize(themeMap[theme]);
    const iconName = baseName + capitalize(theme);
    icons.push(componentName);
    console.log(`Generate: ${componentName}`);
    fs.writeFileSync(
      `./components/icon/icons/${componentName}.tsx`,
      `
// GENERATE BY ./scripts/generateIcons.js
// DON NOT EDIT IT MANUALLY
import * as React from 'react';
import ReactIcon from '@ant-design/icons-react';
import ${iconName} from '@ant-design/icons/lib/${theme}/${iconName}';
import Icon, { IconProps } from '..';

ReactIcon.add(${iconName});

export default (props: IconProps) => <Icon {...props} type="${name}" theme="${themeMap[theme] ||
        'outlined'}" />;
`,
    );
  });
});

fs.writeFileSync(
  './components/icon/icons/index.tsx',
  icons.reduce((content, icon) => {
    content += `export { default as ${icon} } from './${icon}'\n`; // eslint-disable-line
    return content;
  }, ''),
);
