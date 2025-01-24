import * as React from 'react';
import classNames from 'classnames';

import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import useStyle from './style';

export interface DividerProps {
  prefixCls?: string;
  type?: 'horizontal' | 'vertical';
  /**
   * @default center
   */
  orientation?:
    | 'left'
    | 'right'
    | 'center'
    | 'start' // 👈 5.24.0+
    | 'end'; // 👈 5.24.0+
  orientationMargin?: string | number;
  className?: string;
  rootClassName?: string;
  children?: React.ReactNode;
  dashed?: boolean;
  /**
   * @since 5.20.0
   * @default solid
   */
  variant?: 'dashed' | 'dotted' | 'solid';
  style?: React.CSSProperties;
  plain?: boolean;
}

const Divider: React.FC<DividerProps> = (props) => {
  const { getPrefixCls, direction, divider } = React.useContext(ConfigContext);

  const {
    prefixCls: customizePrefixCls,
    type = 'horizontal',
    orientation,
    orientationMargin,
    className,
    rootClassName,
    children,
    dashed,
    variant = 'solid',
    plain,
    style,
    ...restProps
  } = props;
  const prefixCls = getPrefixCls('divider', customizePrefixCls);

  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const hasChildren = !!children;

  const mergedOrientation = React.useMemo<'start' | 'end' | 'center'>(() => {
    if (orientation === 'left') {
      return direction === 'rtl' ? 'end' : 'start';
    }
    if (orientation === 'right') {
      return direction === 'rtl' ? 'start' : 'end';
    }
    return orientation ?? 'center';
  }, [direction, orientation]);

  const hasMarginStart = mergedOrientation === 'start' && orientationMargin != null;

  const hasMarginEnd = mergedOrientation === 'end' && orientationMargin != null;

  const classString = classNames(
    prefixCls,
    divider?.className,
    hashId,
    cssVarCls,
    `${prefixCls}-${type}`,
    {
      [`${prefixCls}-with-text`]: hasChildren,
      [`${prefixCls}-with-text-${mergedOrientation}`]: hasChildren,
      [`${prefixCls}-dashed`]: !!dashed,
      [`${prefixCls}-${variant}`]: variant !== 'solid',
      [`${prefixCls}-plain`]: !!plain,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-no-default-orientation-margin-start`]: hasMarginStart,
      [`${prefixCls}-no-default-orientation-margin-end`]: hasMarginEnd,
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
    marginInlineStart: hasMarginStart ? memoizedOrientationMargin : undefined,
    marginInlineEnd: hasMarginEnd ? memoizedOrientationMargin : undefined,
  };

  // Warning children not work in vertical mode
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Divider');

    warning(
      !children || type !== 'vertical',
      'usage',
      '`children` not working in `vertical` mode.',
    );
  }

  return wrapCSSVar(
    <div
      className={classString}
      style={{ ...divider?.style, ...style }}
      {...restProps}
      role="separator"
    >
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
