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
      alias: {
        antd: resolve('./components'),
        'antd/es': resolve('./components'),
        'antd/lib': resolve('./components'),
        'antd/locale': resolve('./components/locale'),
      },
    },
    plugins: [
      react(),
      pages({
        extensions: ['tsx'],
        resolver: 'react',
        importMode: 'async',
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
