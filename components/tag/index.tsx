import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Animate from 'rc-animate';
import classNames from 'classnames';
import omit from 'omit.js';
import { polyfill } from 'react-lifecycles-compat';
import Icon from '../icon';
import CheckableTag from './CheckableTag';
import Wave from '../_util/wave';

export { CheckableTagProps } from './CheckableTag';

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  className?: string;
  color?: string;
  /** 标签是否可以关闭 */
  closable?: boolean;
  visible?: boolean;
  /** 关闭时的回调 */
  onClose?: Function;
  /** 动画关闭后的回调 */
  afterClose?: Function;
  style?: React.CSSProperties;
}

export interface TagState {
  closing: boolean;
  closed: boolean;
  visible: boolean;
  mounted: boolean;
}

class Tag extends React.Component<TagProps, TagState> {
  static CheckableTag = CheckableTag;
  static defaultProps = {
    prefixCls: 'ant-tag',
    closable: false,
  };

  static getDerivedStateFromProps(nextProps: TagProps, state: TagState) {
    if ('visible' in nextProps) {
      let newState: Partial<TagState> = {
        visible: nextProps.visible,
        mounted: true,
      };

      if (!state.mounted) {
        newState = {
          ...newState,
          closed: !nextProps.visible,
        };
      }

      return newState;
    }
    return null;
  }

  state = {
    closing: false,
    closed: false,
    visible: true,
    mounted: false,
  };

  componentDidUpdate(_prevProps: TagProps, prevState: TagState) {
    if (prevState.visible && !this.state.visible) {
      this.close();
    } else if (!prevState.visible && this.state.visible) {
      this.show();
    }
  }

  handleIconClick = (e: React.MouseEvent<HTMLElement>) => {
    const onClose = this.props.onClose;
    if (onClose) {
      onClose(e);
    }
    if (e.defaultPrevented || 'visible' in this.props) {
      return;
    }
    this.setState({ visible: false });
  }

  close = () => {
    if (this.state.closing || this.state.closed) {
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

  show = () => {
    this.setState({
      closed: false,
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
    } else {
      this.setState({
        closed: false,
      });
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
    const { prefixCls, closable, color, className, children, style, ...otherProps } = this.props;
    const closeIcon = closable ? <Icon type="close" onClick={this.handleIconClick} /> : '';
    const isPresetColor = this.isPresetColor(color);
    const classString = classNames(prefixCls, {
      [`${prefixCls}-${color}`]: isPresetColor,
      [`${prefixCls}-has-color`]: (color && !isPresetColor),
      [`${prefixCls}-close`]: this.state.closing,
    }, className);
    // fix https://fb.me/react-unknown-prop
    const divProps = omit(otherProps, [
      'onClose',
      'afterClose',
      'visible',
    ]);
    const tagStyle = {
      backgroundColor: (color && !isPresetColor) ? color : null,
      ...style,
    };
    const tag = this.state.closed ? <span/> : (
      <div
        data-show={!this.state.closing}
        {...divProps}
        className={classString}
        style={tagStyle}
      >
        {children}
        {closeIcon}
      </div>
    );

    return (
      <Wave>
        <Animate
          component=""
          showProp="data-show"
          transitionName={`${prefixCls}-zoom`}
          transitionAppear
          onEnd={this.animationEnd}
        >
          {tag}
        </Animate>
      </Wave>
    );
  }
}

polyfill(Tag);

export default Tag;
