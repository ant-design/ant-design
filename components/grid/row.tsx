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

export interface GridConfig {
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridTemplateAreas?: string;
}

export interface GridItemConfig {
  gridColumn?: string | number;
  gridRow?: string | number;
  gridArea?: string;
}

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  grid?: boolean | GridConfig;
  gutter?: Gutter | [Gutter, Gutter];
  align?: (typeof _RowAligns)[number] | ResponsiveAligns;
  justify?: (typeof _RowJustify)[number] | ResponsiveJustify;
  prefixCls?: string;
  wrap?: boolean;
}

const useMergedPropByScreen = (
  oriProp: RowProps['align'] | RowProps['justify'],
  screen: ScreenMap | null,
) => {
  const [prop, setProp] = React.useState(() => (isString(oriProp) ? oriProp : ''));

  const calcMergedAlignOrJustify = () => {
    if (isString(oriProp)) {
      setProp(oriProp);
    }
    if (!isPlainObject(oriProp)) {
      return;
    }
    for (let i = 0; i < responsiveArray.length; i++) {
      const breakpoint: Breakpoint = responsiveArray[i];
      // if do not match, do nothing
      if (!screen || !screen[breakpoint]) {
        continue;
      }
      const curVal = oriProp[breakpoint];
      if (curVal !== undefined) {
        setProp(curVal);
        return;
      }
    }
  };

  React.useEffect(() => {
    calcMergedAlignOrJustify();
  }, [JSON.stringify(oriProp), screen]);

  return prop;
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
    ...others
  } = props;

  const { getPrefixCls, direction } = React.useContext(ConfigContext);

  const screens = useBreakpoint(true, null);

  const mergedAlign = useMergedPropByScreen(align, screens);
  const mergedJustify = useMergedPropByScreen(justify, screens);

  const prefixCls = getPrefixCls('row', customizePrefixCls);

  const [hashId, cssVarCls] = useRowStyle(prefixCls);

  const gutters = useGutter(gutter, screens);

  const isGrid = !!grid;
  const gridConfig = isPlainObject(grid) ? grid : undefined;

  const classes = clsx(
    prefixCls,
    !isGrid && {
      [`${prefixCls}-no-wrap`]: wrap === false,
      [`${prefixCls}-${mergedJustify}`]: mergedJustify,
      [`${prefixCls}-${mergedAlign}`]: mergedAlign,
    },
    {
      [`${prefixCls}-grid`]: isGrid,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
    hashId,
    cssVarCls,
  );

  const rowStyle: React.CSSProperties = {};
  const [gutterH, gutterV] = gutters;

  if (isGrid) {
    const gridStyles = {
      columnGap: gutterH !== undefined ? (isNumber(gutterH) ? `${gutterH}px` : gutterH) : undefined,
      rowGap: gutterV !== undefined ? (isNumber(gutterV) ? `${gutterV}px` : gutterV) : undefined,
      gridTemplateColumns: gridConfig?.gridTemplateColumns,
      gridTemplateRows: gridConfig?.gridTemplateRows,
      gridTemplateAreas: gridConfig?.gridTemplateAreas,
    };
    Object.assign(rowStyle, gridStyles);
  } else {
    if (gutterH) {
      rowStyle.marginInline = isNumber(gutterH) ? `${gutterH / -2}px` : `calc(${gutterH} / -2)`;
    }
    rowStyle.rowGap = gutterV;
  }

  const rowContext = React.useMemo<RowContextState>(
    () => ({ gutter: [gutterH, gutterV] as RowContextGutter, wrap, grid: isGrid }),
    [gutterH, gutterV, wrap, isGrid],
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
