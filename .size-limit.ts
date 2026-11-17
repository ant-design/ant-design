import fs from 'node:fs';
import path from 'node:path';
import type { SizeLimitConfig } from 'size-limit';
import ts from 'typescript';

const componentLimits: Record<string, number> = {
  Affix: 31,
  Alert: 38,
  Anchor: 36,
  App: 82,
  AutoComplete: 82,
  Avatar: 53,
  BackTop: 36,
  Badge: 36,
  BorderBeam: 31,
  Breadcrumb: 79,
  Button: 43,
  Calendar: 126,
  Card: 72,
  Carousel: 42,
  Cascader: 93,
  Checkbox: 37,
  Col: 29,
  Collapse: 40,
  ColorPicker: 129,
  ConfigProvider: 43,
  DatePicker: 103,
  Descriptions: 32,
  Divider: 30,
  Drawer: 48,
  Dropdown: 87,
  Empty: 32,
  Flex: 29,
  FloatButton: 69,
  Form: 80,
  Grid: 22,
  Image: 50,
  Input: 64,
  InputNumber: 63,
  Layout: 33,
  List: 100,
  Listy: 41,
  Masonry: 36,
  Mentions: 77,
  Menu: 68,
  message: 60,
  Modal: 74,
  notification: 60,
  Pagination: 93,
  Popconfirm: 64,
  Popover: 51,
  Progress: 57,
  QRCode: 55,
  Radio: 38,
  Rate: 55,
  Result: 41,
  Row: 30,
  Segmented: 52,
  Select: 82,
  Skeleton: 31,
  Slider: 59,
  Space: 31,
  Spin: 31,
  Splitter: 40,
  Statistic: 33,
  Steps: 62,
  Switch: 40,
  Table: 184,
  Tabs: 66,
  Tag: 43,
  theme: 22,
  TimePicker: 104,
  Timeline: 64,
  Tooltip: 49,
  Tour: 67,
  Transfer: 137,
  Tree: 59,
  TreeSelect: 101,
  Typography: 72,
  Upload: 79,
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
