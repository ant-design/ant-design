import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

// POC: 对标 .jest.js 的 moduleNameMapper / LIB_DIR 机制。
// LIB_DIR=es|lib 时让 antd 指向对应产物目录，否则指向源码 components。
// 注：dist/dist-min（UMD 产物 dist/antd.js、dist/antd.min.js）的映射与源码不同，
// 本 POC 未验证，故不纳入；仅支持 es/lib 与默认 components。
const LIB_DIR = process.env.LIB_DIR || 'components';
const baseDir = ['es', 'lib'].includes(LIB_DIR) ? LIB_DIR : 'components';

const r = (p: string) => resolve(__dirname, p);

export default defineConfig({
  // JSX 走 automatic runtime（方案 A：丢弃 babel）。Vitest 4 默认转换器为 oxc，
  // 其 jsx.runtime 默认即 'automatic'，无需再像 esbuild 时代那样显式声明。
  resolve: {
    alias: [
      // 对标 jest moduleNameMapper，并接入 LIB_DIR 切换
      { find: /^antd$/, replacement: r(`${baseDir}/index`) },
      { find: /^antd\/es\/(.*)$/, replacement: r(`${baseDir}/$1`) },
      { find: /^antd\/lib\/(.*)$/, replacement: r(`${baseDir}/$1`) },
      { find: /^antd\/locale\/(.*)$/, replacement: r(`${baseDir}/locale/$1`) },
      // 部分 antd 生态包默认解析到 CJS lib/（内部 require('antd') 绕过 alias）；
      // 强制走各自 ESM es/，其 import 'antd' 可命中上面的 antd alias。
      { find: /^antd-style$/, replacement: r('node_modules/antd-style/es/index.js') },
      {
        find: /^@ant-design\/happy-work-theme$/,
        replacement: r('node_modules/@ant-design/happy-work-theme/es/index.js'),
      },
      // css/less → identity-obj-proxy（CSS-in-JS，测试不需要真实样式）
      { find: /\.(css|less)$/, replacement: 'identity-obj-proxy' },
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [r('vitest.setup.ts')],
    // POC：Vitest 的 snapshot key 格式与 Jest 不同（`A > B` vs `A B`）。将 Vitest 基线放在
    // 测试同目录的 __snapshots__/vitest/ 子目录，与组件就近存放；Jest 通过
    // modulePathIgnorePatterns 忽略该子目录，避免在 --ci 下把它判为 obsolete 而报错。
    resolveSnapshotPath: (testPath, snapExtension) => {
      const normalized = testPath.replace(/\\/g, '/');
      const dir = normalized.slice(0, normalized.lastIndexOf('/'));
      const file = normalized.slice(normalized.lastIndexOf('/') + 1);
      return `${dir}/__snapshots__/vitest/${file}${snapExtension}`;
    },
    // POC：include 选定三个组件，exclude 分两类——
    // (A) 非 jsdom / 非本 POC 范围的用例；
    // (B) 已知需手动迁移的用例（jest.mock(path, factory) 工厂 + fake-timer 配置差异），
    //     详见 docs 设计稿的可行性结论；这些文件单独跑会失败，故从绿色门禁中排除。
    include: ['components/{button,modal,table}/__tests__/**/*.test.{ts,tsx}'],
    exclude: [
      '**/node_modules/**',
      // (A) 非本 POC 环境
      '**/image.test.*',
      '**/node.test.*',
      '**/demo-semantic.test.*',
      '**/a11y.test.*',
      '**/type.test.*',
      // (B) 已知需手动迁移（见可行性结论：jest.mock 工厂 / fakeTimers 差异）
      'components/modal/__tests__/confirm.test.tsx',
      'components/button/__tests__/wave.test.tsx',
      'components/button/__tests__/index.test.tsx',
      'components/button/__tests__/delay-timer.test.tsx',
      'components/table/__tests__/Table.test.tsx',
      'components/table/__tests__/Table.filter.test.tsx',
      'components/table/__tests__/Table.rowSelection.test.tsx',
      'components/table/__tests__/Table.pagination.test.tsx',
      'components/table/__tests__/Table.sorter.test.tsx',
      'components/table/__tests__/Table.IE.test.tsx',
      'components/table/__tests__/semantic.test.tsx',
    ],
    environmentOptions: {
      jsdom: { url: 'http://localhost' },
    },
    // 与 jest maxWorkers:'50%' 对齐，保证性能对比公平
    pool: 'threads',
    server: {
      deps: {
        // 这些依赖内部 import 'antd'，需经 Vite 处理才能命中 alias；
        // 同时强制内联 ESM 依赖（对标 jest transformIgnorePatterns）。
        inline: [/@rc-component/, /rc-/, /@ant-design/, /antd-style/, /@emotion/],
      },
    },
  },
});
