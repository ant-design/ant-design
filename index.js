require('./style/index.less');

var antd = {
  Datepicker: require('./components/datepicker'),
  Tooltip: require('./components/tooltip'),
  Tabs: require('./components/tabs'),
  Modal: require('./components/modal'),
  Menu: require('rc-menu'),
  Dropdown: require('./components/dropdown'),
  Progress: require('./components/progress'),
  Popover: require('./components/popover'),
  Select: require('./components/select'),
  Breadcrumb: require('./components/breadcrumb'),
  Popconfirm: require('./components/popconfirm'),
  Pagination: require('./components/pagination'),
  confirm: require('./components/modal/confirm'),
  Steps: require('./components/steps'),
  InputNumber: require('./components/input-number'),
  Switch: require('./components/switch'),
  Checkbox: require('./components/checkbox'),
  Table: require('./components/table'),
  Collapse: require('./components/collapse'),
  message: require('./components/message'),
  Slider: require('./components/slider'),
  Radio: require('./components/radio'),
  RadioGroup: require('./components/radio/group'),
  Alert: require('./components/alert')
};

module.exports = antd;

antd.version = require('./package.json').version;

if (typeof window !== undefined) {
  window.antd = antd;
}
