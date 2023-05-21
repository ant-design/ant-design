import path from 'path';
import React from 'react';
import type { UserConfig } from 'vitest/config';
import { defineConfig } from 'vitest/config';

const resolve = (dir: string) => path.resolve(__dirname, dir);

const include = ['lib', 'es', 'dist'].includes(process.env.LIB_DIR || '')
  ? ['components/*/__tests__/demo.test.{ts,tsx}']
  : ['components/*/__tests__/*.test.{ts,tsx}'];

export const commonConfig: UserConfig = {
  esbuild: {
    jsx: React.version.startsWith('16') ? 'transform' : 'automatic',
  },
  resolve: {
    mainFields: ['module'],
    alias: [
      {
        find: 'antd',
        replacement: resolve('components/index'),
      },
      {
        find: 'antd/es',
        replacement: resolve('components'),
      },
      {
        find: /@ant-design\/icons\/lib\/(.*)/,
        replacement: '@ant-design/icons/es/$1',
      },
      {
        find: /^@ant-design\/icons\/(?!es$)([\w-]*)$/,
        replacement: '@ant-design/icons/es/icons/$1',
      },
      {
        find: /rc-([\w-]+)\/lib\/(.*)/,
        replacement: 'rc-$1/es/$2',
      },
      // Fixes https://github.com/glennreyes/react-countup/issues/805#issuecomment-1536311026
      {
        find: 'countup.js',
        replacement: 'countup.js/countUp.umd.js',
      },
    ],
  },
  test: {
    testTimeout: 5000,
    deps: {
      inline: ['react-countup', 'countup.js'],
    },
  },
};

export default defineConfig({
  ...commonConfig,
  test: {
    ...commonConfig.test,
    include,
    exclude: ['**/{node,image}.test.*', 'components/dropdown/**', 'node_modules', 'dist'],
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    environment: 'jsdom',
    coverage: {
      exclude: [
        'components/*/style/index.tsx',
        'components/style/index.tsx',
        'components/*/locale/index.tsx',
        'components/*/__tests__/type.test.tsx',
        'components/**/*/interface.{ts,tsx}',
        'components/*/__tests__/image.test.{ts,tsx}',
        'components/__tests__/node.test.tsx',
        'components/*/demo/*.tsx',
        'components/*/design/**',
      ],
    },
  },
});
