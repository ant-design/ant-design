require('./style/index.less');

var antd = {
  Datepicker: require('./components/datepicker'),
  Tooltip: require('./components/tooltip'),
  Tab: require('./components/tab'),
  modal: require('./components/modal'),
  Menu: require('rc-menu'),
  Dropdown: require('./components/dropdown'),
  Progress: require('./components/progress')
};

module.exports = window.antd = antd;
