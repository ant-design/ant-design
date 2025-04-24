import * as React from 'react';
import classNames from 'classnames';

import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import useStyle from './style';

type Orientation = 'horizontal' | 'vertical';
type TitlePlacement =
  | 'left'
  | 'right'
  | 'center'
  | 'start' // 👈 5.24.0+
  | 'end';
const titlePlacementList = [
  'left',
  'right',
  'center',
  'start', // 👈 5.24.0+
  'end',
];
export interface DividerProps {
  prefixCls?: string;
  /**
   * @deprecated please use orientation
   * @default horizontal
   */
  type?: Orientation;
  /**
   * @default horizontal
   * @since 6.x
   */
  orientation?: Orientation | TitlePlacement;
  vertical?: boolean;
  titlePlacement?: TitlePlacement;
  /** @deprecated please use placementMargin */
  orientationMargin?: string | number;
  placementMargin?: string | number;
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
    orientation,
    vertical,
    titlePlacement,
    orientationMargin,
    placementMargin,
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

  const [hashId, cssVarCls] = useStyle(prefixCls);

  const hasChildren = !!children;

  const mergedTitlePlacement = React.useMemo<'start' | 'end' | 'center'>(() => {
    const isOld = titlePlacementList.includes(orientation || '');
    const placement = titlePlacement ?? (isOld ? (orientation as TitlePlacement) : 'center');
    if (placement === 'left') {
      return direction === 'rtl' ? 'end' : 'start';
    }
    if (placement === 'right') {
      return direction === 'rtl' ? 'start' : 'end';
    }
    return placement;
  }, [direction, orientation]);

  const mergedPlacementMargin = React.useMemo(
    () => placementMargin ?? orientationMargin,
    [placementMargin, orientationMargin],
  );
  const hasMarginStart = mergedTitlePlacement === 'start' && mergedPlacementMargin != null;

  const hasMarginEnd = mergedTitlePlacement === 'end' && mergedPlacementMargin != null;

  const mergedOrientation = React.useMemo(() => {
    const haveOrientation = ['horizontal', 'vertical'].includes(orientation || '');
    if (haveOrientation) {
      return orientation;
    }
    if (vertical) {
      return 'vertical';
    }
    return type ?? 'horizontal';
  }, [orientation, type, vertical]);

  const classString = classNames(
    prefixCls,
    dividerClassName,
    hashId,
    cssVarCls,
    `${prefixCls}-${mergedOrientation}`,
    {
      [`${prefixCls}-with-text`]: hasChildren,
      [`${prefixCls}-with-text-${mergedTitlePlacement}`]: hasChildren,
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

  const memoizedPlacementMargin = React.useMemo<string | number>(() => {
    if (typeof mergedPlacementMargin === 'number') {
      return mergedPlacementMargin;
    }
    if (/^\d+$/.test(mergedPlacementMargin!)) {
      return Number(mergedPlacementMargin);
    }
    return mergedPlacementMargin!;
  }, [mergedPlacementMargin]);

  const innerStyle: React.CSSProperties = {
    marginInlineStart: hasMarginStart ? memoizedPlacementMargin : undefined,
    marginInlineEnd: hasMarginEnd ? memoizedPlacementMargin : undefined,
  };

  // Warning children not work in vertical mode
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Divider');

    warning(
      !children || mergedOrientation !== 'vertical',
      'usage',
      '`children` not working in `vertical` mode.',
    );
  }

  return (
    <div
      className={classString}
      style={{ ...dividerStyle, ...style }}
      {...restProps}
      role="separator"
    >
      {children && mergedOrientation !== 'vertical' && (
        <span className={`${prefixCls}-inner-text`} style={innerStyle}>
          {children}
        </span>
      )}
    </div>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Divider.displayName = 'Divider';
}

export default Divider;
