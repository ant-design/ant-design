import classNames from 'classnames';
import ResizeObserver from 'rc-resize-observer';
import omit from 'rc-util/lib/omit';
import * as React from 'react';
import type { CompoundedComponent } from 'antd/es/float-button/interface';
import useStyle from './style';
import { ConfigContext } from '../config-provider';
import throttleByAnimationFrame from '../_util/throttleByAnimationFrame';

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
  children: React.ReactNode;
}

interface InternalAffixProps extends AffixProps {
  affixPrefixCls: string;
  rootClassName: string;
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

const InternalAffix: React.ForwardRefRenderFunction<HTMLDivElement, InternalAffixProps> = (
  props,
  ref,
) => {
  const { getTargetContainer, getPrefixCls } = React.useContext(ConfigContext);

  const [status, setStatus] = React.useState(AffixStatus.None);
  const [affixStyle, setAffixStyle] = React.useState<React.CSSProperties>();
  const [prevTarget, setPrevTarget] = React.useState<Window | HTMLElement | null>();
  const [placeholderStyle, setPlaceholderStyle] = React.useState<React.CSSProperties>();
  const [lastAffix, setLastAffix] = React.useState(false);

  const placeholderNode = (ref as any) || React.createRef<HTMLDivElement>();
  const fixedNode = (ref as any) || React.createRef<HTMLDivElement>();
  const timeout = React.useRef<NodeJS.Timeout | null>(null);

  const affixPrefixCls = getPrefixCls('affix', props.prefixCls);
  const [wrapSSR, hashId] = useStyle(affixPrefixCls);

  const className = React.useMemo(
    () =>
      classNames(affixPrefixCls, hashId, {
        [props.rootClassName]: !!affixStyle,
        [props.affixPrefixCls]: !!affixStyle,
      }),
    [affixStyle],
  );

  const getTargetFunc = () => {
    const { target } = props;

    if (target !== undefined) {
      return target;
    }

    return getTargetContainer ?? getDefaultTarget;
  };

  const prepareMeasure = () => {
    // event param is used before. Keep compatible ts define here.
    setStatus(AffixStatus.Prepare);
    setAffixStyle(undefined);
    setPlaceholderStyle(undefined);

    // Test if `updatePosition` called
    if (process.env.NODE_ENV === 'test') {
      const { onTestUpdatePosition } = props as any;
      onTestUpdatePosition?.();
    }
  };

  const getOffsetBottom = () => props.offsetBottom;

  const getOffsetTop = () => {
    const { offsetBottom, offsetTop } = props;
    return offsetBottom === undefined && offsetTop === undefined ? 0 : offsetTop;
  };

  const updatePosition = React.useCallback(
    throttleByAnimationFrame(() => {
      prepareMeasure();
    }),
    [status, affixStyle, placeholderStyle],
  );

  const lazyUpdatePosition = throttleByAnimationFrame(() => {
    const targetFunc = getTargetFunc();

    // Check position change before measure to make Safari smooth
    if (targetFunc && affixStyle) {
      const offsetTop = getOffsetTop();
      const offsetBottom = getOffsetBottom();

      const targetNode = targetFunc();
      if (targetNode && placeholderNode.current) {
        const targetRect = getTargetRect(targetNode);
        const placeholderReact = getTargetRect(placeholderNode.current);
        const fixedTop = getFixedTop(placeholderReact, targetRect, offsetTop);
        const fixedBottom = getFixedBottom(placeholderReact, targetRect, offsetBottom);

        if (
          (fixedTop !== undefined && affixStyle.top === fixedTop) ||
          (fixedBottom !== undefined && affixStyle.bottom === fixedBottom)
        ) {
          return undefined;
        }
      }
    }
  });

  const measure = () => {
    const { onChange } = props;
    const targetFunc = getTargetFunc();
    if (
      status !== AffixStatus.Prepare ||
      !fixedNode.current ||
      !placeholderNode.current ||
      !targetFunc
    ) {
      return;
    }

    const offsetTop = getOffsetTop();
    const offsetBottom = getOffsetBottom();

    const targetNode = targetFunc();
    if (!targetNode) {
      return;
    }

    const newState: Partial<AffixState> = {
      status: AffixStatus.None,
    };
    const targetRect = getTargetRect(targetNode);
    const placeholderReact = getTargetRect(placeholderNode.current);
    const fixedTop = getFixedTop(placeholderReact, targetRect, offsetTop);
    const fixedBottom = getFixedBottom(placeholderReact, targetRect, offsetBottom);

    if (
      placeholderReact.top === 0 &&
      placeholderReact.left === 0 &&
      placeholderReact.width === 0 &&
      placeholderReact.height === 0
    ) {
      return;
    }

    if (fixedTop !== undefined) {
      newState.affixStyle = {
        position: 'fixed',
        top: fixedTop,
        width: placeholderReact.width,
        height: placeholderReact.height,
      };
      newState.placeholderStyle = {
        width: placeholderReact.width,
        height: placeholderReact.height,
      };
    } else if (fixedBottom !== undefined) {
      newState.affixStyle = {
        position: 'fixed',
        bottom: fixedBottom,
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

    setStatus(newState.status!);
    setAffixStyle(newState.affixStyle);
    setPlaceholderStyle(newState.placeholderStyle);
    setLastAffix(newState.lastAffix);
    setPlaceholderStyle(newState.placeholderStyle);
  };

  React.useEffect(() => {
    const targetFunc = getTargetFunc();
    if (targetFunc) {
      // [Legacy] Wait for parent component ref has its value.
      // We should use target as directly element instead of function which makes element check hard.
      timeout.current = setTimeout(() => {
        addObserveTarget(targetFunc(), this);
        // Mock Event object.
        updatePosition();
      });
    }

    // unmount
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }
      removeObserveTarget(this);
      updatePosition.cancel();
      // https://github.com/ant-design/ant-design/issues/22683
      lazyUpdatePosition.cancel();
    };
  }, []);

  React.useEffect(() => {
    const targetFunc = getTargetFunc();
    const newTarget = targetFunc?.() || null;

    if (prevTarget !== newTarget) {
      removeObserveTarget(this);
      if (newTarget) {
        addObserveTarget(newTarget, this);
        // Mock Event object.
        updatePosition();
      }

      // eslint-disable-next-line react/no-did-update-set-state
      setPrevTarget(newTarget);
    }

    updatePosition();

    measure();
  }, [prevTarget, props.offsetTop, props.offsetBottom]);

  let _props = omit(props, [
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
    _props = omit(props as typeof props & { onTestUpdatePosition: any }, ['onTestUpdatePosition']);
  }

  return wrapSSR(
    <ResizeObserver onResize={updatePosition}>
      <div {..._props} ref={placeholderNode}>
        {affixStyle && <div style={placeholderStyle} aria-hidden="true" />}
        <div className={className} ref={fixedNode} style={affixStyle}>
          <ResizeObserver onResize={updatePosition}>{props.children}</ResizeObserver>
        </div>
      </div>
    </ResizeObserver>,
  );
};

// just use in test
export type InternalAffixClass = HTMLDivElement;

const AffixFC = React.forwardRef<HTMLDivElement, AffixProps>(InternalAffix) as CompoundedComponent;

if (process.env.NODE_ENV !== 'production') {
  AffixFC.displayName = 'Affix';
}

export default AffixFC;
