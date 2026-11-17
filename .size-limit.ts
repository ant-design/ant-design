import fs from 'node:fs';
import path from 'node:path';
import type { SizeLimitConfig } from 'size-limit';
import ts from 'typescript';

const componentLimits: Record<string, number> = {
  Affix: 31,
  Alert: 53,
  Anchor: 53,
  App: 82,
  AutoComplete: 82,
  Avatar: 58,
  BackTop: 50,
  Badge: 51,
  BorderBeam: 31,
  Breadcrumb: 79,
  Button: 58,
  Calendar: 126,
  Card: 77,
  Carousel: 42,
  Cascader: 93,
  Checkbox: 52,
  Col: 48,
  Collapse: 54,
  ColorPicker: 130,
  ConfigProvider: 43,
  DatePicker: 104,
  Descriptions: 32,
  Divider: 49,
  Drawer: 59,
  Dropdown: 87,
  Empty: 32,
  Flex: 48,
  FloatButton: 74,
  Form: 83,
  Grid: 22,
  Image: 50,
  Input: 75,
  InputNumber: 63,
  Layout: 52,
  List: 100,
  Listy: 41,
  Masonry: 36,
  Mentions: 77,
  Menu: 72,
  message: 60,
  Modal: 74,
  notification: 60,
  Pagination: 93,
  Popconfirm: 67,
  Popover: 55,
  Progress: 62,
  QRCode: 68,
  Radio: 53,
  Rate: 59,
  Result: 41,
  Row: 49,
  Segmented: 57,
  Select: 82,
  Skeleton: 50,
  Slider: 64,
  Space: 50,
  Spin: 31,
  Splitter: 40,
  Statistic: 52,
  Steps: 67,
  Switch: 54,
  Table: 184,
  Tabs: 72,
  Tag: 56,
  theme: 22,
  TimePicker: 104,
  Timeline: 69,
  Tooltip: 54,
  Tour: 67,
  Transfer: 137,
  Tree: 72,
  TreeSelect: 101,
  Typography: 74,
  Upload: 82,
  version: 2,
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
