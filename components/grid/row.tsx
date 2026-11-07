import * as React from 'react';
import { clsx } from 'clsx';

import { isNumber, isPlainObject, isString } from '../_util/is';
import type { Breakpoint, ScreenMap } from '../_util/responsiveObserver';
import { responsiveArray } from '../_util/responsiveObserver';
import { ConfigContext } from '../config-provider';
import useBreakpoint from './hooks/useBreakpoint';
import useGutter from './hooks/useGutter';
import RowContext from './RowContext';
import type { RowContextGutter, RowContextState } from './RowContext';
import { useRowStyle } from './style';

const _RowAligns = ['top', 'middle', 'bottom', 'stretch'] as const;
const _RowJustify = [
  'start',
  'end',
  'center',
  'space-around',
  'space-between',
  'space-evenly',
] as const;

type ResponsiveLike<T> = {
  [key in Breakpoint]?: T;
};

export type Gutter = number | string | undefined | Partial<Record<Breakpoint, number>>;

type ResponsiveAligns = ResponsiveLike<(typeof _RowAligns)[number]>;

type ResponsiveJustify = ResponsiveLike<(typeof _RowJustify)[number]>;

export type ColumnsType = number | string | Partial<Record<Breakpoint, number | string>>;

export type AreasType = string[][] | string;

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  grid?: boolean;
  columns?: ColumnsType;
  rows?: number | string;
  areas?: AreasType;
  gutter?: Gutter | [Gutter, Gutter];
  align?: (typeof _RowAligns)[number] | ResponsiveAligns;
  justify?: (typeof _RowJustify)[number] | ResponsiveJustify;
  prefixCls?: string;
  wrap?: boolean;
}

const getMergedPropByScreen = (
  oriProp: RowProps['align'] | RowProps['justify'],
  screen: ScreenMap | null,
) => {
  if (isString(oriProp)) {
    return oriProp;
  }

  if (isPlainObject(oriProp)) {
    for (let i = 0; i < responsiveArray.length; i++) {
      const breakpoint: Breakpoint = responsiveArray[i];
      if (!screen || !screen[breakpoint]) {
        continue;
      }
      const curVal = oriProp[breakpoint];
      if (curVal !== undefined) {
        return curVal;
      }
    }
  }

  return '';
};

const DEFAULT_GRID_COLUMNS = 24;

const toGridTemplate = (value: number | string) =>
  isNumber(value) ? `repeat(${value}, 1fr)` : value;

const getGridTemplateColumns = (columns: ColumnsType | undefined, screen: ScreenMap | null) => {
  if (columns === undefined) {
    return toGridTemplate(DEFAULT_GRID_COLUMNS);
  }
  if (isString(columns) || isNumber(columns)) {
    return toGridTemplate(columns);
  }
  if (columns) {
    for (let i = 0; i < responsiveArray.length; i++) {
      const breakpoint: Breakpoint = responsiveArray[i];
      if (screen?.[breakpoint]) {
        const curVal = columns[breakpoint];
        if (curVal !== undefined) {
          return toGridTemplate(curVal);
        }
      }
    }
    return toGridTemplate(DEFAULT_GRID_COLUMNS);
  }
  return undefined;
};

const getGridTemplateRows = (rows: number | string | undefined) =>
  rows === undefined ? undefined : toGridTemplate(rows);

const normalizeAreas = (areas: AreasType | undefined): string | undefined => {
  if (areas === undefined) {
    return undefined;
  }
  if (isString(areas)) {
    return areas;
  }
  if (Array.isArray(areas) && areas.length) {
    return areas.map((row) => (Array.isArray(row) ? `"${row.join(' ')}"` : String(row))).join(' ');
  }
  return undefined;
};

export const getGapStyle = (
  value: number | string | undefined,
  divisor: number = 1,
): string | undefined => {
  if (value === undefined) {
    return undefined;
  }
  if (isNumber(value)) {
    return divisor === 1 ? `${value}px` : `${value / divisor}px`;
  }
  return divisor === 1 ? value : `calc(${value} / ${divisor})`;
};

const Row = React.forwardRef<HTMLDivElement, RowProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    grid = false,
    justify,
    align,
    className,
    style,
    children,
    gutter = 0,
    wrap,
    columns,
    rows,
    areas,
    ...others
  } = props;

  const { getPrefixCls, direction } = React.useContext(ConfigContext);

  const screens = useBreakpoint(true, null);

  const mergedAlign = getMergedPropByScreen(align, screens);
  const mergedJustify = getMergedPropByScreen(justify, screens);

  const prefixCls = getPrefixCls('row', customizePrefixCls);

  const [hashId, cssVarCls] = useRowStyle(prefixCls);

  const gutters = useGutter(gutter, screens);

  const classes = clsx(
    prefixCls,
    !grid && {
      [`${prefixCls}-no-wrap`]: wrap === false,
      [`${prefixCls}-${mergedJustify}`]: mergedJustify,
      [`${prefixCls}-${mergedAlign}`]: mergedAlign,
    },
    {
      [`${prefixCls}-grid`]: grid,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
    hashId,
    cssVarCls,
  );

  const rowStyle: React.CSSProperties = {};
  const [gutterH, gutterV] = gutters;

  if (grid) {
    const gridStyles: React.CSSProperties = {
      columnGap: getGapStyle(gutterH),
      rowGap: getGapStyle(gutterV),
      gridTemplateColumns: getGridTemplateColumns(columns, screens),
      gridTemplateRows: getGridTemplateRows(rows),
      gridTemplateAreas: normalizeAreas(areas),
    };
    Object.assign(rowStyle, gridStyles);
  } else {
    if (gutterH) {
      rowStyle.marginInline = getGapStyle(gutterH, -2);
    }
    rowStyle.rowGap = gutterV;
  }

  const rowContext = React.useMemo<RowContextState>(
    () => ({ gutter: [gutterH, gutterV] as RowContextGutter, wrap, grid }),
    [gutterH, gutterV, wrap, grid],
  );

  return (
    <RowContext.Provider value={rowContext}>
      <div {...others} className={classes} style={{ ...rowStyle, ...style }} ref={ref}>
        {children}
      </div>
    </RowContext.Provider>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Row.displayName = 'Row';
}

export default Row;
