import fs from 'node:fs';
import path from 'node:path';
import type { SizeLimitConfig } from 'size-limit';
import ts from 'typescript';

const componentLimits: Record<string, number> = {
  Affix: 31,
  Alert: 68,
  Anchor: 54,
  App: 99,
  AutoComplete: 99,
  Avatar: 74,
  BackTop: 52,
  Badge: 53,
  BorderBeam: 31,
  Breadcrumb: 96,
  Button: 74,
  Calendar: 145,
  Card: 94,
  Carousel: 43,
  Cascader: 111,
  Checkbox: 67,
  Col: 50,
  Collapse: 56,
  ColorPicker: 149,
  ConfigProvider: 44,
  DatePicker: 122,
  Descriptions: 32,
  Divider: 64,
  Drawer: 75,
  Dropdown: 105,
  Empty: 32,
  Flex: 49,
  FloatButton: 91,
  Form: 86,
  Grid: 22,
  Image: 51,
  Input: 92,
  InputNumber: 79,
  Layout: 54,
  List: 118,
  Listy: 42,
  Masonry: 37,
  Mentions: 94,
  Menu: 89,
  message: 61,
  Modal: 91,
  notification: 62,
  Pagination: 110,
  Popconfirm: 83,
  Popover: 71,
  Progress: 78,
  QRCode: 84,
  Radio: 69,
  Rate: 75,
  Result: 42,
  Row: 50,
  Segmented: 73,
  Select: 99,
  Skeleton: 52,
  Slider: 80,
  Space: 52,
  Spin: 32,
  Splitter: 41,
  Statistic: 54,
  Steps: 83,
  Switch: 56,
  Table: 206,
  Tabs: 74,
  Tag: 72,
  theme: 22,
  TimePicker: 122,
  Timeline: 85,
  Tooltip: 70,
  Tour: 84,
  Transfer: 157,
  Tree: 75,
  TreeSelect: 119,
  Typography: 91,
  Upload: 99,
  version: 1,
  Watermark: 25,
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
    .filter((element) => !element.isTypeOnly && element.propertyName?.text === 'default')
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
      limit: `${componentLimits[component]} KiB`,
      gzip: true,
    };
  }),
];

export default sizeLimitConfig;
