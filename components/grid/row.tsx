import * as React from 'react';
import { clsx } from 'clsx';

import type { Breakpoint, ScreenMap } from '../_util/responsiveObserver';
import { responsiveArray } from '../_util/responsiveObserver';
import { ConfigContext } from '../config-provider';
import useBreakpoint from './hooks/useBreakpoint';
import useGutter from './hooks/useGutter';
import RowContext from './RowContext';
import type { RowContextState } from './RowContext';
import { useGridStyle, useRowStyle } from './style';

export type RowModeType = 'flex' | 'grid';

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

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 栅格模式，可选 `flex` | `grid`，默认 `flex` */
  mode?: RowModeType;
  /** Grid 模式下的列宽模板，支持 CSS grid-template-columns 语法 */
  gridTemplateColumns?: string;
  /** Grid 模式下的行高模板，支持 CSS grid-template-rows 语法 */
  gridTemplateRows?: string;
  /** Grid 模式下的网格区域模板，支持 CSS grid-template-areas 语法 */
  gridTemplateAreas?: string;
  /** Grid 模式下的自动列宽模板，支持 CSS grid-auto-columns 语法 */
  gridAutoColumns?: string;
  /** Grid 模式下的自动行高模板，支持 CSS grid-auto-rows 语法 */
  gridAutoRows?: string;
  /** Grid 模式下的自动放置算法 */
  gridAutoFlow?: 'row' | 'column' | 'dense' | 'row dense' | 'column dense';
  /** Grid 模式下内容在行轴的对齐方式，等同于 justify-content */
  justifyContent?: string;
  /** Grid 模式下内容在列轴的对齐方式，等同于 align-content */
  alignContent?: string;
  /** Grid 模式下单元格在行轴的对齐方式，等同于 justify-items */
  justifyItems?: string;
  /** Grid 模式下单元格在列轴的对齐方式，等同于 align-items */
  alignItems?: string;
  gutter?: Gutter | [Gutter, Gutter];
  align?: (typeof _RowAligns)[number] | ResponsiveAligns;
  justify?: (typeof _RowJustify)[number] | ResponsiveJustify;
  prefixCls?: string;
  wrap?: boolean;
}

function useMergedPropByScreen(
  oriProp: RowProps['align'] | RowProps['justify'],
  screen: ScreenMap | null,
) {
  const [prop, setProp] = React.useState(typeof oriProp === 'string' ? oriProp : '');

  const calcMergedAlignOrJustify = () => {
    if (typeof oriProp === 'string') {
      setProp(oriProp);
    }
    if (typeof oriProp !== 'object') {
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
}

const Row = React.forwardRef<HTMLDivElement, RowProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    mode = 'flex',
    justify,
    align,
    gridTemplateColumns,
    gridTemplateRows,
    gridTemplateAreas,
    gridAutoColumns,
    gridAutoRows,
    gridAutoFlow,
    justifyContent,
    alignContent,
    justifyItems,
    alignItems,
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

  // 根据 mode 选择不同的 prefixCls
  const isGrid = mode === 'grid';
  const prefixCls = isGrid
    ? getPrefixCls('grid', customizePrefixCls)
    : getPrefixCls('row', customizePrefixCls);

  // 必须无条件调用 hooks（React rules of hooks）
  const [rowHashId, rowCssVarCls] = useRowStyle(prefixCls);
  const [gridHashId, gridCssVarCls] = useGridStyle(prefixCls);
  const [hashId, cssVarCls] = isGrid ? [gridHashId, gridCssVarCls] : [rowHashId, rowCssVarCls];

  const gutters = useGutter(gutter, screens);
  const classes = clsx(
    prefixCls,
    !isGrid && {
      [`${prefixCls}-no-wrap`]: wrap === false,
      [`${prefixCls}-${mergedJustify}`]: mergedJustify,
      [`${prefixCls}-${mergedAlign}`]: mergedAlign,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
    hashId,
    cssVarCls,
  );

  // 构建样式
  const rowStyle: React.CSSProperties = {};
  const [gutterH, gutterV] = gutters;

  if (isGrid) {
    // Grid 模式：gap + CSS Grid 属性
    const gridStyles = {
      columnGap: gutterH && (typeof gutterH === 'number' ? `${gutterH}px` : gutterH),
      rowGap: gutterV && (typeof gutterV === 'number' ? `${gutterV}px` : gutterV),
      gridTemplateColumns,
      gridTemplateRows,
      gridTemplateAreas,
      gridAutoColumns,
      gridAutoRows,
      gridAutoFlow,
      justifyContent,
      alignContent,
      justifyItems,
      alignItems,
    };
    Object.entries(gridStyles).forEach(([key, value]) => {
      if (value) (rowStyle as any)[key] = value;
    });
  } else {
    // Flex 模式：负 margin
    if (gutterH) {
      rowStyle.marginInline =
        typeof gutterH === 'number' ? `${gutterH / -2}px` : `calc(${gutterH} / -2)`;
    }
    rowStyle.rowGap = gutterV;
  }

  const rowContext = React.useMemo<RowContextState>(
    () => ({ gutter: [gutterH, gutterV] as [number, number], wrap, mode }),
    [gutterH, gutterV, wrap, mode],
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
