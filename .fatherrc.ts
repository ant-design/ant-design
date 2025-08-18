import { defineConfig } from 'father';
import path from 'path';

const externalsConfig = {
  react: {
    root: 'React',
    commonjs: 'react',
  },
  dayjs: {
    root: 'dayjs',
    commonjs: 'dayjs',
  },
  'react-dom': {
    root: 'ReactDOM',
    commonjs: 'react-dom',
  },
};

const resolveAliasConfig = {
  '@ant-design/cssinjs': path.resolve(__dirname, 'alias/cssinjs'),
};

// const restCssPath = path.join(process.cwd(), 'components', 'style', 'reset.css');
// const outputResetCssPath = path.join(process.cwd(), 'dist', 'reset.css');

export default defineConfig({
  umd: {
    entry: {
      './index.js': {
        name: 'antd',
        sourcemap: true,
        generateUnminified: true,
        bundler: 'utoopack',
        externals: externalsConfig,
        output: {
          path: './dist',
          filename: 'antd.js',
        },
        alias: {
          ...resolveAliasConfig,
        },
        concatenateModules: true,
      },
      './index-with-locales.js': {
        name: 'antd',
        sourcemap: true,
        generateUnminified: true,
        bundler: 'utoopack',
        externals: externalsConfig,
        output: {
          path: './dist',
          filename: 'antd-with-locales.js',
        },
        alias: {
          ...resolveAliasConfig,
        },
        concatenateModules: true,
      },
    },
    copy: [
      {
        from: './components/style/reset.css',
        to: './reset.css',
      },
      {
        from: './components/style/antd.css',
        to: './antd.css',
      },
    ],
  },
});
