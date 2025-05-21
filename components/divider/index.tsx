import * as React from 'react';
import classNames from 'classnames';

import useOrientation from '../_util/hooks/useOrientation';
import type { Orientation } from '../_util/hooks/useOrientation';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import useSize from '../config-provider/hooks/useSize';
import { SizeType } from '../config-provider/SizeContext';
import useStyle from './style';

export type TitlePlacement =
  | 'left'
  | 'right'
  | 'center'
  | 'start' // 👈 5.24.0+
  | 'end'; // 👈 5.24.0+
const titlePlacementList = ['left', 'right', 'center', 'start', 'end'];
export interface DividerProps {
  prefixCls?: string;
  /**  @deprecated please use `orientation`*/
  type?: Orientation;
  orientation?: Orientation;
  vertical?: boolean;
  titlePlacement?: TitlePlacement;
  /** @deprecated please use `titlePlacementMargin` */
  orientationMargin?: string | number;
  titlePlacementMargin?: string | number;
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
  size?: SizeType;
  plain?: boolean;
}

const sizeClassNameMap: Record<string, string> = { small: 'sm', middle: 'md' };
const Divider: React.FC<DividerProps> = (props) => {
  const {
    getPrefixCls,
    direction,
    className: dividerClassName,
    style: dividerStyle,
  } = useComponentConfig('divider');

  const {
    prefixCls: customizePrefixCls,
    type,
    orientation,
    vertical,
    titlePlacement,
    orientationMargin,
    titlePlacementMargin,
    className,
    rootClassName,
    children,
    dashed,
    variant = 'solid',
    plain,
    style,
    size: customSize,
    ...restProps
  } = props;

  const prefixCls = getPrefixCls('divider', customizePrefixCls);

  const [hashId, cssVarCls] = useStyle(prefixCls);

  const sizeFullName = useSize(customSize);
  const sizeCls = sizeClassNameMap[sizeFullName];

  const hasChildren = !!children;

  const validTitlePlacement = titlePlacementList.includes(orientation || '');
  const mergedTitlePlacement = React.useMemo<'start' | 'end' | 'center'>(() => {
    const placement =
      titlePlacement ?? (validTitlePlacement ? (orientation as TitlePlacement) : 'center');
    if (placement === 'left') {
      return direction === 'rtl' ? 'end' : 'start';
    }
    if (placement === 'right') {
      return direction === 'rtl' ? 'start' : 'end';
    }
    return placement;
  }, [direction, orientation]);

  const mergedPlacementMargin = React.useMemo(
    () => titlePlacementMargin ?? orientationMargin,
    [titlePlacementMargin, orientationMargin],
  );
  const hasMarginStart = mergedTitlePlacement === 'start' && mergedPlacementMargin != null;

  const hasMarginEnd = mergedTitlePlacement === 'end' && mergedPlacementMargin != null;

  const [mergedOrientation, mergedVertical] = useOrientation(
    orientation as Orientation,
    vertical,
    type,
  );

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
      [`${prefixCls}-${sizeCls}`]: !!sizeCls,
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

  // =================== Warning =====================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Divider');

    warning(!children || !mergedVertical, 'usage', '`children` not working in `vertical` mode.');
    warning(
      !validTitlePlacement,
      'usage',
      '"orientation" is used for direction, please use titlePlacement replace this',
    );
    warning.deprecated(!type, 'type', 'orientation');
    warning.deprecated(!orientationMargin, 'orientationMargin', 'titlePlacementMargin');
  }

  return (
    <div
      className={classString}
      style={{ ...dividerStyle, ...style }}
      {...restProps}
      role="separator"
    >
      {children && !mergedVertical && (
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
