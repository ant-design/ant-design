const { moduleNameMapper } = require('./.jest');

// jest config for server render environment
const compileModules = [
  // jsdom 27+ depends on ESM parse5, need transform
  'parse5',
];

// cnpm use `_` as prefix
const ignoreList = ['', '_'].reduce(
  (acc, prefix) => [...acc, ...compileModules.map((module) => `${prefix}${module}`)],
  [],
);

const transformIgnorePatterns = [
  // 忽略无需转译的 node_modules，仅转译 compileModules 中的包
  `[/\\\\]node_modules[/\\\\](?!${ignoreList.join('|')})[^/\\\\]+?[/\\\\](?!(es)[/\\\\])`,
  // 忽略 antd 的 UMD 构建文件
  '[/\\\\]dist[/\\\\]antd.*\\.js$',
];

module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'md'],
  moduleNameMapper,
  transform: {
    '\\.tsx?$': './node_modules/@ant-design/tools/lib/jest/codePreprocessor',
    '\\.js$': './node_modules/@ant-design/tools/lib/jest/codePreprocessor',
    '\\.md$': './node_modules/@ant-design/tools/lib/jest/demoPreprocessor',
    '\\.(jpg|png|gif|svg)$': './node_modules/@ant-design/tools/lib/jest/imagePreprocessor',
  },
  testRegex: 'check-site\\.(j|t)s$',
  testEnvironment: 'node',
  transformIgnorePatterns,
  globals: {
    'ts-jest': {
      tsConfigFile: './tsconfig.test.json',
    },
  },
};
