import React from 'react';

require('./style/index.less');

const antd = {
  Affix: require('./components/affix'),
  Datepicker: require('./components/datepicker'),
  Tooltip: require('./components/tooltip'),
  Carousel: require('./components/carousel'),
  Tabs: require('./components/tabs'),
  Modal: require('./components/modal'),
  Dropdown: require('./components/dropdown'),
  Progress: require('./components/progress'),
  Popover: require('./components/popover'),
  Select: require('./components/select'),
  Breadcrumb: require('./components/breadcrumb'),
  Popconfirm: require('./components/popconfirm'),
  Pagination: require('./components/pagination'),
  Steps: require('./components/steps'),
  InputNumber: require('./components/input-number'),
  Switch: require('./components/switch'),
  Checkbox: require('./components/checkbox'),
  Table: require('./components/table'),
  Tag: require('./components/tag'),
  Collapse: require('./components/collapse'),
  message: require('./components/message'),
  Slider: require('./components/slider'),
  QueueAnim: require('./components/queue-anim'),
  Radio: require('./components/radio'),
  notification: require('./components/notification'),
  Alert: require('./components/alert'),
  Validation: require('./components/validation'),
  Tree: require('./components/tree'),
  Upload: require('./components/upload'),
  Badge: require('./components/badge'),
  Menu: require('./components/menu'),
  Timeline: require('./components/timeline'),
  Button: require('./components/button'),
  Icon: require('./components/icon'),
  Row: require('./components/row'),
  Col: require('./components/col'),
  Spin: require('./components/spin'),
  Form: require('./components/form'),
  Input: require('./components/input'),
  Calendar: require('./components/calendar'),
  Timepicker: require('./components/timepicker'),
};

antd.version = require('./package.json').version;

if (process.env.NODE_ENV !== 'production') {
  const warning = require('warning');
  const semver = require('semver');
  const reactVersionInDeps = require('./package.json').devDependencies.react;
  warning(semver.satisfies(React.version, reactVersionInDeps) || semver.gtr(React.version, reactVersionInDeps),
    `antd@${antd.version} need react@${reactVersionInDeps} or higher, which is react@${React.version} now.`);
}

module.exports = antd;
