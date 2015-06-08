require('ant-style/index.less');

var antd = {
  datepicker: require('./components/datepicker'),
  tooltip: require('./components/tooltip'),
  tab: require('./components/tab'),
  modal: require('./components/modal'),
  Menu:require('./components/menu'),
  Dropdown:require('./components/dropdown')
};

module.exports = window.antd = antd;
