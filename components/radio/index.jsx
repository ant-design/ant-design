var Radio = require('rc-radio');
var React = require('react');

var AntRadio = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-radio'
    };
  },
  render() {
    return (
      <label>
        <Radio {...this.props} children={null} />
        {this.props.children}
      </label>
    );
  }
});

module.exports = AntRadio;
