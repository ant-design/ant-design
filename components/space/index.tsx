import * as React from 'react';
import toArray from '@rc-component/util/lib/Children/toArray';
import classNames from 'classnames';

import { isPresetSize, isValidGapNumber } from '../_util/gapSize';
import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks/useMergeSemantic';
import type { Orientation } from '../_util/hooks/useOrientation';
import useOrientation from '../_util/hooks/useOrientation';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import type { SizeType } from '../config-provider/SizeContext';
import Compact from './Compact';
import { SpaceContextProvider } from './context';
import type { SpaceContextType } from './context';
import Item from './Item';
import useStyle from './style';

export { SpaceContext } from './context';

export type SpaceSize = SizeType | number;
type SemanticName = 'root' | 'item' | 'separator';

export type SpaceClassNamesType = SemanticClassNamesType<SpaceProps, SemanticName>;
export type SpaceStylesType = SemanticStylesType<SpaceProps, SemanticName>;

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
    classNames: spaceClassNames,
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
  const mergedProps: SpaceProps = React.useMemo(() => {
    return {
      ...props,
      size,
      orientation: mergedOrientation,
      align: mergedAlign,
    };
  }, [props, size, mergedOrientation, mergedAlign]);

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    SpaceClassNamesType,
    SpaceStylesType,
    SpaceProps
  >([contextClassNames, spaceClassNames], [contextStyles, styles], undefined, {
    props: mergedProps,
  });

  const rootClassNames = classNames(
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

  const itemClassName = classNames(`${prefixCls}-item`, mergedClassNames.item);

  // Calculate latest one
  let latestIndex = 0;
  const nodes = childNodes.map<React.ReactNode>((child, i) => {
    if (child !== null && child !== undefined) {
      latestIndex = i;
    }

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

  const spaceContext = React.useMemo<SpaceContextType>(() => ({ latestIndex }), [latestIndex]);

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
      <SpaceContextProvider value={spaceContext}>{nodes}</SpaceContextProvider>
    </div>
  );
});

type CompoundedComponent = typeof InternalSpace & {
  Compact: typeof Compact;
};

const Space = InternalSpace as CompoundedComponent;

Space.Compact = Compact;

if (process.env.NODE_ENV !== 'production') {
  Space.displayName = 'Space';
}

export default Space;
