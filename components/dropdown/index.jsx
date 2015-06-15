'use strict';

var React = require('react');
var Dropdown = require('rc-dropdown');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      transitionName: 'slide-up',
      prefixCls: 'ant-dropdown'
    };
  },
  render: function() {
    return (
      <Dropdown {...this.props} />
    );
  }
});
