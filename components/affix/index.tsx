import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { polyfill } from 'react-lifecycles-compat';
import * as PropTypes from 'prop-types';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import classNames from 'classnames';
import shallowequal from 'shallowequal';
import omit from 'omit.js';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import getScroll from '../_util/getScroll';
import { throttleByAnimationFrameDecorator } from '../_util/throttleByAnimationFrame';

import warning from '../_util/warning';
import { addObserveTarget, removeObserveTarget, getTargetRect, getOffset } from './utils';

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

  // TODO: Remove me!
  debug?: boolean;
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
    status:  AffixStatus.None,
    lastAffix: false,
  };

  private timeout: number;
  placeholderNode: HTMLDivElement;
  fixedNode: HTMLDivElement;

  // Event handler
  componentDidMount() {
    if (!this.props.debug) return;
    const { target } = this.props;
    if (target) {
      // Wait for parent component ref has its value
      this.timeout = setTimeout(() => {
        addObserveTarget(target(), this);
      });
    }
  }

  componentDidUpdate(prevProps: AffixProps) {
    if (!this.props.debug) return;
    const { target } = this.props;
    if (prevProps.target !== target) {
      removeObserveTarget(this);
      if (target) {
        addObserveTarget(target(), this);
      }
    }

    this.measure();
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    removeObserveTarget(this);
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
  updatePosition(e: Event) {
    console.log('???', e.target);
    this.setState({
      status: AffixStatus.Prepare,
      affixStyle: undefined,
      placeholderStyle: undefined,
    });
  }

  measure = () => {
    const { status } = this.state;
    const { target, offset, offsetBottom } = this.props;
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

    const targetNode = target();
    if (!targetNode) {
      return;
    }

    const newState: Partial<AffixState> = {
      status: AffixStatus.None,
    };
    const targetRect = getTargetRect(targetNode);
    const placeholderReact = getTargetRect(this.placeholderNode);

    console.log('>>>', targetRect.top, placeholderReact.top, offsetTop);
    // TODO: inner content scroll
    // const scrollTop = getScroll(targetNode, true);
    if (offsetTop !== undefined && targetRect.top > placeholderReact.top - offsetTop) {
      newState.affixStyle = {
        position: 'fixed',
        top: offsetTop,
      };
      newState.placeholderStyle = {
        width: placeholderReact.width,
        height: placeholderReact.height,
      };
    } else if (offsetBottom !== undefined && targetRect.bottom < placeholderReact.bottom + offsetBottom) {
      newState.affixStyle = {
        position: 'fixed',
        bottom: offsetBottom,
      };
      newState.placeholderStyle = {
        width: placeholderReact.width,
        height: placeholderReact.height,
      };
    }

    this.setState(newState as AffixState);
  }

  // =================== Render ===================
  renderAffix = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { affixStyle, placeholderStyle, status } = this.state;
    const { prefixCls, style, children } = this.props;
    const className = classNames({
      [getPrefixCls('affix', prefixCls)]: affixStyle,
    });

    const props = omit(this.props, [
      'prefixCls',
      'offsetTop',
      'offsetBottom',
      'target',
      'onChange',
      'debug',
    ]);
    const mergedPlaceholderStyle = {
      ...(status === AffixStatus.None ? placeholderStyle : null),
      ...style
    };
    return (
      <div {...props} style={mergedPlaceholderStyle} ref={this.savePlaceholderNode}>
        <div className={className} ref={this.saveFixedNode} style={this.state.affixStyle}>
          {children}
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
