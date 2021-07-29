const { moduleNameMapper, transformIgnorePatterns } = require('./.jest');

// jest config for server render environment
module.exports = {
  setupFiles: ['./tests/setup.js'],
  setupFilesAfterEnv: ['./tests/setupAfterEnv.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'md'],
  moduleNameMapper,
  transform: {
    '\\.tsx?$': './node_modules/@infra-fe/tools/lib/jest/codePreprocessor',
    '\\.js$': './node_modules/@infra-fe/tools/lib/jest/codePreprocessor',
    '\\.md$': './node_modules/@infra-fe/tools/lib/jest/demoPreprocessor',
    '\\.(jpg|png|gif|svg)$': './node_modules/@infra-fe/tools/lib/jest/imagePreprocessor',
  },
  testRegex: 'demo\\.test\\.(j|t)s$',
  testEnvironment: 'node',
  transformIgnorePatterns,
  snapshotSerializers: ['enzyme-to-json/serializer'],
};
