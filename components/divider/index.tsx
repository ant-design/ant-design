import * as React from 'react';
import { clsx } from 'clsx';

import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks/useMergeSemantic';
import useOrientation from '../_util/hooks/useOrientation';
import type { Orientation } from '../_util/hooks/useOrientation';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import useSize from '../config-provider/hooks/useSize';
import type { SizeType } from '../config-provider/SizeContext';
import useStyle from './style';

type SemanticName = 'root' | 'rail' | 'content';

export type TitlePlacement =
  | 'left'
  | 'right'
  | 'center'
  | 'start' // 👈 5.24.0+
  | 'end'; // 👈 5.24.0+

const titlePlacementList = ['left', 'right', 'center', 'start', 'end'];

export type DividerClassNamesType = SemanticClassNamesType<DividerProps, SemanticName>;
export type DividerStylesType = SemanticStylesType<DividerProps, SemanticName>;

export interface DividerProps {
  prefixCls?: string;
  /**  @deprecated please use `orientation`*/
  type?: Orientation;
  orientation?: Orientation;
  vertical?: boolean;
  titlePlacement?: TitlePlacement;
  /** @deprecated please use `styles.content.margin` */
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
  size?: SizeType;
  plain?: boolean;
  classNames?: DividerClassNamesType;
  styles?: DividerStylesType;
}

const sizeClassNameMap: Record<string, string> = { small: 'sm', middle: 'md' };

const Divider: React.FC<DividerProps> = (props) => {
  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('divider');

  const {
    prefixCls: customizePrefixCls,
    type,
    orientation,
    vertical,
    titlePlacement,
    orientationMargin,
    className,
    rootClassName,
    children,
    dashed,
    variant = 'solid',
    plain,
    style,
    size: customSize,
    classNames,
    styles,
    ...restProps
  } = props;

  const prefixCls = getPrefixCls('divider', customizePrefixCls);
  const railCls = `${prefixCls}-rail`;

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
  }, [direction, orientation, titlePlacement]);

  const hasMarginStart = mergedTitlePlacement === 'start' && orientationMargin != null;

  const hasMarginEnd = mergedTitlePlacement === 'end' && orientationMargin != null;

  const [mergedOrientation, mergedVertical] = useOrientation(orientation, vertical, type);

  // ========================= Semantic =========================
  const mergedProps: DividerProps = {
    ...props,
    orientation: mergedOrientation,
    titlePlacement: mergedTitlePlacement,
    size: sizeFullName,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    DividerClassNamesType,
    DividerStylesType,
    DividerProps
  >([contextClassNames, classNames], [contextStyles, styles], undefined, { props: mergedProps });

  const classString = clsx(
    prefixCls,
    contextClassName,
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
      [railCls]: !children,
      [mergedClassNames.rail as string]: mergedClassNames.rail && !children,
    },
    className,
    rootClassName,
    mergedClassNames.root,
  );

  const memoizedPlacementMargin = React.useMemo<string | number>(() => {
    if (typeof orientationMargin === 'number') {
      return orientationMargin;
    }
    if (/^\d+$/.test(orientationMargin!)) {
      return Number(orientationMargin);
    }
    return orientationMargin!;
  }, [orientationMargin]);

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
      '`orientation` is used for direction, please use `titlePlacement` replace this',
    );
    [
      ['type', 'orientation'],
      ['orientationMargin', 'styles.content.margin'],
    ].forEach(([deprecatedName, newName]) => {
      warning.deprecated(!(deprecatedName in props), deprecatedName, newName);
    });
  }

  return (
    <div
      className={classString}
      style={{
        ...contextStyle,
        ...mergedStyles.root,
        ...(children ? {} : mergedStyles.rail),
        ...style,
      }}
      {...restProps}
      role="separator"
    >
      {children && !mergedVertical && (
        <>
          <div
            className={clsx(railCls, `${railCls}-start`, mergedClassNames.rail)}
            style={mergedStyles.rail}
          />
          <span
            className={clsx(`${prefixCls}-inner-text`, mergedClassNames.content)}
            style={{ ...innerStyle, ...mergedStyles.content }}
          >
            {children}
          </span>
          <div
            className={clsx(railCls, `${railCls}-end`, mergedClassNames.rail)}
            style={mergedStyles.rail}
          />
        </>
      )}
    </div>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Divider.displayName = 'Divider';
}

export default Divider;
