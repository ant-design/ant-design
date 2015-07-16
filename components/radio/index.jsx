var Radio = require('rc-radio');
var React = require('react');

var AntRadio = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-radio'
    };
  },
  render() {
    return <Radio {...this.props} />;
  }
});

module.exports = AntRadio;
