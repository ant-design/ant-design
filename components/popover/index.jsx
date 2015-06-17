'use strict';

var React = require('react');
var Tooltip = require('rc-tooltip');

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      placement: 'top',
      trigger: 'hover'
    };
  },
  render: function() {
    var overlay = <div>
      <div className="popover-title">
        {this.props.title}
      </div>
      <div className="popover-content">
        {this.props.overlay}
      </div>
    </div>;
    return (
      <Tooltip placement={this.props.placement}
        prefixCls="popover"
        renderPopupToBody={false}
        trigger={this.props.trigger}
        overlay={overlay}>
        {this.props.children}
      </Tooltip>
    );
  }
});
