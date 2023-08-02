// Collect from `changelog.md` to get all components changelog
import fs from 'fs-extra';
import path from 'path';
import { globSync } from 'glob';
// import * as antd from 'antd';

// const componentNames = Object.keys(antd);
// console.log('>>>', componentNames);

// Collect components
const componentNames = globSync(
  path.join(process.cwd(), 'components/!(version|icon|col|row)/index.zh-CN.md'),
).map((filePath) => filePath.match(/components\/([^/]*)\//)![1]);

const camelComponentNames = componentNames.map((componentName) =>
  componentName
    .split('-')
    .map((cell) => (cell.length <= 2 ? cell.toUpperCase() : cell[0].toUpperCase() + cell.slice(1)))
    .join(''),
);

console.log(camelComponentNames);

// Collect misc. When ComponentName not match will fallback to misc
const miscKeys = ['Token'];

(() => {
  const content = fs.readFileSync('CHANGELOG.zh-CN.md').toString();

  let lastVersion = '';

  // Split with lines
  content.split(/[\n\r]+/).some((line) => {
    if (line === '## 4.x') {
      return true;
    }

    // Get version
    if (line.startsWith('## ')) {
      lastVersion = line.replace('## ', '');
      return false;
    }

    // Start when get version
    if (!lastVersion) {
      return false;
    }

    // Filter not is changelog
    if (!line.trim().startsWith('-') && !line.includes('github.')) {
      return false;
    }

    // Collect Components
    const matchComponents = camelComponentNames.filter((componentName) =>
      line.toUpperCase().includes(componentName.toUpperCase()),
    );

    // Misc
    if (miscKeys.some((key) => line.includes(key))) {
      return false;
    }

    // console.log(line, matchComponents);

    if (!matchComponents.length) {
      console.log(line);
    }

    return false;
  });
})();
