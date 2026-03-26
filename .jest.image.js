const { moduleNameMapper, transformIgnorePatterns } = require('./.jest');

module.exports = {
  setupFiles: ['./tests/setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'md'],
  moduleNameMapper,
  transform: {
    '^.+\\.(ts|tsx|js|mjs)$': './node_modules/@ant-design/tools/lib/jest/codePreprocessor',
    '\\.md$': './node_modules/@ant-design/tools/lib/jest/demoPreprocessor',
    '\\.(jpg|png|gif|svg)$': './node_modules/@ant-design/tools/lib/jest/imagePreprocessor',
  },
  testRegex: 'image\\.test\\.(j|t)s$',
  transformIgnorePatterns,
  globals: {
    'ts-jest': {
      tsConfigFile: './tsconfig.test.json',
    },
  },
  preset: 'jest-puppeteer',
  testTimeout: 20000,
};
