import React, { useContext, useMemo } from 'react';
import VerticalAlignTopOutlined from '@ant-design/icons/VerticalAlignTopOutlined';
import CSSMotion from '@rc-component/motion';
import { composeRef } from '@rc-component/util';
import { clsx } from 'clsx';

import scrollTo from '../_util/scrollTo';
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
import useScroll from './hooks/useScroll';

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
  /**
   * @since 6.6.0
   * @default false
   */
  showProgress?: boolean;
}

const defaultIcon = <VerticalAlignTopOutlined />;

const getProgressPath = (shape: FloatButtonShape) =>
  shape === 'square'
    ? 'M 26 8 H 74 A 18 18 0 0 1 92 26 V 74 A 18 18 0 0 1 74 92 H 26 A 18 18 0 0 1 8 74 V 26 A 18 18 0 0 1 26 8 Z'
    : 'M 50 8 A 42 42 0 1 1 49.999 8';

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

  const internalRef = React.useRef<FloatButtonRef['nativeElement']>(null);

  React.useImperativeHandle(ref, () => ({
    nativeElement: internalRef.current,
  }));

  const getDefaultTarget = React.useCallback((): HTMLElement | Document | Window => {
    return internalRef.current?.ownerDocument || window;
  }, []);

  const getTarget = target || getDefaultTarget;

  const { scrollProgress, visible } = useScroll({ getTarget, showProgress, visibilityHeight });

  const scrollToTop: React.MouseEventHandler<FloatButtonElement> = (e) => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    scrollTo(0, {
      getContainer: getTarget,
      duration: prefersReducedMotion?.matches ? 0 : duration,
    });
    onClick?.(e);
  };

  const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);

  const prefixCls = getPrefixCls(floatButtonPrefixCls, customizePrefixCls);
  const rootPrefixCls = getPrefixCls();

  const groupShape = useContext(GroupContext)?.shape;

  const mergedShape = groupShape || shape;

  const progressIcon = useMemo(() => {
    const progressPath = getProgressPath(mergedShape);
    return (
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
    );
  }, [mergedIcon, mergedShape, prefixCls, scrollProgress]);

  const contentProps: FloatButtonProps = {
    prefixCls,
    icon: showProgress ? progressIcon : mergedIcon,
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
