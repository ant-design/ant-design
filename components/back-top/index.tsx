import React from 'react';
import VerticalAlignTopOutlined from '@ant-design/icons/VerticalAlignTopOutlined';
import CSSMotion from '@rc-component/motion';
import omit from '@rc-component/util/lib/omit';
import { clsx } from 'clsx';

import getScroll from '../_util/getScroll';
import { cloneElement } from '../_util/reactNode';
import scrollTo from '../_util/scrollTo';
import throttleByAnimationFrame from '../_util/throttleByAnimationFrame';
import { devUseWarning } from '../_util/warning';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import useStyle from './style';

export interface BackTopProps {
  visibilityHeight?: number;
  onClick?: React.MouseEventHandler<HTMLElement>;
  target?: () => HTMLElement | Window | Document;
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  style?: React.CSSProperties;
  duration?: number;
}

/**
 * @deprecated Please use `FloatButton.BackTop` instead.
 */
const BackTop: React.FC<React.PropsWithChildren<BackTopProps>> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    visibilityHeight = 400,
    target,
    onClick,
    duration = 450,
    children,
  } = props;

  const [visible, setVisible] = React.useState<boolean>(visibilityHeight === 0);

  const ref = React.useRef<HTMLDivElement>(null);

  const getDefaultTarget = () => ref.current?.ownerDocument || window;

  const handleScroll = throttleByAnimationFrame(
    (e: React.UIEvent<HTMLElement, UIEvent> | { target: any }) => {
      const scrollTop = getScroll(e.target);
      setVisible(scrollTop >= visibilityHeight);
    },
  );

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('BackTop');
    warning.deprecated(false, 'BackTop', 'FloatButton.BackTop');
  }

  React.useEffect(() => {
    const getTarget = target || getDefaultTarget;
    const container = getTarget();
    handleScroll({ target: container });
    container?.addEventListener('scroll', handleScroll);
    return () => {
      handleScroll.cancel();
      container?.removeEventListener('scroll', handleScroll);
    };
  }, [target]);

  const scrollToTop = (e: React.MouseEvent<HTMLDivElement>) => {
    scrollTo(0, { getContainer: target || getDefaultTarget, duration });
    onClick?.(e);
  };

  const { getPrefixCls, direction } = React.useContext<ConfigConsumerProps>(ConfigContext);

  const prefixCls = getPrefixCls('back-top', customizePrefixCls);

  const rootPrefixCls = getPrefixCls();

  const rootCls = useCSSVarCls(prefixCls);

  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const classString = clsx(
    hashId,
    cssVarCls,
    prefixCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
    rootClassName,
  );

  // fix https://fb.me/react-unknown-prop
  const divProps = omit(props, [
    'prefixCls',
    'className',
    'rootClassName',
    'children',
    'visibilityHeight',
    'target',
  ]);

  const defaultElement = (
    <div className={`${prefixCls}-content`}>
      <div className={`${prefixCls}-icon`}>
        <VerticalAlignTopOutlined />
      </div>
    </div>
  );

  return (
    <div {...divProps} className={classString} onClick={scrollToTop} ref={ref}>
      <CSSMotion visible={visible} motionName={`${rootPrefixCls}-fade`}>
        {({ className: motionClassName }) =>
          cloneElement(children || defaultElement, ({ className: cloneCls }) => ({
            className: clsx(motionClassName, cloneCls),
          }))
        }
      </CSSMotion>
    </div>
  );
};

if (process.env.NODE_ENV !== 'production') {
  BackTop.displayName = 'Deprecated.BackTop';
}

export default BackTop;
