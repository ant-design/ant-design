import VerticalAlignTopOutlined from '@ant-design/icons/VerticalAlignTopOutlined';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import React, { memo, useContext, useEffect, useRef } from 'react';
import FloatButton, { floatButtonPrefixCls } from './FloatButton';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import getScroll from '../_util/getScroll';
import scrollTo from '../_util/scrollTo';
import throttleByAnimationFrame from '../_util/throttleByAnimationFrame';
import FloatButtonGroupContext from './context';
import type { BackTopProps, FloatButtonShape } from './interface';
import useStyle from './style';

const BackTop: React.FC<BackTopProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className = '',
    type = 'default',
    shape = 'circle',
    visibilityHeight = 400,
    icon = <VerticalAlignTopOutlined />,
    target,
    onClick,
    duration = 450,
    ...restProps
  } = props;

  const [visible, setVisible] = useMergedState(false, { value: props.visible });

  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const scrollEvent = useRef<any>(null);

  const getDefaultTarget = (): HTMLElement | Document | Window =>
    ref.current && ref.current.ownerDocument ? ref.current.ownerDocument : window;

  const handleScroll = throttleByAnimationFrame(
    (e: React.UIEvent<HTMLElement> | { target: any }) => {
      const scrollTop = getScroll(e.target, true);
      setVisible(scrollTop > visibilityHeight!);
    },
  );

  const bindScrollEvent = () => {
    const getTarget = target || getDefaultTarget;
    const container = getTarget();
    scrollEvent.current = addEventListener(container, 'scroll', (e: React.UIEvent<HTMLElement>) => {
      handleScroll(e);
    });
    handleScroll({ target: container });
  };

  useEffect(() => {
    bindScrollEvent();
    return () => {
      if (scrollEvent.current) {
        scrollEvent.current.remove();
      }
      handleScroll.cancel();
    };
  }, [target]);

  const scrollToTop: React.MouseEventHandler<HTMLDivElement> = (e) => {
    scrollTo(0, { getContainer: target || getDefaultTarget, duration });
    if (typeof onClick === 'function') {
      onClick(e);
    }
  };

  const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);

  const prefixCls = getPrefixCls(floatButtonPrefixCls, customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const [wrapSSR] = useStyle(prefixCls);

  const groupShape = useContext<FloatButtonShape | undefined>(FloatButtonGroupContext);

  const mergeShape = groupShape || shape;

  const contentProps = { prefixCls, icon, type, shape: mergeShape, ...restProps };

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

export default memo(BackTop);
