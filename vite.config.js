// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig, loadEnv } from 'vite';
// eslint-disable-next-line import/no-extraneous-dependencies
import react from '@vitejs/plugin-react';
import pages from 'vite-plugin-pages';
import isCI from 'is-ci';
import { URL, fileURLToPath } from 'node:url';

const resolve = (path) => fileURLToPath(new URL(path, import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));

  return {
    server: {
      port: process.env.PORT || 8002,
      open: isCI ? false : mode === 'development',
    },
    root: resolve('./playground'),
    resolve: {
      // alias: {
      //   'antd': resolve('./components'),
      //   'antd/es': resolve('./components'),
      // },
      alias: [
        { find: /^antd$/, replacement: resolve('./components') },

        { find: /^antd\/es(.*)$/, replacement: resolve('./components$1') },
        { find: /^antd\/lib(.*)$/, replacement: resolve('./components$1') },

        { find: /^antd\/style(.*)$/, replacement: resolve('./components/style$1') },
        { find: /^antd\/locale(.*)$/, replacement: resolve('./components/locale$1') },
      ],
    },
    define: {
      __CI__: isCI,
    },
    plugins: [
      react(),
      pages({
        resolver: 'react',
        importMode: isCI ? 'sync' : 'async',
        dirs: [
          {
            dir: resolve('./components'),
            baseRoute: '',
            filePattern: '*/demo/[a-z]*.tsx',
          },
        ],
      }),
    ],
  };
});
