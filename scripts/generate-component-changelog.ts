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

camelComponentNames.push('Global', 'Wave', 'Row', 'Col', 'message', 'notification');

console.log(camelComponentNames);

// Collect misc. When ComponentName not match will fallback to misc
const miscKeys = [
  'ComponentToken',
  'Design Token',
  'Arrow',
  '箭头',
  '@ant-design/cssinjs',
  '@ant-design/icons',
  ' IE ',
  'reset.css',
  '📖',
  '🛠',
  '🌐',
  ' locale ',
  ' RTL ',
  '🇧🇪',
  '🇨🇦',
  '🇪🇸',
  '🇷🇺',
  '🇺🇦',
  '🇲🇲',
  '🇸🇪',
  '🇻🇳',
  '🇮🇳',
  '🇮🇷',
  '🇰🇷',
  '🇩🇪',
  '🇱🇹',
];

(() => {
  const content = fs.readFileSync('CHANGELOG.zh-CN.md').toString();

  let lastGroup = '';
  let lastVersion = '';

  // Split with lines
  const lines = content.split(/[\n\r]+/).filter((line) => line.trim());

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];

    // Skip for v5 release
    if (line === '#### 升级必读' || line === '#### Read it before migration') {
      break;
    }

    // Get version
    if (line.startsWith('## ')) {
      lastVersion = line.replace('## ', '');
      continue;
    }

    // Start when get version
    if (!lastVersion) {
      continue;
    }

    // Group end
    if (line.startsWith('- ')) {
      lastGroup = '';
    }

    // Group check
    if (line.startsWith('- ') && lines[i + 1].startsWith('  - ')) {
      lastGroup = line.replace('- ', '');
      continue;
    }

    // Filter not is changelog
    if (!line.trim().startsWith('-') && !line.includes('github.')) {
      continue;
    }

    // Collect Components
    const matchComponents = camelComponentNames.filter((componentName) =>
      line.includes(componentName),
    );

    // Misc
    if (miscKeys.some((key) => line.includes(key))) {
      continue;
    }

    // console.log(line, matchComponents);

    if (!matchComponents.length) {
      console.log(line);
    }
  }
})();
