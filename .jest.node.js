const libDir = process.env.LIB_DIR;

module.exports = {
  setupFiles: ['./tests/setup.js'],
  moduleFileExtensions: ['js', 'md', 'ts', 'tsx'],
  transform: {
    '\\.tsx?$': './node_modules/antd-tools/lib/jest/codePreprocessor',
    '\\.js$': './node_modules/antd-tools/lib/jest/codePreprocessor',
    '\\.md$': './node_modules/antd-tools/lib/jest/demoPreprocessor',
  },
  testRegex: `${libDir === 'dist' ? 'demo' : '.*'}\\.test\\.js$`,
  testEnvironment: 'node',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.test.json',
    },
  },
};
