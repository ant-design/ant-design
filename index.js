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
  Table: require('./components/table'),
  Switch: require('./components/switch'),
  Collapse: require('./components/Collapse'),
  message: require('./components/message'),
  Slider: require('./components/slider')
};

module.exports = antd;

if (typeof window !== undefined) {
  window.antd = antd;
}
