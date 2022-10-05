import classNames from 'classnames';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import useFlexGapSupport from '../_util/hooks/useFlexGapSupport';
import type { Breakpoint, ScreenMap } from '../_util/responsiveObserve';
import ResponsiveObserve, { responsiveArray } from '../_util/responsiveObserve';
import { tuple } from '../_util/type';
import RowContext from './RowContext';

const RowAligns = tuple('top', 'middle', 'bottom', 'stretch');
const RowJustify = tuple('start', 'end', 'center', 'space-around', 'space-between', 'space-evenly');

type Responsive = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'other';
type ResponsiveLike<T> = {
  [key in Responsive]?: T;
};

type Gap = number | undefined;
export type Gutter = number | undefined | Partial<Record<Breakpoint, number>>;
export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  gutter?: Gutter | [Gutter, Gutter];
  align?: typeof RowAligns[number] | ResponsiveLike<typeof RowAligns[number]>;
  justify?: typeof RowJustify[number] | ResponsiveLike<typeof RowJustify[number]>;
  prefixCls?: string;
  wrap?: boolean;
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

  const [screens, setScreens] = React.useState<ScreenMap>({
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true,
    xxl: true,
  });
  // to save screens info when responsiveObserve callback had been call
  const [curScreens, setCurScreens] = React.useState<ScreenMap>({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
    xxl: false,
  });

  const [mergeAlign, setMergeAlign] = React.useState(typeof align === 'string' ? align : '');
  const [mergeJustify, setJustify] = React.useState(typeof justify === 'string' ? justify : '');

  const supportFlexGap = useFlexGapSupport();

  const gutterRef = React.useRef<Gutter | [Gutter, Gutter]>(gutter);

  // ================================== Effect ==================================
  React.useEffect(() => {
    const token = ResponsiveObserve.subscribe(screen => {
      setCurScreens(screen);
      const currentGutter = gutterRef.current || 0;
      if (
        (!Array.isArray(currentGutter) && typeof currentGutter === 'object') ||
        (Array.isArray(currentGutter) &&
          (typeof currentGutter[0] === 'object' || typeof currentGutter[1] === 'object'))
      ) {
        setScreens(screen);
      }
    });
    return () => ResponsiveObserve.unsubscribe(token);
  }, []);

  // ================================== Render ==================================
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

  // ================================== calc reponsive data ==================================
  const clacMergeAlign = () => {
    if (typeof align === 'object') {
      for (let i = 0; i < responsiveArray.length; i++) {
        const breakpoint: Breakpoint = responsiveArray[i];
        // When 'align' sets the 'other' attribute,
        // we need to set the value of the response attribute not explicitly set in 'align' to the value of 'other'
        const curAlign = align[breakpoint];
        if (align.other && !curScreens[breakpoint]) {
          const otherVal = align.other;
          if (!align[breakpoint]) {
            setMergeAlign(otherVal);
          }
        } else if (curScreens[breakpoint] && curAlign !== undefined) {
          setMergeAlign(curAlign!);
        }
      }
    }
  };

  const clacMergeJustify = () => {
    if (typeof justify === 'object') {
      for (let i = 0; i < responsiveArray.length; i++) {
        const breakpoint: Breakpoint = responsiveArray[i];
        // When 'justify' sets the 'other' attribute,
        // we need to set the value of the response attribute not explicitly set in 'justify' to the value of 'other'
        const curJustify = justify[breakpoint];
        if (justify.other && !curScreens[breakpoint]) {
          const otherVal = justify.other;
          if (!justify[breakpoint]) {
            setMergeAlign(otherVal);
          }
        } else if (curScreens[breakpoint] && curJustify !== undefined) {
          setJustify(curJustify);
        }
      }
    }
  };

  const prefixCls = getPrefixCls('row', customizePrefixCls);
  const gutters = getGutter();
  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-no-wrap`]: wrap === false,
      [`${prefixCls}-${mergeJustify}`]: mergeJustify,
      [`${prefixCls}-${mergeAlign}`]: mergeAlign,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );

  // Add gutter related style
  const rowStyle: React.CSSProperties = {};
  const horizontalGutter = gutters[0] != null && gutters[0] > 0 ? gutters[0] / -2 : undefined;
  const verticalGutter = gutters[1] != null && gutters[1] > 0 ? gutters[1] / -2 : undefined;

  if (horizontalGutter) {
    rowStyle.marginLeft = horizontalGutter;
    rowStyle.marginRight = horizontalGutter;
  }

  if (supportFlexGap) {
    // Set gap direct if flex gap support
    [, rowStyle.rowGap] = gutters;
  } else if (verticalGutter) {
    rowStyle.marginTop = verticalGutter;
    rowStyle.marginBottom = verticalGutter;
  }

  // "gutters" is a new array in each rendering phase, it'll make 'React.useMemo' effectless.
  // So we deconstruct "gutters" variable here.
  const [gutterH, gutterV] = gutters;
  const rowContext = React.useMemo(
    () => ({ gutter: [gutterH, gutterV] as [number, number], wrap, supportFlexGap }),
    [gutterH, gutterV, wrap, supportFlexGap],
  );

  React.useEffect(() => {
    clacMergeAlign();
  }, [align, curScreens]);

  React.useEffect(() => {
    clacMergeJustify();
  }, [justify, curScreens]);

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
