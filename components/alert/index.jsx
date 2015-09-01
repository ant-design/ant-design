import React from 'react';
import Animate from 'rc-animate';

export default React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-alert'
    };
  },
  getInitialState() {
    return {
      closing: true,
      closed: false
    };
  },
  handleClose(e) {
    let dom = React.findDOMNode(this);
    dom.style.height = dom.offsetHeight + 'px';
    // Magic code
    // 重复一次后才能正确设置 height
    dom.style.height = dom.offsetHeight + 'px';

    this.setState({
      closing: false
    });
    if (this.props.onClose) {
      this.props.onClose.call(this, e);
    }
  },
  animationEnd() {
    this.setState({
      closed: true,
      closing: true
    });
  },
  render() {
    let iconClass = this.props.description ?
      'ant-alert-with-description-icon anticon-' : 'ant-alert-icon anticon-';
    switch (this.props.type) {
    case 'success':
      iconClass += 'check-circle';
      break;
    case 'info':
      iconClass += 'info-circle';
      break;
    case 'error':
      iconClass += 'exclamation-circle';
      break;
    case 'warn':
      iconClass += 'question-circle';
      break;
    default:
      iconClass += 'default';
    }
    let html;
    let closeName = !this.state.closing ? ' ' + this.props.prefixCls + '-close' : '';
    if (this.props.description) {
      let close = this.props.closable ?
        <a onClick={this.handleClose} className={'ant-alert-with-description-close-icon'}>
          <span className="ant-alert-with-description-close-icon-x"></span>
        </a> : '';
      html = <div data-show={this.state.closing} className={'ant-alert-with-description ant-alert-with-description-' + this.props.type + closeName}>
        <i className={'anticon ' + iconClass}></i>
        <p className={'ant-alert-with-description-message'}>{this.props.message}</p>
        <span className={'ant-alert-with-description-description'}>{this.props.description}</span>
          {close}
      </div>;
    } else {
      if (this.props.closeText) {
        html = <div data-show={this.state.closing} className={'ant-alert ant-alert-' + this.props.type + closeName}>
          <i className={'anticon ' + iconClass}></i>
          <span className={'ant-alert-description'}>{this.props.message}</span>
          <span onClick={this.handleClose} className={'ant-alert-close-text'}>{this.props.closeText}</span>
        </div>;
      } else {
        let close = this.props.closable ?
          <a onClick={this.handleClose} className={'ant-alert-close-icon'}>
            <span className="ant-alert-close-icon-x"></span>
          </a> : '';
        html = <div data-show={this.state.closing} className={'ant-alert ant-alert-' + this.props.type + closeName}>
          <i className={'anticon ' + iconClass}></i>
          <span className={'ant-alert-description'}>{this.props.message}</span>
          {close}
        </div>;
      }
    }
    return this.state.closed ? null : <Animate
      component=""
      showProp="data-show"
      transitionName="slide-up"
      onEnd={this.animationEnd}>
      {html}
    </Animate>;
  }
});
