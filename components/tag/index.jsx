import React from 'react';
const prefixCls = 'ant-tag';
import { transitionEndEvent, addEventListenerOnce } from '../util/index';

class AntTag extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      closing: false,
      closed: false
    };
  }

  close(e) {
    let dom = React.findDOMNode(this);
    dom.style.width = dom.offsetWidth + 'px';
    // Magic code
    // 重复是去除浏览器渲染bug；
    dom.style.width = dom.offsetWidth + 'px';
    this.setState({
      closing: true
    });
    addEventListenerOnce(dom, transitionEndEvent, () => {
      this.setState({
        closed: true,
        closing: false
      });
    });
    this.props.onClose.call(this, e);
  }

  render() {
    let close = this.props.closable ?
      <i className="anticon anticon-cross" onClick={this.close.bind(this)}></i> : '';
    let colorClass = this.props.color ? this.props.prefixCls + '-' + this.props.color : '';

    let className = this.props.prefixCls + ' ' + colorClass;
    className = this.state.closing ? className + ' ' + this.props.prefixCls + '-close' : className;

    return (this.state.closed && !this.state.closing) ? null : <div className={className}>
      <a className={this.props.prefixCls + '-text'} {...this.props} />
      {close}
    </div>;
  }
}

AntTag.defaultProps = {
  prefixCls: prefixCls,
  closable: false,
  onClose: function () {}
};

export default AntTag;
