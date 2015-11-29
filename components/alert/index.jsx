import React from 'react';
import ReactDOM from 'react-dom';
import Animate from 'rc-animate';
import Icon from '../icon';
import classNames from 'classnames';

export default React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-alert',
      showIcon: false,
      closeText: <Icon type="cross" />,
      onClose() {}
    };
  },
  getInitialState() {
    return {
      closing: true,
      closed: false
    };
  },
  handleClose(e) {
    e.preventDefault();
    let dom = ReactDOM.findDOMNode(this);
    dom.style.height = dom.offsetHeight + 'px';
    // Magic code
    // 重复一次后才能正确设置 height
    dom.style.height = dom.offsetHeight + 'px';

    this.setState({
      closing: false
    });
    this.props.onClose.call(this, e);
  },
  animationEnd() {
    this.setState({
      closed: true,
      closing: true
    });
  },
  render() {
    let {
      closable, description, type, prefixCls, message, closeText
    } = this.props;

    let iconType = '';
    switch (type) {
    case 'success':
      iconType = 'check-circle';
      break;
    case 'info':
      iconType = 'info-circle';
      break;
    case 'error':
      iconType = 'exclamation-circle';
      break;
    case 'warn':
      iconType = 'question-circle';
      break;
    default:
      iconType = 'default';
    }

    let alertCls = classNames({
      [prefixCls]: true,
      [prefixCls + '-' + type]: true,
      [prefixCls + '-close']: !this.state.closing,
      [prefixCls + '-with-description']: !!description,
    });

    if (closeText) {
      closable = true;
    }

    return this.state.closed ? null : (
      <Animate component=""
               showProp="data-show"
               transitionName="slide-up"
               onEnd={this.animationEnd}>
        <div data-show={this.state.closing} className={alertCls}>
          <Icon className="ant-alert-icon" type={iconType} />
          <span className={prefixCls + '-message'}>{message}</span>
          <span className={prefixCls + '-description'}>{description}</span>
          {closable ? <a onClick={this.handleClose} className={prefixCls + '-close-icon'}>
            {closeText}
          </a> : null}
        </div>
      </Animate>
    );
  }
});
