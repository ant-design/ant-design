require('./style/index.less');

var antd = {
  Datepicker: require('./components/datepicker'),
  Tooltip: require('./components/tooltip'),
  Tab: require('./components/tabs'),
  Modal: require('./components/modal'),
  Menu: require('rc-menu'),
  Dropdown: require('./components/dropdown'),
  Progress: require('./components/progress'),
  Select: require('./components/select'),
  confirm: require('./components/modal/confirm')
};

module.exports = window.antd = antd;
