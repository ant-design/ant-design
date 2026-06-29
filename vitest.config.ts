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
    // include 覆盖全组件；exclude 是当前 Vitest 迁移进度的显式 manifest。
    // 维护规则：
    // - 每次从 exclude 移除文件，都要先单跑该文件，再跑 npm run test:vitest。
    // - 只提交当前 collected test files 对应的 __snapshots__/vitest/*.snap。
    // - CI 的覆盖统计使用 vitest list --filesOnly；不要用普通 vitest list 统计文件数。
    //
    // exclude 分四类：
    // (A) 非 jsdom 环境 / 需独立配置的测试类型
    // (B) demo 测试——依赖 jest.requireActual 同步 shim，且 antd-style 的 style-class.tsx
    //     demo 在 Vitest 中因模块状态冲突无法加载（57 个组件受影响）
    // (C) jest.mock() 提升问题——通过垫片间接调用不会被 Vitest 提升
    // (D) 其他兼容性问题（Tooltip popup 时序、requireActual 相对路径等）
    include: ['components/**/__tests__/**/*.test.{ts,tsx}'],
    exclude: [
      '**/node_modules/**',
      // (A) 非 jsdom 环境测试
      '**/image.test.*',
      '**/node.test.*',
      '**/demo-semantic.test.*',
      '**/a11y.test.*',
      '**/type.test.*',
      // (B) demo 测试（jest.requireActual shim + antd-style 模块冲突）
      '**/demo.test.*',
      '**/demo-extend.test.*',
      // (C) jest.mock() 提升 / requireActual 相对路径 / ResizeObserver 兼容性等
      'components/affix/__tests__/Affix.test.tsx',
      'components/__tests__/index.test.ts',
      'components/__tests__/17.test.ts',
      'components/__tests__/node.test.tsx',
      'components/_util/__tests__/useZIndex.test.tsx',
      'components/_util/__tests__/wave.test.tsx',
      'components/_util/__tests__/wave-util.test.tsx',
      'components/anchor/__tests__/Anchor.test.tsx',
      'components/auto-complete/__tests__/index.test.tsx',
      'components/auto-complete/__tests__/semantic.test.tsx',
      'components/avatar/__tests__/Avatar.test.tsx',
      'components/breadcrumb/__tests__/Breadcrumb.test.tsx',
      'components/button/__tests__/delay-timer.test.tsx',
      'components/button/__tests__/index.test.tsx',
      'components/button/__tests__/wave.test.tsx',
      'components/calendar/__tests__/index.test.tsx',
      'components/cascader/__tests__/index.test.tsx',
      'components/cascader/__tests__/semantic.test.tsx',
      'components/collapse/__tests__/index.test.tsx',
      'components/color-picker/__tests__/gradient.test.tsx',
      'components/color-picker/__tests__/index.test.tsx',
      'components/color-picker/__tests__/semantic.test.tsx',
      'components/config-provider/__tests__/components.test.tsx',
      'components/config-provider/__tests__/cssinjs.test.tsx',
      'components/config-provider/__tests__/form.test.tsx',
      'components/config-provider/__tests__/index.test.tsx',
      'components/config-provider/__tests__/locale.test.tsx',
      'components/config-provider/__tests__/motion.test.tsx',
      'components/config-provider/__tests__/nonce.test.tsx',
      'components/config-provider/__tests__/popup.test.tsx',
      'components/config-provider/__tests__/style.test.tsx',
      'components/config-provider/__tests__/wave.test.tsx',
      'components/date-picker/__tests__/DatePicker.test.tsx',
      'components/date-picker/__tests__/RangePicker.test.tsx',
      'components/descriptions/__tests__/index.test.tsx',
      'components/dropdown/__tests__/dropdown-button.test.tsx',
      'components/dropdown/__tests__/index.test.tsx',
      'components/dropdown/__tests__/semantic.test.tsx',
      'components/flex/__tests__/index.test.tsx',
      'components/float-button/__tests__/index.test.tsx',
      'components/form/__tests__/index.test.tsx',
      'components/grid/__tests__/gap.test.tsx',
      'components/grid/__tests__/index.test.tsx',
      'components/grid/__tests__/server.test.tsx',
      'components/input/__tests__/textarea.test.tsx',
      'components/layout/__tests__/index.test.tsx',
      'components/locale/__tests__/config.test.tsx',
      'components/masonry/__tests__/index.test.tsx',
      'components/mentions/__tests__/index.test.tsx',
      'components/menu/__tests__/index.test.tsx',
      'components/message/__tests__/config.test.tsx',
      'components/message/__tests__/hooks.test.tsx',
      'components/message/__tests__/immediately.test.tsx',
      'components/message/__tests__/index.test.tsx',
      'components/message/__tests__/semantic.test.tsx',
      'components/message/__tests__/static-warning.test.tsx',
      'components/message/__tests__/type.test.tsx',
      'components/modal/__tests__/confirm.test.tsx',
      'components/modal/__tests__/hook.test.tsx',
      'components/modal/__tests__/Modal.test.tsx',
      'components/modal/__tests__/static-warning.test.tsx',
      'components/notification/__tests__/config.test.tsx',
      'components/notification/__tests__/index.test.tsx',
      'components/notification/__tests__/placement.test.tsx',
      'components/notification/__tests__/semantic.test.tsx',
      'components/notification/__tests__/static-warning.test.tsx',
      'components/popconfirm/__tests__/index.test.tsx',
      'components/popconfirm/__tests__/semantic.test.tsx',
      'components/popover/__tests__/index.test.tsx',
      'components/popover/__tests__/semantic.test.tsx',
      'components/progress/__tests__/index.test.tsx',
      'components/progress/__tests__/placement.test.tsx',
      'components/segmented/__tests__/index.test.tsx',
      'components/select/__tests__/index.test.tsx',
      'components/select/__tests__/semantic.test.tsx',
      'components/slider/__tests__/index.test.tsx',
      'components/slider/__tests__/SliderTooltip.test.tsx',
      'components/slider/__tests__/tooltip.test.tsx',
      'components/space/__tests__/gap.test.tsx',
      'components/spin/__tests__/delay.test.tsx',
      'components/splitter/__tests__/index.test.tsx',
      'components/splitter/__tests__/lazy.test.tsx',
      'components/switch/__tests__/index.test.tsx',
      'components/switch/__tests__/semantic.test.tsx',
      'components/table/__tests__/semantic.test.tsx',
      'components/table/__tests__/Table.filter.test.tsx',
      'components/table/__tests__/Table.IE.test.tsx',
      'components/table/__tests__/Table.pagination.test.tsx',
      'components/table/__tests__/Table.rowSelection.test.tsx',
      'components/table/__tests__/Table.sorter.test.tsx',
      'components/table/__tests__/Table.test.tsx',
      'components/tabs/__tests__/index.test.tsx',
      'components/tag/__tests__/index.test.tsx',
      'components/time-picker/__tests__/index.test.tsx',
      'components/time-picker/__tests__/semantic.test.tsx',
      'components/tooltip/__tests__/semantic.test.tsx',
      'components/tooltip/__tests__/tooltip.test.tsx',
      'components/tour/__tests__/index.test.tsx',
      'components/transfer/__tests__/dropdown.test.tsx',
      'components/transfer/__tests__/index.test.tsx',
      'components/tree/__tests__/directory.test.tsx',
      'components/tree-select/__tests__/index.test.tsx',
      'components/typography/__tests__/copy.test.tsx',
      'components/typography/__tests__/editable.test.tsx',
      'components/typography/__tests__/ellipsis.test.tsx',
      'components/typography/__tests__/index.test.tsx',
      'components/upload/__tests__/upload.test.tsx',
      'components/upload/__tests__/uploadlist.test.tsx',
      'components/watermark/__tests__/index.test.tsx',
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
