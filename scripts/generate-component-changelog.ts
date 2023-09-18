/* eslint-disable no-loop-func, no-console */
// Collect from `changelog.md` to get all components changelog
import path from 'path';
import fs from 'fs-extra';
import { globSync } from 'glob';

const output = '.dumi/preset';

// Collect components
const componentNames = globSync(
  path
    .join(process.cwd(), 'components/!(version|icon|col|row)/index.zh-CN.md')
    .split(path.sep)
    .join('/'),
)
  .map((filePath) => filePath.replace(/\\/g, '/').match(/components\/([^/]*)\//)![1])
  .filter((name) => name !== 'overview');

const camelComponentNames = componentNames.map((componentName) =>
  componentName
    .split('-')
    .map((cell) => (cell.length <= 2 ? cell.toUpperCase() : cell[0].toUpperCase() + cell.slice(1)))
    .join(''),
);

function fillComponentKey(componentName: string): RegExp[] {
  return [new RegExp(`(?<!\\.)\\b${componentName}\\b`)];
}

// Convert a mapping logic
const componentNameMap: Record<string, (string | RegExp)[]> = {};
camelComponentNames.forEach((name) => {
  componentNameMap[name] = [...fillComponentKey(name), 'Global:'];
});

componentNameMap.ConfigProvider.push(...fillComponentKey('Wave'));
componentNameMap.Grid.push(...fillComponentKey('Row'));
componentNameMap.Grid.push(...fillComponentKey('Col'));
componentNameMap.Message.push(...fillComponentKey('message'));
componentNameMap.Notification.push(...fillComponentKey('notification'));

// Collect misc. When ComponentName not match will fallback to misc
const miscKeys = [
  'ComponentToken',
  'Component Token',
  'Design Token',
  'MISC:',
  '杂项：',
  '@ant-design/cssinjs',
  '@ant-design/icons',
  'rc-motion',
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
  const missingChangelog = [];
  const miscChangelog: string[] = [];

  // Read & write components changelog
  function syncChangelog(sourceFile: string, targetFile: string) {
    const content = fs.readFileSync(sourceFile).toString();

    // let lastGroup = '';
    let lastVersion = '';

    // Split with lines
    const lines = content.split(/[\n\r]+/).filter((line) => line.trim());

    // Changelog map
    const componentChangelog: Record<
      string,
      { version: string; changelog: string; refs: string[] }[]
    > = {};
    Object.keys(componentNameMap).forEach((name) => {
      componentChangelog[name] = [];
    });

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];

      // Skip for v5 release
      if (line === '## 5.0.0') {
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
        // lastGroup = '';
      }

      // Group check
      if (line.startsWith('- ') && lines[i + 1].startsWith('  - ')) {
        // lastGroup = line.replace('- ', '');
        continue;
      }

      // Filter not is changelog
      if (!line.trim().startsWith('-') && !line.includes('github.')) {
        continue;
      }

      // Collect Components
      let matched = false;
      const refs: string[] = [];

      let changelogLine = line.trim().replace('- ', '');
      changelogLine = changelogLine
        .replace(/\[([^\]]+)]\(([^)]+)\)/g, (...match) => {
          const [, title, ref] = match;
          if (ref.includes('/pull/')) {
            refs.push(ref);
          }

          if (title && (title[0] === '#' || title[0] === '@')) {
            return '';
          }

          return title;
        })
        .trim();

      Object.keys(componentNameMap).forEach((name) => {
        const matchKeys = componentNameMap[name];

        if (
          matchKeys.some((key) => {
            if (typeof key === 'string') {
              return line.includes(key);
            }
            return key.test(line);
          })
        ) {
          componentChangelog[name].push({
            version: lastVersion,
            changelog: changelogLine,
            refs,
          });
          matched = true;
        }
      });

      if (matched) {
        continue;
      }

      // Misc
      if (miscKeys.some((key) => line.includes(key))) {
        miscChangelog.push(line);
        continue;
      }

      if (!matched) {
        console.log('🚨 Miss Component:', line);
        missingChangelog.push(line);
      }
    }

    fs.writeFileSync(path.join(output, targetFile), JSON.stringify(componentChangelog), 'utf-8');
  }

  syncChangelog('CHANGELOG.zh-CN.md', 'components-changelog-cn.json');
  syncChangelog('CHANGELOG.en-US.md', 'components-changelog-en.json');
  fs.writeFileSync(
    path.join(output, 'misc-changelog.json'),
    JSON.stringify(miscChangelog),
    'utf-8',
  );

  if (missingChangelog.length) {
    console.log('\nMISC key word should be:');
    console.log(miscKeys.join(' , '), '\n');
    throw new Error(`Component changelog miss match!`);
  }
})();
