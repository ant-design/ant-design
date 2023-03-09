import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import omit from 'rc-util/lib/omit';
import React, { createRef, forwardRef, useContext } from 'react';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import throttleByAnimationFrame from '../_util/throttleByAnimationFrame';

import useStyle from './style';
import {
  addObserveTarget,
  getFixedBottom,
  getFixedTop,
  getTargetRect,
  removeObserveTarget,
} from './utils';

function getDefaultTarget() {
  return typeof window !== 'undefined' ? window : null;
}

// Affix
export interface AffixProps {
  /** 距离窗口顶部达到指定偏移量后触发 */
  offsetTop?: number;
  /** 距离窗口底部达到指定偏移量后触发 */
  offsetBottom?: number;
  style?: React.CSSProperties;
  /** 固定状态改变时触发的回调函数 */
  onChange?: (affixed?: boolean) => void;
  /** 设置 Affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 */
  target?: () => Window | HTMLElement | null;
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  children: React.ReactNode;
}

interface InternalAffixProps extends AffixProps {
  affixPrefixCls: string;
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
  prevTarget: Window | HTMLElement | null;
}

class InternalAffix extends React.Component<InternalAffixProps, AffixState> {
  static contextType = ConfigContext;

  state: AffixState = {
    status: AffixStatus.None,
    lastAffix: false,
    prevTarget: null,
  };

  private placeholderNodeRef = createRef<HTMLDivElement>();

  private fixedNodeRef = createRef<HTMLDivElement>();

  private timer: NodeJS.Timeout | null;

  context: ConfigConsumerProps;

  private getTargetFunc() {
    const { getTargetContainer } = this.context;
    const { target } = this.props;

    if (target !== undefined) {
      return target;
    }

    return getTargetContainer ?? getDefaultTarget;
  }

  // Event handler
  componentDidMount() {
    const targetFunc = this.getTargetFunc();
    if (targetFunc) {
      // [Legacy] Wait for parent component ref has its value.
      // We should use target as directly element instead of function which makes element check hard.
      this.timer = setTimeout(() => {
        addObserveTarget(targetFunc(), this);
        // Mock Event object.
        this.updatePosition();
      });
    }
  }

