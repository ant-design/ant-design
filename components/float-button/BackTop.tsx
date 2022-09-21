import VerticalAlignTopOutlined from '@ant-design/icons/VerticalAlignTopOutlined';
import classNames from 'classnames';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import omit from 'rc-util/lib/omit';
import * as React from 'react';
import { floatButtonPrefixCls } from '.';
import { ConfigContext } from '../config-provider';
import getScroll from '../_util/getScroll';
import scrollTo from '../_util/scrollTo';
import { throttleByAnimationFrame } from '../_util/throttleByAnimationFrame';
import FloatButtonGroupContext from './context';
import type { BackTopProps, FloatButtonShape } from './interface';
import useStyle from './style';

const BackTop: React.FC<BackTopProps> = props => {
  const {
    prefixCls: customizePrefixCls,
    className = '',
    type = 'default',
    shape = 'circle',
    visibilityHeight,
    target,
    onClick,
    duration = 450,
  } = props;

  const [, setVisible] = useMergedState(false, { value: props.visible });

  const ref = React.createRef<HTMLDivElement>();

  const scrollEvent = React.useRef<any>();

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

  React.useEffect(() => {
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

  const { getPrefixCls, direction } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls(floatButtonPrefixCls, customizePrefixCls);

  const [wrapSSR, hashId] = useStyle(prefixCls);

  const groupShape = React.useContext<FloatButtonShape | null>(FloatButtonGroupContext);

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

  const defaultElement = (
    <div className={`${prefixCls}-content`}>
      <div className={`${prefixCls}-icon ${prefixCls}-${type}-icon`}>
        <VerticalAlignTopOutlined />
      </div>
    </div>
  );

  return wrapSSR(
    <div {...divProps} className={classString} onClick={scrollToTop} ref={ref}>
      <div className={`${prefixCls}-body`}>
        <div className={`${prefixCls}-content`}>
          {props.icon || props.description ? (
            <>
              {props.icon && (
                <div className={`${prefixCls}-icon ${prefixCls}-${type}-icon`}>{props.icon}</div>
              )}
              {props.description && <div>{props.description}</div>}
            </>
          ) : (
            defaultElement
          )}
        </div>
      </div>
    </div>,
  );
};

BackTop.defaultProps = {
  visibilityHeight: 400,
};

export default React.memo(BackTop);
