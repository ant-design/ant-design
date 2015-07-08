var Switch = require('rc-switch');
var React = require('react');

var AntSwitch = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-switch'
    };
  },
  render() {
    return <Switch {...this.props}/>;
  }
});

module.exports = AntSwitch;
