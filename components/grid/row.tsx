import * as React from 'react';
import classNames from 'classnames';

import type { Breakpoint, ScreenMap } from '../_util/responsiveObserver';
// 新增 useBreakpoint 导入
import useBreakpoint from './hooks/useBreakpoint';
// 保留 responsiveArray 导入
import { responsiveArray } from '../_util/responsiveObserver';

import { ConfigContext } from '../config-provider';
import RowContext from './RowContext';
import type { RowContextState } from './RowContext';
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

type Responsive = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
type ResponsiveLike<T> = {
  [key in Responsive]?: T;
};

type Gap = number | undefined;
export type Gutter = number | undefined | Partial<Record<Breakpoint, number>>;

type ResponsiveAligns = ResponsiveLike<(typeof _RowAligns)[number]>;
type ResponsiveJustify = ResponsiveLike<(typeof _RowJustify)[number]>;
export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  gutter?: Gutter | [Gutter, Gutter];
  align?: (typeof _RowAligns)[number] | ResponsiveAligns;
  justify?: (typeof _RowJustify)[number] | ResponsiveJustify;
  prefixCls?: string;
  wrap?: boolean;
}

function useMergedPropByScreen(
  oriProp: RowProps['align'] | RowProps['justify'],
  screen: ScreenMap,
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
      if (!screen[breakpoint]) {
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

  // 改为使用 useBreakpoint() 仅用于 screens
  const screens = useBreakpoint();

  // 将 useMergedPropByScreen 的第二个参数替换为 screens
  const mergedAlign = useMergedPropByScreen(align, screens);
  const mergedJustify = useMergedPropByScreen(justify, screens);

  // getGutter 仍使用 screens 来计算
  const getGutter = (): [Gap, Gap] => {
    const results: [Gap, Gap] = [undefined, undefined];
    const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, undefined];
    normalizedGutter.forEach((g, index) => {
      if (typeof g === 'object') {
        for (let i = 0; i < responsiveArray.length; i++) {
          const breakpoint: Breakpoint = responsiveArray[i];
          if (screens[breakpoint] && g[breakpoint] !== undefined) {
            results[index] = g[breakpoint] as number;
            break;
          }
        }
      } else {
        results[index] = g;
      }
    });
    return results;
  };

  const prefixCls = getPrefixCls('row', customizePrefixCls);

  const [wrapCSSVar, hashId, cssVarCls] = useRowStyle(prefixCls);

  const gutters = getGutter();
  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-no-wrap`]: wrap === false,
      [`${prefixCls}-${mergedJustify}`]: mergedJustify,
      [`${prefixCls}-${mergedAlign}`]: mergedAlign,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
    hashId,
    cssVarCls,
  );

  // Add gutter related style
  const rowStyle: React.CSSProperties = {};

  const horizontalGutter = gutters[0] != null && gutters[0] > 0 ? gutters[0] / -2 : undefined;

  if (horizontalGutter) {
    rowStyle.marginInline = horizontalGutter;
  }

  // "gutters" is a new array in each rendering phase, it'll make 'React.useMemo' effectless.
  // So we deconstruct "gutters" variable here.
  const [gutterH, gutterV] = gutters;

  rowStyle.rowGap = gutterV;

  const rowContext = React.useMemo<RowContextState>(
    () => ({ gutter: [gutterH, gutterV] as [number, number], wrap }),
    [gutterH, gutterV, wrap],
  );

  return wrapCSSVar(
    <RowContext.Provider value={rowContext}>
      <div {...others} className={classes} style={{ ...rowStyle, ...style }} ref={ref}>
        {children}
      </div>
    </RowContext.Provider>,
  );
});

if (process.env.NODE_ENV !== 'production') {
  Row.displayName = 'Row';
}

export default Row;
