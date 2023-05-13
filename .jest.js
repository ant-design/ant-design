const compileModules = ['react-sticky-box', 'rc-tween-one', '@babel', '@ant-design', 'countup.js'];

const ignoreList = [];

// cnpm use `_` as prefix
['', '_'].forEach((prefix) => {
  compileModules.forEach((module) => {
    ignoreList.push(`${prefix}${module}`);
  });
});

const transformIgnorePatterns = [
  // Ignore modules without es dir.
  // Update: @babel/runtime should also be transformed
  `/node_modules/(?!${ignoreList.join('|')})[^/]+?/(?!(es)/)`,
];

function getTestRegex(libDir) {
  if (['dist', 'lib', 'es'].includes(libDir)) {
    return 'demo\\.test\\.(j|t)sx?$';
  }
  return '.*\\.test\\.(j|t)sx?$';
}

module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  setupFiles: ['./tests/setup.js', 'jest-canvas-mock'],
  setupFilesAfterEnv: ['./tests/setupAfterEnv.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'md'],
  modulePathIgnorePatterns: ['/_site/'],
  moduleNameMapper: {
    '/\\.(css|less)$/': 'identity-obj-proxy',
    '^antd$': '<rootDir>/components/index',
    '^antd/es/(.*)$': '<rootDir>/components/$1',
  },
  testPathIgnorePatterns: ['/node_modules/', 'dekko', 'node', 'image.test.js', 'image.test.ts'],
  transform: {
    '\\.tsx?$': './node_modules/@ant-design/tools/lib/jest/codePreprocessor',
    '\\.(m?)js$': './node_modules/@ant-design/tools/lib/jest/codePreprocessor',
    '\\.md$': './node_modules/@ant-design/tools/lib/jest/demoPreprocessor',
    '\\.(jpg|png|gif|svg)$': './node_modules/@ant-design/tools/lib/jest/imagePreprocessor',
  },
  testRegex: getTestRegex(process.env.LIB_DIR),
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    '!components/*/style/index.tsx',
    '!components/style/index.tsx',
    '!components/*/locale/index.tsx',
    '!components/*/__tests__/type.test.tsx',
    '!components/**/*/interface.{ts,tsx}',
    '!components/*/__tests__/image.test.{ts,tsx}',
    '!components/__tests__/node.test.tsx',
    '!components/*/demo/*.tsx',
    '!components/*/design/**',
  ],
  transformIgnorePatterns,
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.test.json',
    },
  },
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  // bail: true,
  maxWorkers: '50%',
};
