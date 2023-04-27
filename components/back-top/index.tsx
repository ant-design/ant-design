import VerticalAlignTopOutlined from '@ant-design/icons/VerticalAlignTopOutlined';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import omit from 'rc-util/lib/omit';
import * as React from 'react';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import getScroll from '../_util/getScroll';
import { cloneElement } from '../_util/reactNode';
import scrollTo from '../_util/scrollTo';
import throttleByAnimationFrame from '../_util/throttleByAnimationFrame';
import warning from '../_util/warning';
import useStyle from './style';

export interface BackTopProps {
  visibilityHeight?: number;
  onClick?: React.MouseEventHandler<HTMLElement>;
  target?: () => HTMLElement | Window | Document;
  prefixCls?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
}

const BackTop: React.FC<BackTopProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className = '',
    visibilityHeight = 400,
    target,
    onClick,
    duration = 450,
  } = props;
  const [visible, setVisible] = React.useState<boolean>(visibilityHeight === 0);

  const ref = React.useRef<HTMLDivElement>(null);
  const scrollEvent = React.useRef<ReturnType<typeof addEventListener> | null>(null);

  const getDefaultTarget = (): HTMLElement | Document | Window =>
    ref.current && ref.current.ownerDocument ? ref.current.ownerDocument : window;

  const handleScroll = throttleByAnimationFrame(
    (e: React.UIEvent<HTMLElement, UIEvent> | { target: any }) => {
      const scrollTop = getScroll(e.target, true);
      setVisible(scrollTop >= visibilityHeight);
    },
  );

  const bindScrollEvent = () => {
    const getTarget = target || getDefaultTarget;
    const container = getTarget();
    scrollEvent.current = addEventListener(container, 'scroll', handleScroll);
    handleScroll({ target: container });
  };

  if (process.env.NODE_ENV !== 'production') {
    warning(false, 'BackTop', '`BackTop` is deprecated, please use `FloatButton.BackTop` instead.');
  }

  React.useEffect(() => {
    bindScrollEvent();
    return () => {
      handleScroll.cancel();
      scrollEvent.current?.remove();
    };
  }, [target]);

  const scrollToTop = (e: React.MouseEvent<HTMLDivElement>) => {
    scrollTo(0, { getContainer: target || getDefaultTarget, duration });
    onClick?.(e);
  };

  const { getPrefixCls, direction } = React.useContext<ConfigConsumerProps>(ConfigContext);

  const prefixCls = getPrefixCls('back-top', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const classString = classNames(
    hashId,
    prefixCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );

  // fix https://fb.me/react-unknown-prop
  const divProps = omit(props, [
    'prefixCls',
    'className',
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

  return wrapSSR(
    <div {...divProps} className={classString} onClick={scrollToTop} ref={ref}>
      <CSSMotion visible={visible} motionName={`${rootPrefixCls}-fade`}>
        {({ className: motionClassName }) =>
          cloneElement(props.children || defaultElement, ({ className: cloneCls }) => ({
            className: classNames(motionClassName, cloneCls),
          }))
        }
      </CSSMotion>
    </div>,
  );
};

export default React.memo(BackTop);
