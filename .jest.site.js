const { moduleNameMapper } = require('./.jest');

// jest config for server render environment
module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'md'],
  moduleNameMapper,
  transform: {
    '^.+\\.(ts|tsx|js|mjs)$': './node_modules/@ant-design/tools/lib/jest/codePreprocessor',
    '\\.md$': './node_modules/@ant-design/tools/lib/jest/demoPreprocessor',
    '\\.(jpg|png|gif|svg)$': './node_modules/@ant-design/tools/lib/jest/imagePreprocessor',
  },
  testRegex: 'check-site\\.(j|t)s$',
  testEnvironment: 'node',
  // Don't use transformIgnorePatterns from .jest.js to avoid parse5/esm issues
  globals: {
    'ts-jest': {
      tsConfigFile: './tsconfig.test.json',
    },
  },
};
