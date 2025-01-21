import React, { useContext, useEffect, useState } from 'react';
import VerticalAlignTopOutlined from '@ant-design/icons/VerticalAlignTopOutlined';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import { composeRef } from 'rc-util/lib/ref';

import getScroll from '../_util/getScroll';
import scrollTo from '../_util/scrollTo';
import throttleByAnimationFrame from '../_util/throttleByAnimationFrame';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import FloatButtonGroupContext from './context';
import FloatButton, { floatButtonPrefixCls } from './FloatButton';
import type {
  BackTopProps,
  FloatButtonElement,
  FloatButtonProps,
  FloatButtonRef,
  FloatButtonShape,
} from './interface';

const BackTop = React.forwardRef<FloatButtonRef, BackTopProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    type = 'default',
    shape = 'circle',
    visibilityHeight = 400,
    icon = <VerticalAlignTopOutlined />,
    target,
    onClick,
    duration = 450,
    ...restProps
  } = props;

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

  const groupShape = useContext<FloatButtonShape | undefined>(FloatButtonGroupContext);

  const mergedShape = groupShape || shape;

  const contentProps: FloatButtonProps = {
    prefixCls,
    icon,
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
          className={classNames(className, motionClassName)}
        />
      )}
    </CSSMotion>
  );
});

if (process.env.NODE_ENV !== 'production') {
  BackTop.displayName = 'BackTop';
}

export default BackTop;
