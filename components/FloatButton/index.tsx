import VerticalAlignTopOutlined from '@ant-design/icons/VerticalAlignTopOutlined';
import classNames from 'classnames';
import CSSMotion from 'rc-motion';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import omit from 'rc-util/lib/omit';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import getScroll from '../_util/getScroll';
import { cloneElement } from '../_util/reactNode';
import scrollTo from '../_util/scrollTo';
import { throttleByAnimationFrame } from '../_util/throttleByAnimationFrame';
import useStyle from './style';

export interface FloatButtonProps {
  visibilityHeight?: number;
  onClick?: React.MouseEventHandler<HTMLElement>;
  target?: () => HTMLElement | Window | Document;
  prefixCls?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
  visible?: boolean; // Only for test. Don't use it.
}

interface ContentProps {
  prefixCls: string;
  rootPrefixCls: string;
  children?: React.ReactNode;
  visible?: boolean; // Only for test. Don't use it.
}

const FloatButtonContent: React.FC<ContentProps> = props => {
  const { prefixCls, rootPrefixCls, children, visible } = props;
  const defaultElement = (
    <div className={`${prefixCls}-content`}>
      <div className={`${prefixCls}-icon`}>
        <VerticalAlignTopOutlined />
      </div>
    </div>
  );
  return (
    <CSSMotion visible={visible} motionName={`${rootPrefixCls}-fade`}>
      {({ className: motionClassName }) =>
        cloneElement(children || defaultElement, ({ className }) => ({
          className: classNames(motionClassName, className),
        }))
      }
    </CSSMotion>
  );
};

const FloatButton: React.FC<FloatButtonProps> = props => {
  const [visible, setVisible] = useMergedState(false, {
    value: props.visible,
  });

  const ref = React.createRef<HTMLDivElement>();
  const scrollEvent = React.useRef<any>();

  const getDefaultTarget = () =>
    ref.current && ref.current.ownerDocument ? ref.current.ownerDocument : window;

  const handleScroll = throttleByAnimationFrame(
    (e: React.UIEvent<HTMLElement> | { target: any }) => {
      const { visibilityHeight } = props;
      const scrollTop = getScroll(e.target, true);
      setVisible(scrollTop > visibilityHeight!);
    },
  );

  const bindScrollEvent = () => {
    const { target } = props;
    const getTarget = target || getDefaultTarget;
    const container = getTarget();
    scrollEvent.current = addEventListener(container, 'scroll', (e: React.UIEvent<HTMLElement>) => {
      handleScroll(e);
    });
    handleScroll({ target: container });
  };

  React.useEffect(() => {
    bindScrollEvent();
    return () => {
      if (scrollEvent.current) {
        scrollEvent.current.remove();
      }
      handleScroll.cancel();
    };
  }, [props.target]);

  const scrollToTop = (e: React.MouseEvent<HTMLDivElement>) => {
    const { onClick, target, duration = 450 } = props;
    scrollTo(0, {
      getContainer: target || getDefaultTarget,
      duration,
    });
    if (typeof onClick === 'function') {
      onClick(e);
    }
  };

  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const { prefixCls: customizePrefixCls, className = '' } = props;
  const prefixCls = getPrefixCls('back-top', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const classString = classNames(hashId, prefixCls, className, {
    [`${prefixCls}-rtl`]: direction === 'rtl',
  });

  // fix https://fb.me/react-unknown-prop
  const divProps = omit(props, [
    'prefixCls',
    'className',
    'children',
    'visibilityHeight',
    'target',
    'visible',
  ]);

  return wrapSSR(
    <div {...divProps} className={classString} onClick={scrollToTop} ref={ref}>
      <FloatButtonContent prefixCls={prefixCls} rootPrefixCls={rootPrefixCls} visible={visible}>
        {props.children}
      </FloatButtonContent>
    </div>,
  );
};

FloatButton.defaultProps = {
  visibilityHeight: 400,
};

export default React.memo(FloatButton);
