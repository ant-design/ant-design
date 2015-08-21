import React from 'react';
const prefixCls = 'ant-tag';
import { transitionEndEvent, addEventListenerOnce } from '../util/index';

import Animate from 'rc-animate';

class AntTag extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      closing: true,
      closed: false
    };
  }

  close(e) {
    let dom = React.findDOMNode(this);
    dom.style.width = dom.offsetWidth + 'px';
    // It's Magic Code, don't know why
    dom.style.width = dom.offsetWidth + 'px';
    this.setState({
      closing: false
    });

    this.props.onClose.call(this, e);
  }
  animationEnd() {
    this.setState({
      closed: true,
      closing: true
    });
  }

  render() {
    let close = this.props.closable ?
      <i className="anticon anticon-cross" onClick={this.close.bind(this)}></i> : '';
    let colorClass = this.props.color ? this.props.prefixCls + '-' + this.props.color : '';

    let className = this.props.prefixCls + ' ' + colorClass;
    className = !this.state.closing ? className + ' ' + this.props.prefixCls + '-close' : className;

    return this.state.closed ? null
      : <Animate
      component=""
      showProp='data-show'
      transitionName="zoom-tag"
      onEnd={this.animationEnd.bind(this)}>
      <div data-show={this.state.closing} className={className}>
          <a className={this.props.prefixCls + '-text'} {...this.props} />
          {close}
        </div>
      </Animate>;
  }
}

AntTag.defaultProps = {
  prefixCls: prefixCls,
  closable: false,
  onClose: function() {}
};

export default AntTag;
