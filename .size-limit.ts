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
  Affix: '31 KiB',
  Alert: '38 KiB',
  Anchor: '35 KiB',
  App: '82 KiB',
  AutoComplete: '82 KiB',
  Avatar: '53 KiB',
  BackTop: '35 KiB',
  Badge: '36 KiB',
  BorderBeam: '30 KiB',
  Breadcrumb: '79 KiB',
  Button: '43 KiB',
  Calendar: '125 KiB',
  Card: '71 KiB',
  Carousel: '42 KiB',
  Cascader: '92 KiB',
  Checkbox: '37 KiB',
  Col: '29 KiB',
  Collapse: '39 KiB',
  ColorPicker: '130 KiB',
  ConfigProvider: '43 KiB',
  DatePicker: '103 KiB',
  Descriptions: '32 KiB',
  Divider: '30 KiB',
  Drawer: '47 KiB',
  Dropdown: '87 KiB',
  Empty: '32 KiB',
  Flex: '28 KiB',
  FloatButton: '69 KiB',
  Form: '80 KiB',
  Grid: '22 KiB',
  Image: '49 KiB',
  Input: '63 KiB',
  InputNumber: '63 KiB',
  Layout: '33 KiB',
  List: '99 KiB',
  Listy: '41 KiB',
  Masonry: '36 KiB',
  Mentions: '77 KiB',
  Menu: '68 KiB',
  message: '59 KiB',
  Modal: '74 KiB',
  notification: '60 KiB',
  Pagination: '92 KiB',
  Popconfirm: '64 KiB',
  Popover: '50 KiB',
  Progress: '57 KiB',
  QRCode: '55 KiB',
  Radio: '38 KiB',
  Rate: '54 KiB',
  Result: '41 KiB',
  Row: '29 KiB',
  Segmented: '52 KiB',
  Select: '81 KiB',
  Skeleton: '31 KiB',
  Slider: '59 KiB',
  Space: '31 KiB',
  Spin: '31 KiB',
  Splitter: '40 KiB',
  Statistic: '33 KiB',
  Steps: '62 KiB',
  Switch: '39 KiB',
  Table: '183 KiB',
  Tabs: '65 KiB',
  Tag: '43 KiB',
  theme: '22 KiB',
  TimePicker: '103 KiB',
  Timeline: '64 KiB',
  Tooltip: '49 KiB',
  Tour: '67 KiB',
  Transfer: '136 KiB',
  Tree: '58 KiB',
  TreeSelect: '101 KiB',
  Typography: '71 KiB',
  Upload: '78 KiB',
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
    limit: '450 KiB',
    gzip: true,
    disablePlugins: ['@size-limit/esbuild'],
  },
  {
    path: './dist/antd-with-locales.min.js',
    limit: '542 KiB',
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
