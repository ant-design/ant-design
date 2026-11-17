const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const componentLimits = {
  Affix: 31,
  Alert: 54,
  Anchor: 54,
  App: 85,
  AutoComplete: 85,
  Avatar: 60,
  BackTop: 52,
  Badge: 53,
  BorderBeam: 31,
  Breadcrumb: 82,
  Button: 60,
  Calendar: 131,
  Card: 80,
  Carousel: 43,
  Cascader: 97,
  Checkbox: 53,
  Col: 50,
  Collapse: 56,
  ColorPicker: 135,
  ConfigProvider: 44,
  DatePicker: 108,
  Descriptions: 32,
  Divider: 51,
  Drawer: 61,
  Dropdown: 91,
  Empty: 32,
  Flex: 49,
  FloatButton: 77,
  Form: 86,
  Grid: 22,
  Image: 51,
  Input: 78,
  InputNumber: 65,
  Layout: 54,
  List: 104,
  Listy: 42,
  Masonry: 37,
  Mentions: 80,
  Menu: 75,
  message: 61,
  Modal: 77,
  notification: 62,
  Pagination: 96,
  Popconfirm: 69,
  Popover: 57,
  Progress: 64,
  QRCode: 70,
  Radio: 55,
  Rate: 61,
  Result: 42,
  Row: 50,
  Segmented: 59,
  Select: 85,
  Skeleton: 52,
  Slider: 66,
  Space: 52,
  Spin: 32,
  Splitter: 41,
  Statistic: 54,
  Steps: 69,
  Switch: 56,
  Table: 192,
  Tabs: 74,
  Tag: 58,
  theme: 22,
  TimePicker: 108,
  Timeline: 71,
  Tooltip: 56,
  Tour: 70,
  Transfer: 143,
  Tree: 75,
  TreeSelect: 105,
  Typography: 77,
  Upload: 85,
  version: 2,
  Watermark: 25,
};

const source = ts.createSourceFile(
  'components/index.ts',
  fs.readFileSync(path.join(__dirname, 'components/index.ts'), 'utf8'),
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
    .map((element) => element.name.text);
});

module.exports = [
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
      throw new Error(`Add a size budget for ${component} to .size-limit.cjs.`);
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
