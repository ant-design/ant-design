import path from 'path';
import { defineConfig } from 'vitest/config';

const resolve = (dir: string) => path.resolve(__dirname, dir);

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
  },
  resolve: {
    mainFields: ['module', 'main'],
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
    include: ['components/**/*.test.*'],
    exclude: ['**/{demo,demo-extend,node}.test.*', 'components/dropdown/**'],
    globals: true,
    setupFiles: ['./tests/setup.ts', './tests/setupPuppeteer.ts'],
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
  plugins: [
    {
      name: 'antd',
      configResolved(config) {
        console.log(
          '🚀 ~ file: vitest.config.ts:41 ~ configResolved ~ config:',
          config.resolve.mainFields,
        );
      },
    },
  ],
});
