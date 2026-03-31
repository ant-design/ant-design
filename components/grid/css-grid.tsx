import * as React from 'react';
import { clsx } from 'clsx';

import { isPresetSize } from '../_util/gapSize';
import isNonNullable from '../_util/isNonNullable';
import type { LiteralUnion } from '../_util/type';
import { ConfigContext } from '../config-provider';
import type { ConfigConsumerProps } from '../config-provider';
import type { SizeType } from '../config-provider/SizeContext';
import { useGridStyle } from './style';
import createCSSGridClassNames from './utils';

export interface CSSGridProps extends React.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string;
  rootClassName?: string;

  // Semantic classNames and styles
  classNames?: {
    root?: string;
  };
  styles?: {
    root?: React.CSSProperties;
  };

  // CSS Grid core properties
  /**
   * @desc 列模板
   * @descEN Sets the column template
   */
  templateColumns?: React.CSSProperties['gridTemplateColumns'];
  /**
   * @desc 行模板
   * @descEN Sets the row template
   */
  templateRows?: React.CSSProperties['gridTemplateRows'];
  /**
   * @desc 区域模板
   * @descEN Sets the area template
   */
  templateAreas?: React.CSSProperties['gridTemplateAreas'];

  // Alignment
  /**
   * @desc 水平对齐（单元格）
   * @descEN Aligns items horizontally (justify items)
   */
  justifyItems?: React.CSSProperties['justifyItems'];
  /**
   * @desc 垂直对齐（单元格）
   * @descEN Aligns items vertically (align items)
   */
  alignItems?: React.CSSProperties['alignItems'];
  /**
   * @desc 水平对齐（整体）
   * @descEN Aligns entire grid horizontally (justify content)
   */
  justifyContent?: React.CSSProperties['justifyContent'];
  /**
   * @desc 垂直对齐（整体）
   * @descEN Aligns entire grid vertically (align content)
   */
  alignContent?: React.CSSProperties['alignContent'];

  // Gap
  /**
   * @desc 间距
   * @descEN Gap between grid items
   */
  gap?: LiteralUnion<SizeType, React.CSSProperties['gap']>;
  /**
   * @desc 行间距
   * @descEN Gap between rows
   */
  rowGap?: LiteralUnion<SizeType, React.CSSProperties['rowGap']>;
  /**
   * @desc 列间距
   * @descEN Gap between columns
   */
  columnGap?: LiteralUnion<SizeType, React.CSSProperties['columnGap']>;

  // Auto flow
  /**
   * @desc 自动流动
   * @descEN Controls how auto-placed items flow
   */
  autoFlow?: React.CSSProperties['gridAutoFlow'];
}

const CSSGrid = React.forwardRef<HTMLDivElement, React.PropsWithChildren<CSSGridProps>>(
  (props, ref) => {
    const {
      prefixCls: customizePrefixCls,
      rootClassName,
      className,
      style,
      children,
      classNames,
      styles,
      templateColumns,
      templateRows,
      templateAreas,
      justifyItems,
      alignItems,
      justifyContent,
      alignContent,
      gap,
      rowGap,
      columnGap,
      autoFlow,
      ...others
    } = props;

    const { getPrefixCls, direction } = React.useContext<ConfigConsumerProps>(ConfigContext);

    const prefixCls = getPrefixCls('css-grid', customizePrefixCls);

    const [hashId, cssVarCls] = useGridStyle(prefixCls);

    // Generate class names for preset gap values
    const gapClassName = isPresetSize(gap) ? `${prefixCls}-gap-${gap}` : undefined;
    const rowGapClassName = isPresetSize(rowGap) ? `${prefixCls}-row-gap-${rowGap}` : undefined;
    const columnGapClassName = isPresetSize(columnGap)
      ? `${prefixCls}-column-gap-${columnGap}`
      : undefined;

    // Generate class names for alignment props
    const alignmentClassName = createCSSGridClassNames(prefixCls, props);

    const mergedCls = clsx(
      prefixCls,
      className,
      rootClassName,
      classNames?.root,
      hashId,
      cssVarCls,
      gapClassName,
      rowGapClassName,
      columnGapClassName,
      alignmentClassName,
      {
        [`${prefixCls}-rtl`]: direction === 'rtl',
      },
    );

    // Style merge order: user style has highest priority
    const mergedStyle: React.CSSProperties = {
      ...styles?.root,
      ...style,
    };

    // Grid template properties (dynamic values - must use inline style)
    if (isNonNullable(templateColumns)) {
      mergedStyle.gridTemplateColumns = templateColumns;
    }
    if (isNonNullable(templateRows)) {
      mergedStyle.gridTemplateRows = templateRows;
    }
    if (isNonNullable(templateAreas)) {
      mergedStyle.gridTemplateAreas = templateAreas;
    }
    if (isNonNullable(autoFlow)) {
      mergedStyle.gridAutoFlow = autoFlow;
    }

    // Gap: preset values use class, dynamic values use inline style
    if (gap && !isPresetSize(gap)) {
      mergedStyle.gap = gap;
    }
    if (rowGap && !isPresetSize(rowGap)) {
      mergedStyle.rowGap = rowGap;
    }
    if (columnGap && !isPresetSize(columnGap)) {
      mergedStyle.columnGap = columnGap;
    }

    return (
      <div ref={ref} {...others} className={mergedCls} style={mergedStyle}>
        {children}
      </div>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  CSSGrid.displayName = 'CSSGrid';
}

export default CSSGrid;
