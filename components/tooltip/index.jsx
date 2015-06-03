var React = require('react');
var Tooltip = require('rc-tooltip');
require('rc-tooltip/assets/bootstrap.css');

module.exports = React.createClass({
  getInitialState: function () {
    var state = {};
    state.placement = this.props.placement;
    state.title = this.props.title;
    return state;
  },
  getDefaultProps: function () {
    return {
      placement: 'top'
    };
  },
  render: function() {
    return  (
      <Tooltip placement={this.state.placement}
        trigger="hover"
        overlay={this.state.title}>
        {this.props.children}
      </Tooltip>
    );
  }
});
