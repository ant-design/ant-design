import classNames from 'classnames';
import * as React from 'react';
import warning from '../_util/warning';
import { ConfigContext } from '../config-provider';

import useStyle from './style';

export interface DividerProps {
  prefixCls?: string;
  type?: 'horizontal' | 'vertical';
  orientation?: 'left' | 'right' | 'center';
  orientationMargin?: string | number;
  className?: string;
  rootClassName?: string;
  children?: React.ReactNode;
  dashed?: boolean;
  style?: React.CSSProperties;
  plain?: boolean;
}

const Divider: React.FC<DividerProps> = (props) => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);

  const {
    prefixCls: customizePrefixCls,
    type = 'horizontal',
    orientation = 'center',
    orientationMargin,
    className,
    rootClassName,
    children,
    dashed,
    plain,
    ...restProps
  } = props;
  const prefixCls = getPrefixCls('divider', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const orientationPrefix = orientation.length > 0 ? `-${orientation}` : orientation;
  const hasChildren = !!children;
  const hasCustomMarginLeft = orientation === 'left' && orientationMargin != null;
  const hasCustomMarginRight = orientation === 'right' && orientationMargin != null;
  const classString = classNames(
    prefixCls,
    hashId,
    `${prefixCls}-${type}`,
    {
      [`${prefixCls}-with-text`]: hasChildren,
      [`${prefixCls}-with-text${orientationPrefix}`]: hasChildren,
      [`${prefixCls}-dashed`]: !!dashed,
      [`${prefixCls}-plain`]: !!plain,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-no-default-orientation-margin-left`]: hasCustomMarginLeft,
      [`${prefixCls}-no-default-orientation-margin-right`]: hasCustomMarginRight,
    },
    className,
    rootClassName,
  );

  const memoizedOrientationMargin = React.useMemo<string | number>(() => {
    if (typeof orientationMargin === 'number') {
      return orientationMargin;
    }
    if (/^\d+$/.test(orientationMargin!)) {
      return Number(orientationMargin);
    }
    return orientationMargin!;
  }, [orientationMargin]);

  const innerStyle: React.CSSProperties = {
    ...(hasCustomMarginLeft && { marginLeft: memoizedOrientationMargin }),
    ...(hasCustomMarginRight && { marginRight: memoizedOrientationMargin }),
  };

  // Warning children not work in vertical mode
  if (process.env.NODE_ENV !== 'production') {
    warning(
      !children || type !== 'vertical',
      'Divider',
      '`children` not working in `vertical` mode.',
    );
  }

  return wrapSSR(
    <div className={classString} {...restProps} role="separator">
      {children && type !== 'vertical' && (
        <span className={`${prefixCls}-inner-text`} style={innerStyle}>
          {children}
        </span>
      )}
    </div>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Divider.displayName = 'Divider';
}

export default Divider;
