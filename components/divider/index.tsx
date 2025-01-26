import * as React from 'react';
import classNames from 'classnames';

import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
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
  /**
   * @since 5.20.0
   * @default solid
   */
  variant?: 'dashed' | 'dotted' | 'solid';
  style?: React.CSSProperties;
  plain?: boolean;
}

const Divider: React.FC<DividerProps> = (props) => {
  const {
    getPrefixCls,
    direction,
    className: dividerClassName,
    style: dividerStyle,
  } = useComponentConfig('divider');

  const {
    prefixCls: customizePrefixCls,
    type = 'horizontal',
    orientation = 'center',
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
  const hasCustomMarginLeft = orientation === 'left' && orientationMargin != null;
  const hasCustomMarginRight = orientation === 'right' && orientationMargin != null;
  const classString = classNames(
    prefixCls,
    dividerClassName,
    hashId,
    cssVarCls,
    `${prefixCls}-${type}`,
    {
      [`${prefixCls}-with-text`]: hasChildren,
      [`${prefixCls}-with-text-${orientation}`]: hasChildren,
      [`${prefixCls}-dashed`]: !!dashed,
      [`${prefixCls}-${variant}`]: variant !== 'solid',
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
      style={{ ...dividerStyle, ...style }}
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
