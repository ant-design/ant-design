import fs from 'node:fs';
import path from 'node:path';
import type { SizeLimitConfig } from 'size-limit';
import ts from 'typescript';

/**
 * 从 `es/index.js` 单独导入组件后的打包体积上限。
 * 将 gzip 实测体积向上取整到整数 KiB。
 * 新增参与体积检查的组件时，需在此设置上限。
 */
const componentLimits: Record<string, string> = {
  Affix: '30 KiB',
  Alert: '65 KiB',
  Anchor: '52 KiB',
  App: '94 KiB',
  AutoComplete: '95 KiB',
  Avatar: '70 KiB',
  BackTop: '49 KiB',
  Badge: '50 KiB',
  BorderBeam: '30 KiB',
  Breadcrumb: '91 KiB',
  Button: '70 KiB',
  Calendar: '138 KiB',
  Card: '90 KiB',
  Carousel: '41 KiB',
  Cascader: '105 KiB',
  Checkbox: '64 KiB',
  Col: '47 KiB',
  Collapse: '53 KiB',
  ColorPicker: '142 KiB',
  ConfigProvider: '42 KiB',
  DatePicker: '116 KiB',
  Descriptions: '31 KiB',
  Divider: '61 KiB',
  Drawer: '71 KiB',
  Dropdown: '100 KiB',
  Empty: '31 KiB',
  Flex: '47 KiB',
  FloatButton: '87 KiB',
  Form: '81 KiB',
  Grid: '21 KiB',
  Image: '49 KiB',
  Input: '88 KiB',
  InputNumber: '75 KiB',
  Layout: '51 KiB',
  List: '112 KiB',
  Listy: '40 KiB',
  Masonry: '35 KiB',
  Mentions: '90 KiB',
  Menu: '85 KiB',
  message: '59 KiB',
  Modal: '86 KiB',
  notification: '59 KiB',
  Pagination: '105 KiB',
  Popconfirm: '79 KiB',
  Popover: '68 KiB',
  Progress: '74 KiB',
  QRCode: '80 KiB',
  Radio: '65 KiB',
  Rate: '72 KiB',
  Result: '40 KiB',
  Row: '48 KiB',
  Segmented: '70 KiB',
  Select: '94 KiB',
  Skeleton: '49 KiB',
  Slider: '76 KiB',
  Space: '49 KiB',
  Spin: '30 KiB',
  Splitter: '39 KiB',
  Statistic: '51 KiB',
  Steps: '79 KiB',
  Switch: '53 KiB',
  Table: '196 KiB',
  Tabs: '71 KiB',
  Tag: '68 KiB',
  theme: '21 KiB',
  TimePicker: '116 KiB',
  Timeline: '81 KiB',
  Tooltip: '66 KiB',
  Tour: '80 KiB',
  Transfer: '150 KiB',
  Tree: '71 KiB',
  TreeSelect: '114 KiB',
  Typography: '87 KiB',
  Upload: '94 KiB',
  // version: '1 KiB',
  Watermark: '24 KiB',
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
