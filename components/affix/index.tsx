import React from 'react';
import ResizeObserver from '@rc-component/resize-observer';
import { clsx } from 'clsx';

import throttleByAnimationFrame from '../_util/throttleByAnimationFrame';
import { ConfigContext, useComponentConfig } from '../config-provider/context';
import useStyle from './style';
import type { AffixStackDirection, AffixStackEntry } from './utils';
import {
  getFixedBottom,
  getFixedTop,
  getStackOffset,
  getTargetRect,
  notifyAffixStack,
  registerAffixStack,
} from './utils';

const TRIGGER_EVENTS: (keyof WindowEventMap)[] = [
  'resize',
  'scroll',
  'touchstart',
  'touchmove',
  'touchend',
  'pageshow',
  'load',
];

const getDefaultTarget = () => {
  return typeof window !== 'undefined' ? window : null;
};

// Affix
export interface AffixProps {
  /** Triggered when the specified offset is reached from the top of the window */
  offsetTop?: number;
  /** Triggered when the specified offset is reached from the bottom of the window */
  offsetBottom?: number;
  /** Whether multiple Affix components with the same target and offset direction should stack without overlapping */
  stackable?: boolean;
  style?: React.CSSProperties;
  /** Callback function triggered when fixed state changes */
  onChange?: (affixed?: boolean) => void;
  /** Set the element that Affix needs to listen to its scroll event, the value is a function that returns the corresponding DOM element */
  target?: () => Window | HTMLElement | null;
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  children: React.ReactNode;
}

const AFFIX_STATUS_NONE = 0;
const AFFIX_STATUS_PREPARE = 1;

type AffixStatus = typeof AFFIX_STATUS_NONE | typeof AFFIX_STATUS_PREPARE;

interface AffixState {
  affixStyle?: React.CSSProperties;
  placeholderStyle?: React.CSSProperties;
  status: AffixStatus;
  lastAffix: boolean;
  prevTarget: Window | HTMLElement | null;
}

export interface AffixRef {
  updatePosition: ReturnType<typeof throttleByAnimationFrame>;
}

interface InternalAffixProps extends AffixProps {
  onTestUpdatePosition?: () => void;
}

