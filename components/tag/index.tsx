import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Animate from 'rc-animate';
import Icon from '../icon';
import classNames from 'classnames';
import splitObject from '../_util/splitObject';

export interface TagProps {
  /** 标签是否可以关闭*/
  closable?: boolean,
  /** 关闭时的回调*/
  onClose?: Function,
  /** 动画关闭后的回调*/
  afterClose?: Function,
  /** 标签的色彩*/
  color?: string,

  style?: React.CSSProperties
}
export default class Tag extends React.Component<TagProps, any> {
  static defaultProps = {
    prefixCls: 'ant-tag',
    closable: false,
    onClose() { },
    afterClose() { },
  }

  constructor(props) {
    super(props);

    this.state = {
      closing: false,
      closed: false,
    };
  }

  close = (e) => {
    this.props.onClose(e);
    if (e.defaultPrevented) return;
    const dom = ReactDOM.findDOMNode(this);
    const domWidth = dom.getBoundingClientRect().width;
    dom.style.width = `${domWidth}px`;
    // It's Magic Code, don't know why
    dom.style.width = `${domWidth}px`;
    this.setState({
      closing: true,
    });
  }

  animationEnd = (key, existed) => {
    if (!existed && !this.state.closed) {
      this.setState({
        closed: true,
        closing: false,
      });
      this.props.afterClose();
    }
  }

  render() {
    const [{
      prefixCls, closable, color, className, children
    }, restProps] = splitObject(this.props,
      ['prefixCls', 'closable', 'color', 'className', 'children']);
    const close = closable ? <Icon type="cross" onClick={this.close} /> : '';
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
        onEnd={this.animationEnd}
        >
        {this.state.closed ? null : (
          <div data-show={!this.state.closing} {...restProps} className={classString}>
            <span className={`${prefixCls}-text`}>{children}</span>
            {close}
          </div>
        ) }
      </Animate>
    );
  }
}
