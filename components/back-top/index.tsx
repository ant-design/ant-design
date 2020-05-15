import * as React from 'react';
import Animate from 'rc-animate';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import classNames from 'classnames';
import omit from 'omit.js';
import throttleByAnimationFrame from '../_util/throttleByAnimationFrame';
import { ConfigContext } from '../config-provider';
import getScroll from '../_util/getScroll';
import scrollTo from '../_util/scrollTo';

export interface BackTopProps {
  visibilityHeight?: number;
  onClick?: React.MouseEventHandler<HTMLElement>;
  target?: () => HTMLElement | Window | Document;
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  visible?: boolean; // Only for test. Don't use it.
}

const BackTop: React.FC<BackTopProps> = props => {
  const [visible, setVisible] = React.useState(false);

  let scrollEvent: any;
  let node: HTMLDivElement;

  React.useEffect(() => {
    bindScrollEvent();
    return () => {
      if (scrollEvent) {
        scrollEvent.remove();
      }
      (handleScroll as any).cancel();
    };
  }, [props.target]);

  const bindScrollEvent = () => {
    if (scrollEvent) {
      scrollEvent.remove();
    }
    const { target } = props;
    const getTarget = target || getDefaultTarget;
    const container = getTarget();
    scrollEvent = addEventListener(container, 'scroll', (e: React.UIEvent<HTMLElement>) => {
      handleScroll(e);
    });
    handleScroll({
      target: container,
    });
  };

  const getVisible = () => {
    if ('visible' in props) {
      return props.visible;
    }
    return visible;
  };

  const getDefaultTarget = () => {
    return node && node.ownerDocument ? node.ownerDocument : window;
  };

  const scrollToTop = (e: React.MouseEvent<HTMLDivElement>) => {
    const { onClick, target } = props;
    scrollTo(0, {
      getContainer: target || getDefaultTarget,
    });
    if (typeof onClick === 'function') {
      onClick(e);
    }
  };

  const handleScroll = throttleByAnimationFrame(
    (e: React.UIEvent<HTMLElement> | { target: any }) => {
      const { visibilityHeight = 0 } = props;
      const scrollTop = getScroll(e.target, true);
      setVisible(scrollTop > visibilityHeight);
    },
  );

  const renderChildren = ({ prefixCls }: { prefixCls: string }) => {
    const { children } = props;
    const defaultElement = (
      <div className={`${prefixCls}-content`}>
        <div className={`${prefixCls}-icon`} />
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
  const classString = classNames(prefixCls, className, {
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

  return (
    <div {...divProps} className={classString} onClick={scrollToTop}>
      {renderChildren({ prefixCls })}
    </div>
  );
};

BackTop.defaultProps = {
  visibilityHeight: 400,
};

export default React.memo(BackTop);
