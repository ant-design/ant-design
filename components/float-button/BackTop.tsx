import React, { useContext, useEffect, useState } from 'react';
import VerticalAlignTopOutlined from '@ant-design/icons/VerticalAlignTopOutlined';
import CSSMotion from '@rc-component/motion';
import { composeRef } from '@rc-component/util';
import { clsx } from 'clsx';

import getScroll, { isDocument, isWindow } from '../_util/getScroll';
import scrollTo from '../_util/scrollTo';
import throttleByAnimationFrame from '../_util/throttleByAnimationFrame';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import { useComponentConfig } from '../config-provider/context';
import { GroupContext } from './context';
import FloatButton, { floatButtonPrefixCls } from './FloatButton';
import type {
  FloatButtonElement,
  FloatButtonProps,
  FloatButtonRef,
  FloatButtonShape,
} from './FloatButton';

export interface BackTopProps extends Omit<FloatButtonProps, 'target'> {
  visibilityHeight?: number;
  onClick?: React.MouseEventHandler<FloatButtonElement>;
  target?: () => HTMLElement | Window | Document;
  prefixCls?: string;
  children?: React.ReactNode;
  className?: string;
  rootClassName?: string;
  style?: React.CSSProperties;
  duration?: number;
  showProgress?: boolean;
}

const defaultIcon = <VerticalAlignTopOutlined />;

const getProgressPath = (shape: FloatButtonShape) =>
  shape === 'square'
    ? 'M 26 8 H 74 A 18 18 0 0 1 92 26 V 74 A 18 18 0 0 1 74 92 H 26 A 18 18 0 0 1 8 74 V 26 A 18 18 0 0 1 26 8 Z'
    : 'M 50 8 A 42 42 0 1 1 49.999 8';

const getScrollProgress = (target: HTMLElement | Window | Document | null): number => {
  const scrollTop = getScroll(target);
  const scrollElement = isWindow(target)
    ? target.document.documentElement
    : target && isDocument(target)
      ? target.documentElement
      : target;

  if (!scrollElement) {
    return 0;
  }

  const maxScroll = Math.max(scrollElement.scrollHeight - scrollElement.clientHeight, 0);

  return maxScroll > 0 ? Math.min(Math.max(scrollTop / maxScroll, 0), 1) : 0;
};

const BackTop = React.forwardRef<FloatButtonRef, BackTopProps>((props, ref) => {
  const { backTopIcon: contextIcon } = useComponentConfig('floatButton');

  const {
    prefixCls: customizePrefixCls,
    className,
    type = 'default',
    shape = 'circle',
    visibilityHeight = 400,
    icon,
    target,
    onClick,
    duration = 450,
    showProgress = false,
    ...restProps
  } = props;

  const mergedIcon = icon ?? contextIcon ?? defaultIcon;

  const [visible, setVisible] = useState<boolean>(visibilityHeight === 0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const internalRef = React.useRef<FloatButtonRef['nativeElement']>(null);

  React.useImperativeHandle(ref, () => ({
    nativeElement: internalRef.current,
  }));

  const getDefaultTarget = (): HTMLElement | Document | Window =>
    internalRef.current?.ownerDocument || window;

  const syncVisibleState = (targetNode: HTMLElement | Window | Document | null) => {
    const scrollTop = getScroll(targetNode);
    setVisible(scrollTop >= visibilityHeight);
  };

  const syncProgressState = (targetNode: HTMLElement | Window | Document | null) => {
    if (showProgress) {
      setScrollProgress(getScrollProgress(targetNode));
    }
  };

  const handleScroll = throttleByAnimationFrame(
    (e: React.UIEvent<HTMLElement, UIEvent> | { target: any }) => {
      syncVisibleState(e.target);
      syncProgressState(e.target);
    },
  );

  useEffect(() => {
    const getTarget = target || getDefaultTarget;
    const container = getTarget();

    syncVisibleState(container);
    syncProgressState(container);
    container?.addEventListener('scroll', handleScroll);
    return () => {
      handleScroll.cancel();
      container?.removeEventListener('scroll', handleScroll);
    };
  }, [showProgress, target, visibilityHeight]);

  useEffect(() => {
    if (!showProgress) {
      return;
    }

    const getTarget = target || getDefaultTarget;
    const handleResize = throttleByAnimationFrame(() => {
      syncProgressState(getTarget());
    });

    window.addEventListener('resize', handleResize);
    return () => {
      handleResize.cancel();
      window.removeEventListener('resize', handleResize);
    };
  }, [showProgress, target]);

  const scrollToTop: React.MouseEventHandler<FloatButtonElement> = (e) => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    scrollTo(0, {
      getContainer: target || getDefaultTarget,
      duration: prefersReducedMotion?.matches ? 0 : duration,
    });
    onClick?.(e);
  };

  const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);

  const prefixCls = getPrefixCls(floatButtonPrefixCls, customizePrefixCls);
  const rootPrefixCls = getPrefixCls();

  const groupShape = useContext(GroupContext)?.shape;

  const mergedShape = groupShape || shape;
  const progressPath = getProgressPath(mergedShape);
  const progressIcon = showProgress ? (
    <span className={`${prefixCls}-progress-holder`}>
      <svg
        aria-hidden="true"
        className={`${prefixCls}-progress`}
        data-shape={mergedShape}
        viewBox="0 0 100 100"
      >
        <path className={`${prefixCls}-progress-trail`} d={progressPath} pathLength="1" />
        <path
          className={`${prefixCls}-progress-path`}
          d={progressPath}
          pathLength="1"
          style={{ strokeDashoffset: `${1 - scrollProgress}` }}
        />
      </svg>
      <span className={`${prefixCls}-progress-icon`}>{mergedIcon}</span>
    </span>
  ) : (
    mergedIcon
  );

  const contentProps: FloatButtonProps = {
    prefixCls,
    icon: progressIcon,
    type,
    shape: mergedShape,
    ...restProps,
  };

  return (
    <CSSMotion visible={visible} motionName={`${rootPrefixCls}-fade`}>
      {({ className: motionClassName }, setRef) => (
        <FloatButton
          ref={composeRef(internalRef, setRef)}
          {...contentProps}
          onClick={scrollToTop}
          className={clsx(className, motionClassName)}
        />
      )}
    </CSSMotion>
  );
});

if (process.env.NODE_ENV !== 'production') {
  BackTop.displayName = 'FloatButton.BackTop';
}

export default BackTop;
