import fs from 'node:fs';
import path from 'node:path';
import type { SizeLimitConfig } from 'size-limit';
import ts from 'typescript';

/**
 * 从 `es/index.js` 单独导入组件后的打包体积上限。
 * 在 gzip 实测体积基础上预留 1 KiB，再向上取整到整数 KiB。
 * 新增参与体积检查的组件时，需在此设置上限。
 */
const componentLimits: Record<string, string> = {
  Affix: '31 KiB',
  Alert: '66 KiB',
  Anchor: '53 KiB',
  App: '95 KiB',
  AutoComplete: '96 KiB',
  Avatar: '71 KiB',
  BackTop: '50 KiB',
  Badge: '51 KiB',
  BorderBeam: '31 KiB',
  Breadcrumb: '92 KiB',
  Button: '71 KiB',
  Calendar: '139 KiB',
  Card: '91 KiB',
  Carousel: '42 KiB',
  Cascader: '106 KiB',
  Checkbox: '65 KiB',
  Col: '48 KiB',
  Collapse: '54 KiB',
  ColorPicker: '143 KiB',
  ConfigProvider: '43 KiB',
  DatePicker: '117 KiB',
  Descriptions: '32 KiB',
  Divider: '62 KiB',
  Drawer: '72 KiB',
  Dropdown: '101 KiB',
  Empty: '32 KiB',
  Flex: '48 KiB',
  FloatButton: '88 KiB',
  Form: '82 KiB',
  Grid: '22 KiB',
  Image: '50 KiB',
  Input: '89 KiB',
  InputNumber: '76 KiB',
  Layout: '52 KiB',
  List: '113 KiB',
  Listy: '41 KiB',
  Masonry: '36 KiB',
  Mentions: '91 KiB',
  Menu: '86 KiB',
  message: '60 KiB',
  Modal: '87 KiB',
  notification: '60 KiB',
  Pagination: '106 KiB',
  Popconfirm: '80 KiB',
  Popover: '69 KiB',
  Progress: '75 KiB',
  QRCode: '81 KiB',
  Radio: '66 KiB',
  Rate: '73 KiB',
  Result: '41 KiB',
  Row: '49 KiB',
  Segmented: '71 KiB',
  Select: '95 KiB',
  Skeleton: '50 KiB',
  Slider: '77 KiB',
  Space: '50 KiB',
  Spin: '31 KiB',
  Splitter: '40 KiB',
  Statistic: '52 KiB',
  Steps: '80 KiB',
  Switch: '54 KiB',
  Table: '197 KiB',
  Tabs: '72 KiB',
  Tag: '69 KiB',
  theme: '22 KiB',
  TimePicker: '117 KiB',
  Timeline: '82 KiB',
  Tooltip: '67 KiB',
  Tour: '81 KiB',
  Transfer: '151 KiB',
  Tree: '72 KiB',
  TreeSelect: '115 KiB',
  Typography: '88 KiB',
  Upload: '95 KiB',
  // version: '1 KiB',
  Watermark: '25 KiB',
};

const source = ts.createSourceFile(
  'components/index.ts',
  fs.readFileSync(path.join(import.meta.dirname, 'components/index.ts'), 'utf8'),
  ts.ScriptTarget.Latest,
);

const componentNames = source.statements.flatMap((node) => {
  if (
    !ts.isExportDeclaration(node) ||
    node.isTypeOnly ||
    !node.exportClause ||
    !ts.isNamedExports(node.exportClause)
  ) {
    return [];
  }
  return node.exportClause.elements
    .filter((element) => {
      return (
        !element.isTypeOnly &&
        element.propertyName?.text === 'default' &&
        // version 是 Antd 版本号，不是 React 组件，不参与体积检查
        element.name.text !== 'version'
      );
    })
    .map<string>((element) => element.name.text);
});

const sizeLimitConfig: SizeLimitConfig = [
  {
    path: './dist/antd.min.js',
    limit: '449 KiB',
    gzip: true,
    disablePlugins: ['@size-limit/esbuild'],
  },
  {
    path: './dist/antd-with-locales.min.js',
    limit: '541 KiB',
    gzip: true,
    disablePlugins: ['@size-limit/esbuild'],
  },
  ...componentNames.map((component) => {
    if (!componentLimits[component]) {
      throw new Error(`Add a size budget for ${component} to .size-limit.ts.`);
    }
    return {
      name: component,
      path: './es/index.js',
      import: `{ ${component} }`,
      limit: componentLimits[component],
      gzip: true,
    };
  }),
];

export default sizeLimitConfig;
