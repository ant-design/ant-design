const { moduleNameMapper, transformIgnorePatterns } = require('./.jest');

// jest config for image snapshots
module.exports = {
  setupFiles: ['./tests/setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'md'],
  moduleNameMapper,
  transform: {
    '\\.tsx?$': './node_modules/@ant-design/tools/lib/jest/codePreprocessor',
    '\\.js$': './node_modules/@ant-design/tools/lib/jest/codePreprocessor',
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
  testTimeout: 10000,
};
