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
  Alert: '37 KiB',
  Anchor: '35 KiB',
  App: '82 KiB',
  AutoComplete: '81 KiB',
  Avatar: '52 KiB',
  BackTop: '35 KiB',
  Badge: '35 KiB',
  BorderBeam: '30 KiB',
  Breadcrumb: '78 KiB',
  Button: '42 KiB',
  Calendar: '125 KiB',
  Card: '71 KiB',
  Carousel: '41 KiB',
  Cascader: '92 KiB',
  Checkbox: '36 KiB',
  Col: '28 KiB',
  Collapse: '39 KiB',
  ColorPicker: '129 KiB',
  ConfigProvider: '42 KiB',
  DatePicker: '102 KiB',
  Descriptions: '31 KiB',
  Divider: '29 KiB',
  Drawer: '47 KiB',
  Dropdown: '86 KiB',
  Empty: '31 KiB',
  Flex: '28 KiB',
  FloatButton: '69 KiB',
  Form: '79 KiB',
  Grid: '21 KiB',
  Image: '49 KiB',
  Input: '63 KiB',
  InputNumber: '62 KiB',
  Layout: '32 KiB',
  List: '99 KiB',
  Listy: '40 KiB',
  Masonry: '35 KiB',
  Mentions: '76 KiB',
  Menu: '67 KiB',
  message: '59 KiB',
  Modal: '73 KiB',
  notification: '59 KiB',
  Pagination: '92 KiB',
  Popconfirm: '63 KiB',
  Popover: '50 KiB',
  Progress: '56 KiB',
  QRCode: '54 KiB',
  Radio: '37 KiB',
  Rate: '54 KiB',
  Result: '40 KiB',
  Row: '29 KiB',
  Segmented: '51 KiB',
  Select: '81 KiB',
  Skeleton: '30 KiB',
  Slider: '58 KiB',
  Space: '30 KiB',
  Spin: '30 KiB',
  Splitter: '39 KiB',
  Statistic: '32 KiB',
  Steps: '61 KiB',
  Switch: '39 KiB',
  Table: '183 KiB',
  Tabs: '65 KiB',
  Tag: '42 KiB',
  theme: '21 KiB',
  TimePicker: '103 KiB',
  Timeline: '63 KiB',
  Tooltip: '48 KiB',
  Tour: '66 KiB',
  Transfer: '136 KiB',
  Tree: '58 KiB',
  TreeSelect: '100 KiB',
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
    limit: '543 KiB',
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
