'use strict';

var React = require('react');
var Tooltip = require('rc-tooltip');

module.exports = React.createClass({
  getDefaultProps() {
    return {
      placement: 'top'
    };
  },
  render() {
    var transitionName = ({
      top: 'zoom-down',
      bottom: 'zoom-up',
      left: 'zoom-right',
      right: 'zoom-left'
    })[this.props.placement];
    return (
      <Tooltip placement={this.props.placement}
        prefixCls="ant-tooltip"
        trigger={this.props.trigger}
        transitionName={transitionName}
        overlay={this.props.title}>
        {this.props.children}
      </Tooltip>
    );
  }
});
