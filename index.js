require('rc-style/index.less');

var antd = {
  datepicker: require('./components/datepicker'),
  tooltip: require('./components/tooltip'),
  modal: require('./components/modal')
};

module.exports = antd;
window.antd = antd;
