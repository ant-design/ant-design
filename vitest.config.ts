import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

// Align with the historical moduleNameMapper / LIB_DIR behavior.
// LIB_DIR=es|lib points antd aliases to build output; dist jobs use UMD bundles.
const LIB_DIR = process.env.LIB_DIR || 'components';
const baseDir = ['es', 'lib'].includes(LIB_DIR) ? LIB_DIR : 'components';
const antdEntry =
  LIB_DIR === 'dist' ? 'dist/antd' : LIB_DIR === 'dist-min' ? 'dist/antd.min' : `${baseDir}/index`;
const include = ['dist', 'dist-min', 'lib', 'es'].includes(LIB_DIR)
  ? ['components/**/__tests__/demo.test.{ts,tsx}']
  : ['components/**/__tests__/**/*.test.{ts,tsx}', 'tests/*.test.ts'];
const shouldIgnoreSemantic =
  ['dist', 'lib', 'es', 'dist-min'].includes(LIB_DIR) ||
  ['1', 'true'].includes(process.env.SKIP_SEMANTIC || '');

const r = (p: string) => resolve(__dirname, p);

export default defineConfig({
  // JSX 走 automatic runtime（方案 A：丢弃 babel）。Vitest 4 默认转换器为 oxc，
  // 其 jsx.runtime 默认即 'automatic'，无需再像 esbuild 时代那样显式声明。
  resolve: {
    alias: [
      // LIB_DIR switching
      { find: /^antd$/, replacement: r(antdEntry) },
      { find: /^antd\/es\/(.*)$/, replacement: r(`${baseDir}/$1`) },
      { find: /^antd\/lib\/(.*)$/, replacement: r(`${baseDir}/$1`) },
      { find: /^antd\/locale\/(.*)$/, replacement: r(`${baseDir}/locale/$1`) },
      // Some antd ecosystem packages default to CJS lib/ and bypass aliases through
      // require('antd'). Force their ESM entries so imports resolve through the aliases above.
      { find: /^antd-style$/, replacement: r('node_modules/antd-style/es/index.js') },
      {
        find: /^@ant-design\/compatible$/,
        replacement: r('node_modules/@ant-design/compatible/es/index.js'),
      },
      {
        find: /^@ant-design\/happy-work-theme$/,
        replacement: r('node_modules/@ant-design/happy-work-theme/es/index.js'),
      },
      {
        find: /^@ant-design\/icons$/,
        replacement: r('node_modules/@ant-design/icons/es/index.js'),
      },
      {
        find: /^@ant-design\/icons\/lib\/(.*)$/,
        replacement: r('node_modules/@ant-design/icons/es/$1'),
      },
      {
        find: /^@ant-design\/icons\/es\/(.*)$/,
        replacement: r('node_modules/@ant-design/icons/es/$1'),
      },
      {
        find: /^@rc-component\/trigger$/,
        replacement: r('tests/__mocks__/@rc-component/trigger.tsx'),
      },
      {
        find: /^@rc-component\/resize-observer$/,
        replacement: r('node_modules/@rc-component/resize-observer/es/index.js'),
      },
      {
        find: /^@rc-component\/input$/,
        replacement: r('node_modules/@rc-component/input/es/index.js'),
      },
      {
        find: /^@rc-component\/(cascader|dropdown|mentions|menu|picker|select|tooltip|tour|tree-select)$/,
        replacement: r('node_modules/@rc-component/$1/es/index.js'),
      },
      // CSS-in-JS tests do not need real css/less output.
      { find: /\.(css|less)$/, replacement: 'identity-obj-proxy' },
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [r('vitest.setup.ts')],
    // Vitest snapshot keys differ from Jest. Keep baselines next to tests under a
    // vitest/ subdirectory so they do not collide with historical Jest snapshots.
    resolveSnapshotPath: (testPath, snapExtension) => {
      const normalized = testPath.replace(/\\/g, '/');
      const dir = normalized.slice(0, normalized.lastIndexOf('/'));
      const file = normalized.slice(normalized.lastIndexOf('/') + 1);
      return `${dir}/__snapshots__/vitest/${file}${snapExtension}`;
    },
    // Main jsdom scope. Dedicated node/image suites run through separate Vitest configs.
    include,
    exclude: [
      '**/node_modules/**',
      '**/__snapshots__/vitest/**',
      // 非 jsdom 环境或独立测试类型
      '**/image.test.*',
      '**/node.test.*',
      ...(shouldIgnoreSemantic ? ['**/demo-semantic.test.*'] : []),
      'components/__tests__/node.test.tsx',
    ],
    coverage: {
      include: ['components/**/*.{ts,tsx}'],
      reporter: ['json'],
      exclude: [
        'components/*/style/index.tsx',
        'components/style/index.tsx',
        'components/*/locale/index.tsx',
        'components/*/__tests__/type.test.tsx',
        'components/**/*/interface.{ts,tsx}',
        'components/*/__tests__/image.test.{ts,tsx}',
        'components/*/__tests__/demo-semantic.test.tsx',
        'components/__tests__/node.test.tsx',
        'components/*/demo/*.tsx',
        'components/*/design/**',
      ],
      excludeAfterRemap: true,
    },
    environmentOptions: {
      jsdom: { url: 'http://localhost' },
    },
    // 与历史测试配置 maxWorkers:'50%' 对齐，保证性能对比公平
    pool: 'threads',
    server: {
      deps: {
        // These dependencies import antd internally and need Vite processing to hit aliases.
        inline: [
          '@rc-component/cascader',
          '@rc-component/dropdown',
          '@rc-component/input',
          '@rc-component/mentions',
          '@rc-component/menu',
          '@rc-component/picker',
          '@rc-component/resize-observer',
          '@rc-component/select',
          '@rc-component/tooltip',
          '@rc-component/tour',
          '@rc-component/tree-select',
          '@rc-component/trigger',
          /@rc-component/,
          /@ant-design/,
          /antd-style/,
          /@emotion/,
        ],
      },
    },
  },
});
