import * as React from 'react';
import Animate from 'rc-animate';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import classNames from 'classnames';
import omit from 'omit.js';
import VerticalAlignTopOutlined from '@ant-design/icons/VerticalAlignTopOutlined';
import { throttleByAnimationFrame } from '../_util/throttleByAnimationFrame';
import { ConfigContext } from '../config-provider';
import getScroll from '../_util/getScroll';
import scrollTo from '../_util/scrollTo';

export interface BackTopProps {
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

const BackTop: React.FC<BackTopProps> = props => {
  const [visible, setVisible] = React.useState(false);

  const ref = React.createRef<HTMLDivElement>();
  const scrollEvent = React.useRef<any>();

  const getDefaultTarget = () => {
    return ref.current && ref.current.ownerDocument ? ref.current.ownerDocument : window;
  };

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
    handleScroll({
      target: container,
    });
  };

  React.useEffect(() => {
    bindScrollEvent();
    return () => {
      if (scrollEvent.current) {
        scrollEvent.current.remove();
      }
      (handleScroll as any).cancel();
    };
  }, [props.target]);

  const getVisible = () => {
    if ('visible' in props) {
      return props.visible;
    }
    return visible;
  };

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

  const renderChildren = ({ prefixCls }: { prefixCls: string }) => {
    const { children } = props;
    const defaultElement = (
      <div className={`${prefixCls}-content`}>
        <div className={`${prefixCls}-icon`}>
          <VerticalAlignTopOutlined />
        </div>
      </div>
    );
    return (
      <Animate component="" transitionName="fade">
        {getVisible() ? <div>{children || defaultElement}</div> : null}
      </Animate>
    );
  };

  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const { prefixCls: customizePrefixCls, className = '' } = props;
  const prefixCls = getPrefixCls('back-top', customizePrefixCls);
  const classString = classNames(
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
    'visible',
  ]);

  return (
    <div {...divProps} className={classString} onClick={scrollToTop} ref={ref}>
      {renderChildren({ prefixCls })}
    </div>
  );
};

BackTop.defaultProps = {
  visibilityHeight: 400,
};

export default React.memo(BackTop);
