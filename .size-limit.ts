import fs from 'node:fs';
import path from 'node:path';
import type { SizeLimitConfig } from 'size-limit';
import ts from 'typescript';

/**
 * 从 `es/index.js` 单独导入组件后的打包体积上限，按 gzip 压缩后的大小计算，单位为 KiB。
 * 新增参与体积检查的组件时，需在此设置上限。
 */
const componentLimits: Record<string, string> = {
  Affix: '31 KiB',
  Alert: '68 KiB',
  Anchor: '54 KiB',
  App: '99 KiB',
  AutoComplete: '99 KiB',
  Avatar: '74 KiB',
  BackTop: '52 KiB',
  Badge: '53 KiB',
  BorderBeam: '31 KiB',
  Breadcrumb: '96 KiB',
  Button: '74 KiB',
  Calendar: '145 KiB',
  Card: '94 KiB',
  Carousel: '43 KiB',
  Cascader: '111 KiB',
  Checkbox: '67 KiB',
  Col: '50 KiB',
  Collapse: '56 KiB',
  ColorPicker: '149 KiB',
  ConfigProvider: '44 KiB',
  DatePicker: '122 KiB',
  Descriptions: '32 KiB',
  Divider: '64 KiB',
  Drawer: '75 KiB',
  Dropdown: '105 KiB',
  Empty: '32 KiB',
  Flex: '49 KiB',
  FloatButton: '91 KiB',
  Form: '86 KiB',
  Grid: '22 KiB',
  Image: '51 KiB',
  Input: '92 KiB',
  InputNumber: '79 KiB',
  Layout: '54 KiB',
  List: '118 KiB',
  Listy: '42 KiB',
  Masonry: '37 KiB',
  Mentions: '94 KiB',
  Menu: '89 KiB',
  message: '61 KiB',
  Modal: '91 KiB',
  notification: '62 KiB',
  Pagination: '110 KiB',
  Popconfirm: '83 KiB',
  Popover: '71 KiB',
  Progress: '78 KiB',
  QRCode: '84 KiB',
  Radio: '69 KiB',
  Rate: '75 KiB',
  Result: '42 KiB',
  Row: '50 KiB',
  Segmented: '73 KiB',
  Select: '99 KiB',
  Skeleton: '52 KiB',
  Slider: '80 KiB',
  Space: '52 KiB',
  Spin: '32 KiB',
  Splitter: '41 KiB',
  Statistic: '54 KiB',
  Steps: '83 KiB',
  Switch: '56 KiB',
  Table: '206 KiB',
  Tabs: '74 KiB',
  Tag: '72 KiB',
  theme: '22 KiB',
  TimePicker: '122 KiB',
  Timeline: '85 KiB',
  Tooltip: '70 KiB',
  Tour: '84 KiB',
  Transfer: '157 KiB',
  Tree: '75 KiB',
  TreeSelect: '119 KiB',
  Typography: '91 KiB',
  Upload: '99 KiB',
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
