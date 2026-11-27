import type { Config } from 'jest';

import jestConfig from './.jest.ts';

const { moduleNameMapper, transformIgnorePatterns, modulePathIgnorePatterns } = jestConfig;

// jest config for server render environment
const config: Config = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'md'],
  moduleNameMapper,
  modulePathIgnorePatterns,
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
} satisfies Config;

export default config;
