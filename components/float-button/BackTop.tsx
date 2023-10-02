import VerticalAlignTopOutlined from '@ant-design/icons/VerticalAlignTopOutlined';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import FloatButton, { floatButtonPrefixCls } from './FloatButton';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import getScroll from '../_util/getScroll';
import scrollTo from '../_util/scrollTo';
import throttleByAnimationFrame from '../_util/throttleByAnimationFrame';
import FloatButtonGroupContext from './context';
import type { BackTopProps, FloatButtonProps, FloatButtonShape } from './interface';
import useStyle from './style';

const BackTop: React.FC<BackTopProps> = (props) => {
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

  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const getDefaultTarget = (): HTMLElement | Document | Window =>
    ref.current && ref.current.ownerDocument ? ref.current.ownerDocument : window;

  const handleScroll = throttleByAnimationFrame(
    (e: React.UIEvent<HTMLElement, UIEvent> | { target: any }) => {
      const scrollTop = getScroll(e.target, true);
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

  const scrollToTop: React.MouseEventHandler<HTMLDivElement> = (e) => {
    scrollTo(0, { getContainer: target || getDefaultTarget, duration });
    onClick?.(e);
  };

  const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);

  const prefixCls = getPrefixCls(floatButtonPrefixCls, customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const [wrapSSR] = useStyle(prefixCls);

  const groupShape = useContext<FloatButtonShape | undefined>(FloatButtonGroupContext);

  const mergeShape = groupShape || shape;

  const contentProps: FloatButtonProps = { prefixCls, icon, type, shape: mergeShape, ...restProps };

  return wrapSSR(
    <CSSMotion visible={visible} motionName={`${rootPrefixCls}-fade`}>
      {({ className: motionClassName }) => (
        <FloatButton
          ref={ref}
          {...contentProps}
          onClick={scrollToTop}
          className={classNames(className, motionClassName)}
        />
      )}
    </CSSMotion>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  BackTop.displayName = 'BackTop';
}

export default memo(BackTop);
