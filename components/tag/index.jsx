import React from 'react';
import ReactDOM from 'react-dom';
import Animate from 'rc-animate';
import Icon from '../icon';

class AntTag extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      closing: false,
      closed: false,
    };
  }

  close(e) {
    const dom = ReactDOM.findDOMNode(this);
    dom.style.width = dom.offsetWidth + 'px';
    // It's Magic Code, don't know why
    dom.style.width = dom.offsetWidth + 'px';
    this.setState({
      closing: true,
    });
    this.props.onClose(e);
  }

  animationEnd(key, existed) {
    if (!existed) {
      this.setState({
        closed: true,
        closing: false,
      });
      this.props.afterClose();
    }
  }

  render() {
    const close = this.props.closable ?
      <Icon type="cross" onClick={this.close.bind(this)} /> : '';
    const colorClass = this.props.color ? this.props.prefixCls + '-' + this.props.color : '';
    let className = this.props.prefixCls + ' ' + colorClass;
    className = this.state.closing ? className + ' ' + this.props.prefixCls + '-close' : className;

    return this.state.closed ? null : (
        <Animate component=""
          showProp="data-show"
          transitionName={this.props.prefixCls + '-zoom'}
          onEnd={this.animationEnd.bind(this)}>
        <div data-show={!this.state.closing} className={className}>
          <span className={this.props.prefixCls + '-text'} {...this.props} />
          {close}
        </div>
      </Animate>
    );
  }
}

AntTag.defaultProps = {
  prefixCls: 'ant-tag',
  closable: false,
  onClose() {},
  afterClose() {},
};

export default AntTag;
