var InputNumber = require('rc-input-number');
var React = require('react');

var AntInputNumber = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-input-number'
    };
  },
  render() {
    return <InputNumber {...this.props}/>;
  }
});

module.exports = AntInputNumber;
