var Checkbox = require('rc-checkbox');
var React = require('react');

var AntCheckbox = React.createClass({
    getDefaultProps() {
      return {
            prefixCls: 'ant-checkbox'
        };
    },
    render() {
      return <Checkbox {...this.props}/>;
    }
});

module.exports = AntCheckbox;
