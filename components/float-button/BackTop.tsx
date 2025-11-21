import React, { useContext, useEffect, useState } from 'react';
import VerticalAlignTopOutlined from '@ant-design/icons/VerticalAlignTopOutlined';
import CSSMotion from '@rc-component/motion';
import { composeRef } from '@rc-component/util/lib/ref';
import { clsx } from 'clsx';

import getScroll from '../_util/getScroll';
import scrollTo from '../_util/scrollTo';
import throttleByAnimationFrame from '../_util/throttleByAnimationFrame';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import { useComponentConfig } from '../config-provider/context';
import { GroupContext } from './context';
import FloatButton, { floatButtonPrefixCls } from './FloatButton';
import type { FloatButtonElement, FloatButtonProps, FloatButtonRef } from './FloatButton';

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
}

const defaultIcon = <VerticalAlignTopOutlined />;

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
    ...restProps
  } = props;

  const mergedIcon = icon ?? contextIcon ?? defaultIcon;

  const [visible, setVisible] = useState<boolean>(visibilityHeight === 0);

  const internalRef = React.useRef<FloatButtonRef['nativeElement']>(null);

  React.useImperativeHandle(ref, () => ({
    nativeElement: internalRef.current,
  }));

  const getDefaultTarget = (): HTMLElement | Document | Window =>
    internalRef.current?.ownerDocument || window;

  const handleScroll = throttleByAnimationFrame(
    (e: React.UIEvent<HTMLElement, UIEvent> | { target: any }) => {
      const scrollTop = getScroll(e.target);
      setVisible(scrollTop >= visibilityHeight);
    },
  );

  useEffect(() => {
    const getTarget = target || getDefaultTarget;
    const container = getTarget();
    handleScroll({ target: container });
    container?.addEventListener('scroll', handleScroll);
    return () => {
      handleScroll.cancel();
      container?.removeEventListener('scroll', handleScroll);
    };
  }, [target]);

  const scrollToTop: React.MouseEventHandler<FloatButtonElement> = (e) => {
    scrollTo(0, { getContainer: target || getDefaultTarget, duration });
    onClick?.(e);
  };

  const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);

  const prefixCls = getPrefixCls(floatButtonPrefixCls, customizePrefixCls);
  const rootPrefixCls = getPrefixCls();

  const groupShape = useContext(GroupContext)?.shape;

  const mergedShape = groupShape || shape;

  const contentProps: FloatButtonProps = {
    prefixCls,
    icon: mergedIcon,
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
