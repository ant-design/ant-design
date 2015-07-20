var InputNumber = require('rc-input-number');
var React = require('react');

var AntInputNumber = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-input-number'
    };
  },
  render() {
    return <InputNumber style={{width: 90}} {...this.props} />;
  }
});

module.exports = AntInputNumber;
