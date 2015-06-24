'use strict';

var React = require('react');

var Step = React.createClass({
  displayName: 'Step',

  getInitialState: function getInitialState() {
    return {
      status: this.props.status ? this.props.status : 'waiting'
    };
  },
  render: function render() {
    console.log('step render');
    var props = this.props;
    return React.createElement(
      'div',
      { className: 'rc-steps-item rc-steps-status-' + this.state.status },
      React.createElement(
        'div',
        { className: 'rc-steps-head' },
        React.createElement('i', { className: 'anticon anticon-check' })
      ),
      React.createElement(
        'div',
        { className: 'rc-steps-main' },
        React.createElement(
          'div',
          { className: 'rc-steps-title' },
          props.title
        ),
        React.createElement(
          'div',
          { className: 'rc-steps-description' },
          props.description
        )
      ),
      !props.stepLast ? React.createElement(
        'div',
        { className: 'rc-steps-tail', style: { width: props.tailWidth } },
        React.createElement('i', null)
      ) : ''
    );
  }
});

module.exports = Step;