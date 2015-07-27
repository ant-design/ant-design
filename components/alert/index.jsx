import React from 'react';

export default React.createClass({
  getDefaultProps() {
    return {prefixCls: 'ant-alert'};
  },
  getInitialState () {
    return {display: 'block'};
  },
  handleClose () {
    if (this.props.callback) {
      this.props.callback();
    }
    this.setState({
      display: 'none'
    });
  },
  render () {
    var iconClass = this.props.title ? 'ant-alert-with-title-icon anticon-' : 'ant-alert-icon anticon-';
    switch (this.props.alertType) {
      case 'success':
        iconClass += 'check-circle';
        break;
      case 'info':
        iconClass += 'question-circle';
        break;
      case 'error':
      case 'warn':
        iconClass += 'info-circle';
        break;
      default:
        iconClass += 'default';
    }
    if (this.props.title) {
      return (
        <div style={{display: this.state.display}} className={'ant-alert-with-title ant-alert-with-title-' + this.props.alertType}>
          <i className={'anticon ' + iconClass}></i>
          <p className={'ant-alert-with-title-title'}>{this.props.title}</p>
          <span className={'ant-alert-with-title-message'}>{this.props.message}</span>
          <i onClick={this.handleClose} className={'anticon anticon-cross ant-alert-with-title-close-icon'}></i>
        </div>
      );
    } else {
      if (this.props.alertClose === 'text') {
        return (
          <div style={{display: this.state.display}} className={'ant-alert ant-alert-' + this.props.alertType}>
            <i className={'anticon ' + iconClass}></i>
            <span className={'ant-alert-message'}>{this.props.message}</span>
            <a onClick={this.handleClose} className={'ant-alert-close-text'}>不再提醒</a>
          </div>
        );
      } else {
        return (
          <div style={{display: this.state.display}} className={'ant-alert ant-alert-' + this.props.alertType}>
            <i className={'anticon ' + iconClass}></i>
            <span className={'ant-alert-message'}>{this.props.message}</span>
            <i onClick={this.handleClose} className={'anticon anticon-cross ant-alert-close-icon'}></i>
          </div>
        );
      }
    }
  }
});
