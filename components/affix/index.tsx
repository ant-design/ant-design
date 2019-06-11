import * as React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import classNames from 'classnames';
import omit from 'omit.js';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import { throttleByAnimationFrameDecorator } from '../_util/throttleByAnimationFrame';
import ResizeObserver from '../_util/resizeObserver';

import warning from '../_util/warning';
import { addObserveTarget, removeObserveTarget, getTargetRect } from './utils';

function getDefaultTarget() {
  return typeof window !== 'undefined' ? window : null;
}

// Affix
export interface AffixProps {
  /**
   * 距离窗口顶部达到指定偏移量后触发
   */
  offsetTop?: number;
  offset?: number;
  /** 距离窗口底部达到指定偏移量后触发 */
  offsetBottom?: number;
  style?: React.CSSProperties;
  /** 固定状态改变时触发的回调函数 */
  onChange?: (affixed?: boolean) => void;
  /** 设置 Affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 */
  target?: () => Window | HTMLElement | null;
  prefixCls?: string;
  className?: string;
}

enum AffixStatus {
  None,
  Prepare,
}

export interface AffixState {
  affixStyle?: React.CSSProperties;
  placeholderStyle?: React.CSSProperties;
  status: AffixStatus;
  lastAffix: boolean;
}

class Affix extends React.Component<AffixProps, AffixState> {
  static defaultProps = {
    target: getDefaultTarget,
  };

  state: AffixState = {
    status: AffixStatus.None,
    lastAffix: false,
  };

  placeholderNode: HTMLDivElement;
  fixedNode: HTMLDivElement;
  private timeout: number;

  // Event handler
  componentDidMount() {
    const { target } = this.props;
    if (target) {
      // [Legacy] Wait for parent component ref has its value.
      // We should use target as directly element instead of function which makes element check hard.
      this.timeout = setTimeout(() => {
        addObserveTarget(target(), this);
        // Mock Event object.
        this.updatePosition({} as Event);
      });
    }
  }

  componentDidUpdate(prevProps: AffixProps) {
    const { target } = this.props;
    if (prevProps.target !== target) {
      removeObserveTarget(this);
      if (target) {
        addObserveTarget(target(), this);
        // Mock Event object.
        this.updatePosition({} as Event);
      }
    }

    if (
      prevProps.offsetTop !== this.props.offsetTop ||
      prevProps.offsetBottom !== this.props.offsetBottom
    ) {
      this.updatePosition({} as Event);
    }

    this.measure();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    removeObserveTarget(this);
    (this.updatePosition as any).cancel();
  }

  savePlaceholderNode = (node: HTMLDivElement) => {
    this.placeholderNode = node;
  };

  saveFixedNode = (node: HTMLDivElement) => {
    this.fixedNode = node;
  };

  // =================== Measure ===================
  // Handle realign logic
  @throttleByAnimationFrameDecorator()
  // @ts-ignore TS6133
  updatePosition(e?: Event) {
    // event param is used before. Keep compatible ts define here.
    this.setState({
      status: AffixStatus.Prepare,
      affixStyle: undefined,
      placeholderStyle: undefined,
    });

    // Test if `updatePosition` called
    if (process.env.NODE_ENV === 'test') {
      const { onTestUpdatePosition } = this.props as any;
      if (onTestUpdatePosition) {
        onTestUpdatePosition();
      }
    }
  }

  measure = () => {
    const { status, lastAffix } = this.state;
    const { target, offset, offsetBottom, onChange } = this.props;
    if (status !== AffixStatus.Prepare || !this.fixedNode || !this.placeholderNode || !target) {
      return;
    }

    let { offsetTop } = this.props;
    if (typeof offsetTop === 'undefined') {
      offsetTop = offset;
      warning(
        typeof offset === 'undefined',
        'Affix',
        '`offset` is deprecated. Please use `offsetTop` instead.',
      );
    }

    if (offsetBottom === undefined && offsetTop === undefined) {
      offsetTop = 0;
    }

    const targetNode = target();
    if (!targetNode) {
      return;
    }

    const newState: Partial<AffixState> = {
      status: AffixStatus.None,
    };
    const targetRect = getTargetRect(targetNode);
    const placeholderReact = getTargetRect(this.placeholderNode);

    if (offsetTop !== undefined && targetRect.top > placeholderReact.top - offsetTop) {
      newState.affixStyle = {
        position: 'fixed',
        top: offsetTop + targetRect.top,
        width: placeholderReact.width,
        height: placeholderReact.height,
      };
      newState.placeholderStyle = {
        width: placeholderReact.width,
        height: placeholderReact.height,
      };
    } else if (
      offsetBottom !== undefined &&
      targetRect.bottom < placeholderReact.bottom + offsetBottom
    ) {
      const targetBottomOffset = targetNode === window ? 0 : window.innerHeight - targetRect.bottom;
      newState.affixStyle = {
        position: 'fixed',
        bottom: offsetBottom + targetBottomOffset,
        width: placeholderReact.width,
        height: placeholderReact.height,
      };
      newState.placeholderStyle = {
        width: placeholderReact.width,
        height: placeholderReact.height,
      };
    }

    newState.lastAffix = !!newState.affixStyle;
    if (onChange && lastAffix !== newState.lastAffix) {
      onChange(newState.lastAffix);
    }

    this.setState(newState as AffixState);
  };

  // =================== Render ===================
  renderAffix = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { affixStyle, placeholderStyle, status } = this.state;
    const { prefixCls, style, children } = this.props;
    const className = classNames({
      [getPrefixCls('affix', prefixCls)]: affixStyle,
    });

    let props = omit(this.props, ['prefixCls', 'offsetTop', 'offsetBottom', 'target', 'onChange']);
    // Omit this since `onTestUpdatePosition` only works on test.
    if (process.env.NODE_ENV === 'test') {
      props = omit(props, ['onTestUpdatePosition']);
    }
    const mergedPlaceholderStyle = {
      ...(status === AffixStatus.None ? placeholderStyle : null),
      ...style,
    };
    return (
      <div {...props} style={mergedPlaceholderStyle} ref={this.savePlaceholderNode}>
        <div className={className} ref={this.saveFixedNode} style={this.state.affixStyle}>
          <ResizeObserver onResize={this.updatePosition}>{children}</ResizeObserver>
        </div>
      </div>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderAffix}</ConfigConsumer>;
  }
}

polyfill(Affix);

export default Affix;
