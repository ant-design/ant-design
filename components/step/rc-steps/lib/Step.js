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
    var props = this.props;
    var cls = 'border'; // fill / none
    return React.createElement(
      'li',
      { className: (props.stepColClass ? props.stepColClass : '') + 'rc-steps-item', style: props.stepColStyles },
      React.createElement(
        'span',
        { className: 'rc-steps-icon ' + cls + ' ' + this.state.status },
        React.createElement(
          'span',
          { className: 'num' },
          props.stepIndex
        ),
        React.createElement('i', { icon: props.icon })
      ),
      React.createElement(
        'span',
        { className: 'rc-steps-title' },
        props.title
      ),
      props.description && React.createElement(
        'span',
        { className: 'rc-steps-description' },
        props.description
      )
    );
  }
});

module.exports = Step;