const Affix = React.forwardRef<AffixRef, InternalAffixProps>((props, ref) => {
  const {
    style,
    offsetTop,
    offsetBottom,
    stackable,
    prefixCls,
    className,
    rootClassName,
    children,
    target,
    onChange,
    onTestUpdatePosition,
    ...restProps
  } = props;

  const {
    getPrefixCls,
    className: contextClassName,
    style: contextStyle,
  } = useComponentConfig('affix');
  const { getTargetContainer } = React.useContext(ConfigContext);

  const affixPrefixCls = getPrefixCls('affix', prefixCls);

  const [lastAffix, setLastAffix] = React.useState(false);
  const [affixStyle, setAffixStyle] = React.useState<React.CSSProperties>();
  const [placeholderStyle, setPlaceholderStyle] = React.useState<React.CSSProperties>();

  const statusRef = React.useRef<AffixStatus>(AFFIX_STATUS_NONE);

  const prevTargetRef = React.useRef<Window | HTMLElement | null>(null);
  const prevListenerRef = React.useRef<EventListener>(null);

  const placeholderNodeRef = React.useRef<HTMLDivElement>(null);
  const fixedNodeRef = React.useRef<HTMLDivElement>(null);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const stackEntryRef = React.useRef<AffixStackEntry | null>(null);
  const stackTargetRef = React.useRef<Window | HTMLElement | null>(null);
  const unregisterStackRef = React.useRef<(() => void) | null>(null);
  const updatePositionRef = React.useRef<() => void>(() => {});

  const targetFunc = target ?? getTargetContainer ?? getDefaultTarget;

  const internalOffsetTop = offsetBottom === undefined && offsetTop === undefined ? 0 : offsetTop;

  const unregisterStack = () => {
    unregisterStackRef.current?.();
    unregisterStackRef.current = null;
    stackTargetRef.current = null;
  };

  const syncStack = (targetNode: Window | HTMLElement | null) => {
    if (!stackable || !targetNode || !placeholderNodeRef.current) {
      unregisterStack();
      return null;
    }

    const stackEntry: AffixStackEntry = stackEntryRef.current ?? {
      placeholder: placeholderNodeRef.current,
      updatePosition: () => updatePositionRef.current(),
    };
    stackEntry.offsetBottom = offsetBottom;
    stackEntry.offsetTop = internalOffsetTop;
    stackEntry.placeholder = placeholderNodeRef.current;
    stackEntryRef.current = stackEntry;

    if (stackTargetRef.current !== targetNode) {
      unregisterStack();
      stackTargetRef.current = targetNode;
      unregisterStackRef.current = registerAffixStack(targetNode, stackEntry);
    }

    return stackEntry;
  };

  const getMergedOffset = (
    targetNode: Window | HTMLElement,
    targetRect: DOMRect,
    stackEntry: AffixStackEntry | null,
    direction: AffixStackDirection,
  ) => {
    const offset = direction === 'top' ? internalOffsetTop : offsetBottom;
    return stackEntry ? getStackOffset(targetNode, targetRect, stackEntry, direction) : offset;
  };

  // =================== Measure ===================
  const measure = () => {
    if (
      statusRef.current !== AFFIX_STATUS_PREPARE ||
      !fixedNodeRef.current ||
      !placeholderNodeRef.current ||
      !targetFunc
    ) {
      return;
    }

    const targetNode = targetFunc();
    if (targetNode) {
      const newState: Partial<AffixState> = {
        status: AFFIX_STATUS_NONE,
      };
      const placeholderRect = getTargetRect(placeholderNodeRef.current);

      const stackEntry = syncStack(targetNode);

      if (
        placeholderRect.top === 0 &&
        placeholderRect.left === 0 &&
        placeholderRect.width === 0 &&
        placeholderRect.height === 0
      ) {
        return;
      }

      const targetRect = getTargetRect(targetNode);
      const fixedTop = getFixedTop(
        placeholderRect,
        targetRect,
        getMergedOffset(targetNode, targetRect, stackEntry, 'top'),
      );
      const fixedBottom = getFixedBottom(
        placeholderRect,
        targetRect,
        getMergedOffset(targetNode, targetRect, stackEntry, 'bottom'),
      );

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

      if (lastAffix !== newState.lastAffix) {
        onChange?.(newState.lastAffix);
      }

      statusRef.current = newState.status!;
      setAffixStyle(newState.affixStyle);
      setPlaceholderStyle(newState.placeholderStyle);
      setLastAffix(newState.lastAffix);
    }
  };

  const prepareMeasure = () => {
    statusRef.current = AFFIX_STATUS_PREPARE;
    measure();
    if (process.env.NODE_ENV === 'test') {
      onTestUpdatePosition?.();
    }
  };

  const updatePosition = throttleByAnimationFrame(() => {
    prepareMeasure();
  });
  updatePositionRef.current = updatePosition;

  const onResize = () => {
    if (stackTargetRef.current && stackEntryRef.current) {
      notifyAffixStack(stackTargetRef.current, stackEntryRef.current);
    }
    updatePosition();
  };

  const lazyUpdatePosition = throttleByAnimationFrame(() => {
    // Check position change before measure to make Safari smooth
    if (targetFunc && affixStyle) {
      const targetNode = targetFunc();
      if (targetNode && placeholderNodeRef.current) {
        const targetRect = getTargetRect(targetNode);
        const placeholderRect = getTargetRect(placeholderNodeRef.current);
        const stackEntry = syncStack(targetNode);
        const fixedTop = getFixedTop(
          placeholderRect,
          targetRect,
          getMergedOffset(targetNode, targetRect, stackEntry, 'top'),
        );
        const fixedBottom = getFixedBottom(
          placeholderRect,
          targetRect,
          getMergedOffset(targetNode, targetRect, stackEntry, 'bottom'),
        );

        if (
          (fixedTop !== undefined && affixStyle.top === fixedTop) ||
          (fixedBottom !== undefined && affixStyle.bottom === fixedBottom)
        ) {
          return;
        }
      }
    }

    // Directly call prepare measure since it's already throttled.
    prepareMeasure();
  });

  const addListeners = () => {
    const listenerTarget = targetFunc?.();
    if (!listenerTarget) {
      return;
    }
    TRIGGER_EVENTS.forEach((eventName) => {
      if (prevListenerRef.current) {
        prevTargetRef.current?.removeEventListener(eventName, prevListenerRef.current);
      }
      listenerTarget?.addEventListener(eventName, lazyUpdatePosition);
    });
    prevTargetRef.current = listenerTarget;
    prevListenerRef.current = lazyUpdatePosition;
  };

  const removeListeners = () => {
    const newTarget = targetFunc?.();
    TRIGGER_EVENTS.forEach((eventName) => {
      newTarget?.removeEventListener(eventName, lazyUpdatePosition);
      if (prevListenerRef.current) {
        prevTargetRef.current?.removeEventListener(eventName, prevListenerRef.current);
      }
    });
    updatePosition.cancel();
    lazyUpdatePosition.cancel();
  };

  React.useImperativeHandle(ref, () => ({ updatePosition }));

  React.useEffect(() => {
    syncStack(targetFunc?.());
    return unregisterStack;
  }, [stackable, targetFunc, internalOffsetTop, offsetBottom]);

  // mount & unmount
  React.useEffect(() => {
    // [Legacy] Wait for parent component ref has its value.
    // We should use target as directly element instead of function which makes element check hard.
    timerRef.current = setTimeout(addListeners);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      removeListeners();
    };
  }, []);

  React.useEffect(() => {
    addListeners();
    return () => removeListeners();
  }, [target, affixStyle, lastAffix, offsetTop, offsetBottom, stackable]);

  React.useEffect(() => {
    updatePosition();
  }, [target, offsetTop, offsetBottom, stackable]);

  const [hashId, cssVarCls] = useStyle(affixPrefixCls);

  const rootCls = clsx(rootClassName, hashId, affixPrefixCls, cssVarCls);

  const mergedCls = clsx({ [rootCls]: affixStyle });

  return (
    <ResizeObserver onResize={onResize}>
      <div
        style={{ ...contextStyle, ...style }}
        className={clsx(className, contextClassName)}
        ref={placeholderNodeRef}
        {...restProps}
      >
        {affixStyle && <div style={placeholderStyle} aria-hidden="true" />}
        <div className={mergedCls} ref={fixedNodeRef} style={affixStyle}>
          <ResizeObserver onResize={onResize}>{children}</ResizeObserver>
        </div>
      </div>
    </ResizeObserver>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Affix.displayName = 'Affix';
}

export default Affix;
