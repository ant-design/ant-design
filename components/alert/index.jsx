'use strict';

var React = require('react');

var Alert = React.createClass({
  render: function () {
    var iconClass = '';
    switch (this.props.alertStyle) {
      case 'success':
        iconClass += 'check-circle';
        break;
      case 'info':
        iconClass += 'info-circle';
        break;
      case 'error':
        iconClass += 'cross-circle';
        break;
      case 'warn':
        iconClass += 'info-circle';
        break;
      default:
        iconClass += 'default';
    }
    return (
        <div className={'ant-alert ant-alert-' + this.props.alertStyle}>
          <i className={'anticon anticon-' + iconClass}></i>
          {this.props.message}
        </div>
    );

  }
});

module.exports = Alert;
