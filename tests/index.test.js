// Test dist files
import React from 'react';
import fs from 'fs';
import path from 'path';
import test from 'ava';

(function() {
  const distFilesExisted = fs.existsSync(path.join(process.cwd(), '..', 'dist', 'antd.js'));
  if (!distFilesExisted) {
    test(t => t.pass());
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
  test('should has modules in antd', (t) => {
    t.true('Affix' in antd);
    t.true('Alert' in antd);
    t.true('Badge' in antd);
    t.true('Breadcrumb' in antd);
    t.true('Button' in antd);
    t.true('Calendar' in antd);
    t.true('Card' in antd);
    t.true('Carousel' in antd);
    t.true('Cascader' in antd);
    t.true('Checkbox' in antd);
    t.true('Col' in antd);
    t.true('Collapse' in antd);
    t.true('DatePicker' in antd);
    t.true('Dropdown' in antd);
    t.true('Form' in antd);
    t.true('Icon' in antd);
    t.true('Input' in antd);
    t.true('InputNumber' in antd);
    t.true('LocaleProvider' in antd);
    t.true('Menu' in antd);
    t.true('message' in antd);
    t.true('Modal' in antd);
    t.true('notification' in antd);
    t.true('Pagination' in antd);
    t.true('Popconfirm' in antd);
    t.true('Popover' in antd);
    t.true('Progress' in antd);
    t.true('QueueAnim' in antd);
    t.true('Radio' in antd);
    t.true('Rate' in antd);
    t.true('Row' in antd);
    t.true('Select' in antd);
    t.true('Slider' in antd);
    t.true('Spin' in antd);
    t.true('Steps' in antd);
    t.true('Switch' in antd);
    t.true('Table' in antd);
    t.true('Tabs' in antd);
    t.true('Tag' in antd);
    t.true('TimePicker' in antd);
    t.true('Timeline' in antd);
    t.true('Tooltip' in antd);
    t.true('Transfer' in antd);
    t.true('Tree' in antd);
    t.true('TreeSelect' in antd);
    t.true('Upload' in antd);
    t.true('Validation' in antd);
  });

  // https://github.com/ant-design/ant-design/issues/1970
  // https://github.com/ant-design/ant-design/issues/1804
  test('should be compatible in IE8', (t) => {
    const antdJsContent = fs.readFileSync(path.join(process.cwd(), '..', 'dist', 'antd.js'));
    t.is(
      antdJsContent.toString()
       .indexOf('function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }'),
      -1
    );
  })
})();
