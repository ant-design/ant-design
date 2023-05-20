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
    include: ['components/*/__tests__/*.test.*'],
    exclude: ['**/{image,demo,demo-extend}.test.*', 'components/dropdown/**'],
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    environment: 'jsdom',
    deps: {
      inline: ['countup.js'],
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
