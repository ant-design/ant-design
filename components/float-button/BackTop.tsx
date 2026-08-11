import React, { useContext } from 'react';
import VerticalAlignTopOutlined from '@ant-design/icons/VerticalAlignTopOutlined';
import CSSMotion from '@rc-component/motion';
import { composeRef } from '@rc-component/util';
import { clsx } from 'clsx';

import scrollTo from '../_util/scrollTo';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import { useComponentConfig } from '../config-provider/context';
import { genCssVar } from '../theme/util/genStyleUtils';
import { GroupContext } from './context';
import FloatButton, { floatButtonPrefixCls } from './FloatButton';
import type { FloatButtonElement, FloatButtonProps, FloatButtonRef } from './FloatButton';
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

const BackTop = React.forwardRef<FloatButtonRef, BackTopProps>((props, ref) => {
  const { backTopIcon: contextIcon } = useComponentConfig('floatButton');

  const {
    prefixCls: customizePrefixCls,
    className,
    style,
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
  const [varName] = genCssVar(rootPrefixCls, 'float-btn');

  const groupShape = useContext(GroupContext)?.shape;

  const mergedShape = groupShape || shape;

  const contentProps: FloatButtonProps = {
    prefixCls,
    icon: mergedIcon,
    type,
    shape: mergedShape,
    style: showProgress ? { [varName('progress')]: `${scrollProgress}turn`, ...style } : style,
    ...restProps,
  };

  return (
    <CSSMotion visible={visible} motionName={`${rootPrefixCls}-fade`}>
      {({ className: motionClassName }, setRef) => (
        <FloatButton
          ref={composeRef(internalRef, setRef)}
          {...contentProps}
          onClick={scrollToTop}
          className={clsx(className, motionClassName, {
            [`${prefixCls}-progress`]: showProgress,
          })}
        />
      )}
    </CSSMotion>
  );
});

if (process.env.NODE_ENV !== 'production') {
  BackTop.displayName = 'FloatButton.BackTop';
}

export default BackTop;
