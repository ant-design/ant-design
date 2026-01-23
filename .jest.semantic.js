const { moduleNameMapper, transformIgnorePatterns } = require('./.jest');

// jest config for semantic demo snapshots
// Semantic tests don't need to run in React 18, 19, lib, es, dist repeatedly
module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  setupFiles: ['./tests/setup.ts', 'jest-canvas-mock'],
  setupFilesAfterEnv: ['./tests/setupAfterEnv.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'md'],
  modulePathIgnorePatterns: ['/_site/'],
  moduleNameMapper,
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '\\.tsx?$': './node_modules/@ant-design/tools/lib/jest/codePreprocessor',
    '\\.(m?)js$': './node_modules/@ant-design/tools/lib/jest/codePreprocessor',
    '\\.md$': './node_modules/@ant-design/tools/lib/jest/demoPreprocessor',
  },
  testRegex: 'demo-semantic\\.test\\.(j|t)sx?$',
  transformIgnorePatterns,
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.test.json',
    },
  },
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  testTimeout: 10000,
};
