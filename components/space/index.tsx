import * as React from 'react';
import { toArray } from '@rc-component/util';
import { clsx } from 'clsx';

import { isPresetSize, isValidGapNumber } from '../_util/gapSize';
import { useMergeSemantic, useOrientation } from '../_util/hooks';
import type { Orientation, SemanticClassNamesType, SemanticStylesType } from '../_util/hooks';
import isNonNullable from '../_util/isNonNullable';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import type { SizeType } from '../config-provider/SizeContext';
import Addon from './Addon';
import Compact from './Compact';
import { SpaceContextProvider } from './context';
import type { SpaceContextType } from './context';
import Item from './Item';
import useStyle from './style';

export { SpaceContext } from './context';

export type SpaceSize = SizeType | number;

export type SpaceSemanticName = keyof SpaceSemanticClassNames & keyof SpaceSemanticStyles;

export type SpaceSemanticClassNames = {
  root?: string;
  item?: string;
  separator?: string;
};

export type SpaceSemanticStyles = {
  root?: React.CSSProperties;
  item?: React.CSSProperties;
  separator?: React.CSSProperties;
};

export type SpaceClassNamesType = SemanticClassNamesType<SpaceProps, SpaceSemanticClassNames>;

export type SpaceStylesType = SemanticStylesType<SpaceProps, SpaceSemanticStyles>;

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  style?: React.CSSProperties;
  size?: SpaceSize | [SpaceSize, SpaceSize];
  /** @deprecated please use `orientation` instead */
  direction?: Orientation;
  vertical?: boolean;
  orientation?: Orientation;
  // No `stretch` since many components do not support that.
  align?: 'start' | 'end' | 'center' | 'baseline';
  /** @deprecated please use `separator` instead */
  split?: React.ReactNode;
  separator?: React.ReactNode;
  wrap?: boolean;
  classNames?: SpaceClassNamesType;
  styles?: SpaceStylesType;
}

const InternalSpace = React.forwardRef<HTMLDivElement, SpaceProps>((props, ref) => {
  const {
    getPrefixCls,
    direction: directionConfig,
    size: contextSize,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('space');

  const {
    size = contextSize ?? 'small',
    align,
    className,
    rootClassName,
    children,
    direction,
    orientation,
    prefixCls: customizePrefixCls,
    split,
    separator,
    style,
    vertical,
    wrap = false,
    classNames,
    styles,
    ...restProps
  } = props;

  const [horizontalSize, verticalSize] = Array.isArray(size) ? size : ([size, size] as const);

  const isPresetVerticalSize = isPresetSize(verticalSize);

  const isPresetHorizontalSize = isPresetSize(horizontalSize);

  const isValidVerticalSize = isValidGapNumber(verticalSize);

  const isValidHorizontalSize = isValidGapNumber(horizontalSize);

  const childNodes = toArray(children, { keepEmpty: true });

  const [mergedOrientation, mergedVertical] = useOrientation(orientation, vertical, direction);

  const mergedAlign = align === undefined && !mergedVertical ? 'center' : align;

  const mergedSeparator = separator ?? split;

  const prefixCls = getPrefixCls('space', customizePrefixCls);

  const [hashId, cssVarCls] = useStyle(prefixCls);

  // =========== Merged Props for Semantic ==========
  const mergedProps: SpaceProps = {
    ...props,
    size,
    orientation: mergedOrientation,
    align: mergedAlign,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    SpaceClassNamesType,
    SpaceStylesType,
    SpaceProps
  >([contextClassNames, classNames], [contextStyles, styles], {
    props: mergedProps,
  });

  const rootClassNames = clsx(
    prefixCls,
    contextClassName,
    hashId,
    `${prefixCls}-${mergedOrientation}`,
    {
      [`${prefixCls}-rtl`]: directionConfig === 'rtl',
      [`${prefixCls}-align-${mergedAlign}`]: mergedAlign,
      [`${prefixCls}-gap-row-${verticalSize}`]: isPresetVerticalSize,
      [`${prefixCls}-gap-col-${horizontalSize}`]: isPresetHorizontalSize,
    },
    className,
    rootClassName,
    cssVarCls,
    mergedClassNames.root,
  );

  const itemClassName = clsx(`${prefixCls}-item`, mergedClassNames.item);

  // Calculate latest one
  const renderedItems = childNodes.map<React.ReactNode>((child, i) => {
    const key = child?.key || `${itemClassName}-${i}`;
    return (
      <Item
        prefix={prefixCls}
        classNames={mergedClassNames}
        styles={mergedStyles}
        className={itemClassName}
        key={key}
        index={i}
        separator={mergedSeparator}
        style={mergedStyles.item}
      >
        {child}
      </Item>
    );
  });

  // ======================== Warning ==========================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Space');
    [
      ['direction', 'orientation'],
      ['split', 'separator'],
    ].forEach(([deprecatedName, newName]) => {
      warning.deprecated(!(deprecatedName in props), deprecatedName, newName);
    });
  }

  const memoizedSpaceContext = React.useMemo<SpaceContextType>(() => {
    const calcLatestIndex = childNodes.reduce<number>(
      (latest, child, i) => (isNonNullable(child) ? i : latest),
      0,
    );
    return { latestIndex: calcLatestIndex };
  }, [childNodes]);

  // =========================== Render ===========================
  if (childNodes.length === 0) {
    return null;
  }

  const gapStyle: React.CSSProperties = {};

  if (wrap) {
    gapStyle.flexWrap = 'wrap';
  }

  if (!isPresetHorizontalSize && isValidHorizontalSize) {
    gapStyle.columnGap = horizontalSize;
  }

  if (!isPresetVerticalSize && isValidVerticalSize) {
    gapStyle.rowGap = verticalSize;
  }

  return (
    <div
      ref={ref}
      className={rootClassNames}
      style={{ ...gapStyle, ...mergedStyles.root, ...contextStyle, ...style }}
      {...restProps}
    >
      <SpaceContextProvider value={memoizedSpaceContext}>{renderedItems}</SpaceContextProvider>
    </div>
  );
});

type CompoundedComponent = typeof InternalSpace & {
  Compact: typeof Compact;
  Addon: typeof Addon;
};

const Space = InternalSpace as CompoundedComponent;

Space.Compact = Compact;
Space.Addon = Addon;

if (process.env.NODE_ENV !== 'production') {
  Space.displayName = 'Space';
}

export default Space;
