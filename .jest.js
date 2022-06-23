const transformIgnorePatterns = [
  '/dist/',
  // Ignore modules without es dir.
  // Update: @babel/runtime should also be transformed
  'node_modules/(?!.*@(babel|ant-design))(?!array-move)[^/]+?/(?!(es|node_modules)/)',
];

function getTestRegex(libDir) {
  if (libDir === 'dist') {
    return 'demo\\.test\\.js$';
  }
  return '.*\\.test\\.(j|t)sx?$';
}

/** @type {import('@jest/types').Config.InitialOptions} */
const commonConfig = {
  verbose: true,
  testEnvironment: 'jsdom',
  setupFiles: ['./tests/setup.js'],
  setupFilesAfterEnv: ['./tests/setupAfterEnv.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'md'],
  modulePathIgnorePatterns: ['/_site/'],
  moduleNameMapper: {
    '/^dnd-core$/': 'dnd-core/dist/cjs',
    '/^react-dnd$/': 'react-dnd/dist/cjs',
    '/^react-dnd-html5-backend$/': 'react-dnd-html5-backend/dist/cjs',
    '/^react-dnd-touch-backend$/': 'react-dnd-touch-backend/dist/cjs',
    '/^react-dnd-test-backend$/': 'react-dnd-test-backend/dist/cjs',
    '/^react-dnd-test-utils$/': 'react-dnd-test-utils/dist/cjs',
    '/\\.(css|less)$/': 'identity-obj-proxy',
  },
  transformIgnorePatterns,
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
};

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  projects: [
    {
      ...commonConfig,
      transform: {
        '\\.tsx?$': './node_modules/@ant-design/tools/lib/jest/codePreprocessor',
        '\\.(m?)js$': './node_modules/@ant-design/tools/lib/jest/codePreprocessor',
        '\\.md$': './node_modules/@ant-design/tools/lib/jest/demoPreprocessor',
        '\\.(jpg|png|gif|svg)$': './node_modules/@ant-design/tools/lib/jest/imagePreprocessor',
      },
      testRegex: getTestRegex(process.env.LIB_DIR),
      testPathIgnorePatterns: [
        '/node_modules/',
        'dekko',
        'node',
        'image.test.js',
        'image.test.ts',
        'strict.test.tsx?',
      ],
    },
    {
      ...commonConfig,
      testRegex: '.*\\.strict\\.test\\.tsx?$',
      displayName: 'type-strict',
      transform: {
        '\\.tsx?$': 'ts-jest',
        '\\.(m?)js$': './node_modules/@ant-design/tools/lib/jest/codePreprocessor',
      },
      globals: {
        'ts-jest': {
          tsconfig: 'tsconfig.strict.test.json',
        },
      },
    },
  ],
};

module.exports = config;
