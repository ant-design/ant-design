import React from 'react';

export default React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-alert'
    };
  },
  getInitialState() {
    return {
      display: 'block'
    };
  },
  handleClose(e) {
    if (this.props.onClose) {
      this.props.onClose.call(this, e);
    }
    this.setState({
      display: 'none'
    });
  },
  render () {
    var iconClass = this.props.description ?
      'ant-alert-with-description-icon anticon-' : 'ant-alert-icon anticon-';
    switch (this.props.type) {
      case 'success':
        iconClass += 'check-circle';
        break;
      case 'warn':
        iconClass += 'question-circle';
        break;
      case 'info':
        iconClass += 'info-circle';
        break;
      case 'error':
        iconClass += 'exclamation-circle';
        break;
      default:
        iconClass += 'default';
    }
    if (this.props.description) {
      let close = this.props.closable ?
        <a onClick={this.handleClose} className={'ant-alert-with-description-close-icon'}><span
          className='ant-alert-with-description-close-icon-x'></span></a> : '';
      return (
        <div style={{display: this.state.display}}
             className={'ant-alert-with-description ant-alert-with-description-' + this.props.type}>
          <i className={'anticon ' + iconClass}></i>
          <p className={'ant-alert-with-description-message'}>{this.props.message}</p>
          <span className={'ant-alert-with-description-description'}>{this.props.description}</span>
          {close}
        </div>
      );
    } else {
      if (this.props.closeText) {
        return (
          <div style={{display: this.state.display}} className={'ant-alert ant-alert-' + this.props.type}>
            <i className={'anticon ' + iconClass}></i>
            <span className={'ant-alert-description'}>{this.props.message}</span>
            <span onClick={this.handleClose} className={'ant-alert-close-text'}>{this.props.closeText}</span>
          </div>
        );
      } else {
        let close = this.props.closable ?
          <a onClick={this.handleClose} className={'ant-alert-close-icon'}>
            <span className='ant-alert-close-icon-x'></span>
          </a> : '';
        return (
          <div style={{display: this.state.display}} className={'ant-alert ant-alert-' + this.props.type}>
            <i className={'anticon ' + iconClass}></i>
            <span className={'ant-alert-description'}>{this.props.message}</span>
            {close}
          </div>
        );
      }
    }
  }
});
