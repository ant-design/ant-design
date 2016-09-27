// Test dist files
import React from 'react';
import fs from 'fs';
import path from 'path';

describe('antd dist files', function() {
  const distFilesExisted = fs.existsSync(path.join(process.cwd(), 'dist', 'antd.js'));
  if (!distFilesExisted) {
    it('empty test case placeholder', () => {});
    return;
  }

  // fixed jsdom miss
  if (typeof window !== 'undefined') {
    const matchMediaPolyfill = function matchMediaPolyfill() {
      return {
        matches: false,
        addListener() {
        },
        removeListener() {
        },
      };
    };
    window.matchMedia = window.matchMedia || matchMediaPolyfill;
  }

  const antd = require('../dist/antd');

  // https://github.com/ant-design/ant-design/issues/1638
  // https://github.com/ant-design/ant-design/issues/1968
  it('should has modules in antd', () => {
    expect('Affix' in antd).toBeTruthy();
    expect('Alert' in antd).toBeTruthy();
    expect('AutoComplete' in antd).toBeTruthy();
    expect('BackTop' in antd).toBeTruthy();
    expect('Badge' in antd).toBeTruthy();
    expect('Breadcrumb' in antd).toBeTruthy();
    expect('Button' in antd).toBeTruthy();
    expect('Calendar' in antd).toBeTruthy();
    expect('Card' in antd).toBeTruthy();
    expect('Carousel' in antd).toBeTruthy();
    expect('Cascader' in antd).toBeTruthy();
    expect('Checkbox' in antd).toBeTruthy();
    expect('Col' in antd).toBeTruthy();
    expect('Collapse' in antd).toBeTruthy();
    expect('DatePicker' in antd).toBeTruthy();
    expect('Dropdown' in antd).toBeTruthy();
    expect('Form' in antd).toBeTruthy();
    expect('Icon' in antd).toBeTruthy();
    expect('Input' in antd).toBeTruthy();
    expect('InputNumber' in antd).toBeTruthy();
    expect('LocaleProvider' in antd).toBeTruthy();
    expect('Menu' in antd).toBeTruthy();
    expect('message' in antd).toBeTruthy();
    expect('Modal' in antd).toBeTruthy();
    expect('Mention' in antd).toBeTruthy();
    expect('notification' in antd).toBeTruthy();
    expect('Pagination' in antd).toBeTruthy();
    expect('Popconfirm' in antd).toBeTruthy();
    expect('Popover' in antd).toBeTruthy();
    expect('Progress' in antd).toBeTruthy();
    expect('Radio' in antd).toBeTruthy();
    expect('Rate' in antd).toBeTruthy();
    expect('Row' in antd).toBeTruthy();
    expect('Select' in antd).toBeTruthy();
    expect('Slider' in antd).toBeTruthy();
    expect('Spin' in antd).toBeTruthy();
    expect('Steps' in antd).toBeTruthy();
    expect('Switch' in antd).toBeTruthy();
    expect('Table' in antd).toBeTruthy();
    expect('Tabs' in antd).toBeTruthy();
    expect('Tag' in antd).toBeTruthy();
    expect('TimePicker' in antd).toBeTruthy();
    expect('Timeline' in antd).toBeTruthy();
    expect('Tooltip' in antd).toBeTruthy();
    expect('Transfer' in antd).toBeTruthy();
    expect('Tree' in antd).toBeTruthy();
    expect('TreeSelect' in antd).toBeTruthy();
    expect('Upload' in antd).toBeTruthy();
  });

  // https://github.com/ant-design/ant-design/issues/1970
  // https://github.com/ant-design/ant-design/issues/1804
  it('should be compatible in IE8', () => {
    const antdJsContent = fs.readFileSync(path.join(process.cwd(), 'dist', 'antd.js'));
    expect(
      antdJsContent.toString()
       .indexOf('function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }')
    ).toBe(-1);
  })
});