  componentDidUpdate(prevProps: AffixProps) {
    const { prevTarget } = this.state;
    const targetFunc = this.getTargetFunc();
    const newTarget = targetFunc?.() || null;

    if (prevTarget !== newTarget) {
      removeObserveTarget(this);
      if (newTarget) {
        addObserveTarget(newTarget, this);
        // Mock Event object.
        this.updatePosition();
      }

      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ prevTarget: newTarget });
    }

    if (
      prevProps.offsetTop !== this.props.offsetTop ||
      prevProps.offsetBottom !== this.props.offsetBottom
    ) {
      this.updatePosition();
    }
    this.measure();
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    removeObserveTarget(this);
    this.updatePosition.cancel();
    // https://github.com/ant-design/ant-design/issues/22683
    this.lazyUpdatePosition.cancel();
  }

  getOffsetTop = () => {
    const { offsetBottom, offsetTop } = this.props;
    return offsetBottom === undefined && offsetTop === undefined ? 0 : offsetTop;
  };

  getOffsetBottom = () => this.props.offsetBottom;

  // =================== Measure ===================
  measure = () => {
    const { status, lastAffix } = this.state;
    const { onChange } = this.props;
    const targetFunc = this.getTargetFunc();
    if (
      status !== AffixStatus.Prepare ||
      !this.fixedNodeRef.current ||
      !this.placeholderNodeRef.current ||
      !targetFunc
    ) {
      return;
    }

    const offsetTop = this.getOffsetTop();
    const offsetBottom = this.getOffsetBottom();

    const targetNode = targetFunc();
    if (!targetNode) {
      return;
    }

    const newState: Partial<AffixState> = {
      status: AffixStatus.None,
    };
    const targetRect = getTargetRect(targetNode);
    const placeholderRect = getTargetRect(this.placeholderNodeRef.current);
    const fixedTop = getFixedTop(placeholderRect, targetRect, offsetTop);
    const fixedBottom = getFixedBottom(placeholderRect, targetRect, offsetBottom);

    if (
      placeholderRect.top === 0 &&
      placeholderRect.left === 0 &&
      placeholderRect.width === 0 &&
      placeholderRect.height === 0
    ) {
      return;
    }

    if (fixedTop !== undefined) {
      newState.affixStyle = {
        position: 'fixed',
        top: fixedTop,
        width: placeholderRect.width,
        height: placeholderRect.height,
      };
      newState.placeholderStyle = {
        width: placeholderRect.width,
        height: placeholderRect.height,
      };
    } else if (fixedBottom !== undefined) {
      newState.affixStyle = {
        position: 'fixed',
        bottom: fixedBottom,
        width: placeholderRect.width,
        height: placeholderRect.height,
      };
      newState.placeholderStyle = {
        width: placeholderRect.width,
        height: placeholderRect.height,
      };
    }

    newState.lastAffix = !!newState.affixStyle;
    if (onChange && lastAffix !== newState.lastAffix) {
      onChange(newState.lastAffix);
    }

    this.setState(newState as AffixState);
  };

  prepareMeasure = () => {
    // event param is used before. Keep compatible ts define here.
    this.setState({
      status: AffixStatus.Prepare,
      affixStyle: undefined,
      placeholderStyle: undefined,
    });

    // Test if `updatePosition` called
    if (process.env.NODE_ENV === 'test') {
      const { onTestUpdatePosition } = this.props as any;
      onTestUpdatePosition?.();
    }
  };

  updatePosition = throttleByAnimationFrame(() => {
    this.prepareMeasure();
  });

  lazyUpdatePosition = throttleByAnimationFrame(() => {
    const targetFunc = this.getTargetFunc();
    const { affixStyle } = this.state;

    // Check position change before measure to make Safari smooth
    if (targetFunc && affixStyle) {
      const offsetTop = this.getOffsetTop();
      const offsetBottom = this.getOffsetBottom();

      const targetNode = targetFunc();
      if (targetNode && this.placeholderNodeRef.current) {
        const targetRect = getTargetRect(targetNode);
        const placeholderRect = getTargetRect(this.placeholderNodeRef.current);
        const fixedTop = getFixedTop(placeholderRect, targetRect, offsetTop);
        const fixedBottom = getFixedBottom(placeholderRect, targetRect, offsetBottom);

        if (
          (fixedTop !== undefined && affixStyle.top === fixedTop) ||
          (fixedBottom !== undefined && affixStyle.bottom === fixedBottom)
        ) {
          return;
        }
      }
    }

    // Directly call prepare measure since it's already throttled.
    this.prepareMeasure();
  });

  // =================== Render ===================
  render() {
    const { affixStyle, placeholderStyle } = this.state;
    const { affixPrefixCls, rootClassName, children } = this.props;
    const className = classNames(affixStyle && rootClassName, {
      [affixPrefixCls]: !!affixStyle,
    });

    let props = omit(this.props, [
      'prefixCls',
      'offsetTop',
      'offsetBottom',
      'target',
      'onChange',
      'affixPrefixCls',
      'rootClassName',
    ]);
    // Omit this since `onTestUpdatePosition` only works on test.
    if (process.env.NODE_ENV === 'test') {
      props = omit(props as typeof props & { onTestUpdatePosition: any }, ['onTestUpdatePosition']);
    }

    return (
      <ResizeObserver onResize={this.updatePosition}>
        <div {...props} ref={this.placeholderNodeRef}>
          {affixStyle && <div style={placeholderStyle} aria-hidden="true" />}
          <div className={className} ref={this.fixedNodeRef} style={affixStyle}>
            <ResizeObserver onResize={this.updatePosition}>{children}</ResizeObserver>
          </div>
        </div>
      </ResizeObserver>
    );
  }
}
// just use in test
export type InternalAffixClass = InternalAffix;

const Affix = forwardRef<InternalAffix, AffixProps>((props, ref) => {
  const { prefixCls: customizePrefixCls, rootClassName } = props;
  const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);
  const affixPrefixCls = getPrefixCls('affix', customizePrefixCls);

  const [wrapSSR, hashId] = useStyle(affixPrefixCls);

  const AffixProps: InternalAffixProps = {
    ...props,
    affixPrefixCls,
    rootClassName: classNames(rootClassName, hashId),
  };

  return wrapSSR(<InternalAffix {...AffixProps} ref={ref} />);
});

if (process.env.NODE_ENV !== 'production') {
  Affix.displayName = 'Affix';
}

export default Affix;
