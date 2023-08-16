import path from 'path';
import React from 'react';
import type { UserConfig } from 'vitest/config';
import { defaultExclude, defineConfig } from 'vitest/config';

const resolve = (dir: string) => path.resolve(__dirname, dir);

const include = ['lib', 'es', 'dist'].includes(process.env.LIB_DIR || '')
  ? ['components/*/__tests__/demo.test.{ts,tsx}']
  : ['components/**/__tests__/*.test.{ts,tsx}'];

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
    ],
  },
  test: {
    testTimeout: 5000,
  },
};

export default defineConfig({
  ...commonConfig,
  test: {
    ...commonConfig.test,
    include,
    exclude: ['**/{image,node}.test.*', ...defaultExclude],
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    environment: 'jsdom',
    coverage: {
      include: ['components/**/*.{ts,tsx}'],
      exclude: [
        '**/__tests__/**',
        'components/*/demo/*',
        'components/*/design/**',
        'components/**/style/*.tsx',
        'components/*/locale/index.tsx',
        'components/**/interface.{ts,tsx}',
      ],
    },
  },
});
