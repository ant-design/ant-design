'use strict';

var React = require('react');
var Dropdown = require('rc-dropdown');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      animation: 'slide-up'
    };
  },
  render: function() {
    return (
      <Dropdown {...this.props} />
    );
  }
});
