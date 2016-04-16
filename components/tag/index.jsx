import React from 'react';
import ReactDOM from 'react-dom';
import Animate from 'rc-animate';
import Icon from '../icon';
import classNames from 'classnames';

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
    dom.style.width = `${dom.offsetWidth}px`;
    // It's Magic Code, don't know why
    dom.style.width = `${dom.offsetWidth}px`;
    this.setState({
      closing: true,
    });
    this.props.onClose(e);
  }

  animationEnd(key, existed) {
    if (!existed && !this.state.closed) {
      this.setState({
        closed: true,
        closing: false,
      });
      this.props.afterClose();
    }
  }

  render() {
    const { prefixCls, closable, color, className, children, ...restProps } = this.props;
    const close = closable ? <Icon type="cross" onClick={this.close.bind(this)} /> : '';
    const classString = classNames({
      [prefixCls]: true,
      [`${prefixCls}-${color}`]: !!color,
      [`${prefixCls}-close`]: this.state.closing,
      [className]: !!className,
    });
    return (
      <Animate component=""
        showProp="data-show"
        transitionName={`${prefixCls}-zoom`}
        transitionAppear
        onEnd={this.animationEnd.bind(this)}>
        {this.state.closed ? null : (
          <div data-show={!this.state.closing} {...restProps} className={classString}>
            <span className={`${prefixCls}-text`}>{children}</span>
            {close}
          </div>
        )}
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
