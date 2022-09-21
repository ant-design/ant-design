import VerticalAlignTopOutlined from '@ant-design/icons/VerticalAlignTopOutlined';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import omit from 'rc-util/lib/omit';
import React, { memo, useContext, useEffect, useMemo, useRef } from 'react';
import { floatButtonPrefixCls } from '.';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import getScroll from '../_util/getScroll';
import scrollTo from '../_util/scrollTo';
import { throttleByAnimationFrame } from '../_util/throttleByAnimationFrame';
import FloatButtonGroupContext from './context';
import FloatButtonContent from './FloatButtonContent';
import type { BackTopProps, FloatButtonContentProps, FloatButtonShape } from './interface';
import useStyle from './style';

const BackTop: React.FC<BackTopProps> = props => {
  const {
    prefixCls: customizePrefixCls,
    className = '',
    type = 'default',
    shape = 'circle',
    visibilityHeight = 400,
    icon = <VerticalAlignTopOutlined />,
    description,
    target,
    onClick,
    duration = 450,
  } = props;

  const [visible, setVisible] = useMergedState(false, { value: props.visible });

  const ref = useRef<HTMLDivElement>(null);

  const scrollEvent = useRef<any>(null);

  const getDefaultTarget = (): HTMLElement | Document | Window => {
    if (ref.current && ref.current.ownerDocument) {
      return ref.current.ownerDocument;
    }
    return window;
  };

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

  const scrollToTop: React.MouseEventHandler<HTMLDivElement> = e => {
    scrollTo(0, { getContainer: target || getDefaultTarget, duration });
    if (typeof onClick === 'function') {
      onClick(e);
    }
  };

  const { getPrefixCls, direction } = useContext<ConfigConsumerProps>(ConfigContext);

  const prefixCls = getPrefixCls(floatButtonPrefixCls, customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const groupShape = useContext<FloatButtonShape | null>(FloatButtonGroupContext);

  const mergeShape = groupShape || shape;

  const classString = classNames(
    hashId,
    prefixCls,
    className,
    `${prefixCls}-${type}`,
    `${prefixCls}-${mergeShape}`,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
  );

  const divProps = omit(props, [
    'prefixCls',
    'className',
    'children',
    'visibilityHeight',
    'target',
    'visible',
  ]);

  const contentProps = useMemo<FloatButtonContentProps>(
    () => ({ prefixCls, description, icon, type }),
    [prefixCls, description, icon, type],
  );

  return wrapSSR(
    <div {...divProps} className={classString} onClick={scrollToTop} ref={ref}>
      <CSSMotion visible={visible} motionName={`${rootPrefixCls}-fade`}>
        {({ className: motionClassName }) => (
          <div className={`${prefixCls}-body`}>
            <FloatButtonContent className={motionClassName} {...contentProps} />
          </div>
        )}
      </CSSMotion>
    </div>,
  );
};

BackTop.defaultProps = {
  visibilityHeight: 400,
};

export default memo(BackTop);
