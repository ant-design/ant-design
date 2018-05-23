import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Animate from 'rc-animate';
import classNames from 'classnames';
import Icon from '../icon';
import CheckableTag from './CheckableTag';

export { CheckableTagProps } from './CheckableTag';

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  className?: string;
  color?: string;
  onTag?: React.DOMAttributes<HTMLDivElement>;
  /** 标签是否可以关闭 */
  closable?: boolean;
  /** 关闭时的回调 */
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
  /** 动画关闭后的回调 */
  afterClose?: Function;
  style?: React.CSSProperties;
}

export interface TagState {
  closing: boolean;
  closed: boolean;
}

export default class Tag extends React.Component<TagProps, TagState> {
  static CheckableTag = CheckableTag;
  static defaultProps = {
    prefixCls: 'ant-tag',
    closable: false,
  };

  constructor(props: TagProps) {
    super(props);

    this.state = {
      closing: false,
      closed: false,
    };
  }

  close = (e: React.MouseEvent<HTMLElement>) => {
    const onClose = this.props.onClose;
    if (onClose) {
      onClose(e);
    }
    if (e.defaultPrevented) {
      return;
    }
    const dom = ReactDOM.findDOMNode(this) as HTMLElement;
    dom.style.width = `${dom.getBoundingClientRect().width}px`;
    // It's Magic Code, don't know why
    dom.style.width = `${dom.getBoundingClientRect().width}px`;
    this.setState({
      closing: true,
    });
  }

  animationEnd = (_: string, existed: boolean) => {
    if (!existed && !this.state.closed) {
      this.setState({
        closed: true,
        closing: false,
      });

      const afterClose = this.props.afterClose;
      if (afterClose) {
        afterClose();
      }
    }
  }

  isPresetColor(color?: string): boolean {
    if (!color) { return false; }
    return (
      /^(pink|red|yellow|orange|cyan|green|blue|purple|geekblue|magenta|volcano|gold|lime)(-inverse)?$/
      .test(color)
    );
  }

  render() {
    const {
      prefixCls, closable, color, className, children, style,
      onTag = {}, onClose: _onClose, afterClose: _afterClose,
      ...divProps,
    } = this.props;
    const closeIcon = closable ? <Icon type="cross" onClick={this.close} /> : '';
    const isPresetColor = this.isPresetColor(color);
    const classString = classNames(prefixCls, {
      [`${prefixCls}-${color}`]: isPresetColor,
      [`${prefixCls}-has-color`]: (color && !isPresetColor),
      [`${prefixCls}-close`]: this.state.closing,
    }, className);
    const tagStyle = {
      backgroundColor: (color && !isPresetColor) ? color : null,
      ...style,
    };
    const tag = this.state.closed ? null : (
      <div
        data-show={!this.state.closing}
        {...divProps}
        {...onTag}
        className={classString}
        style={tagStyle}
      >
        {children}
        {closeIcon}
      </div>
    );
    return (
      <Animate
        component=""
        showProp="data-show"
        transitionName={`${prefixCls}-zoom`}
        transitionAppear
        onEnd={this.animationEnd}
      >
        {tag}
      </Animate>
    );
  }
}
