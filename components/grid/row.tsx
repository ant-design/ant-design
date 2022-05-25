import classNames from 'classnames';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import type { Breakpoint, ScreenMap } from '../_util/responsiveObserve';
import ResponsiveObserve, { responsiveArray } from '../_util/responsiveObserve';
import { tuple } from '../_util/type';
import RowContext from './RowContext';

const RowAligns = tuple('top', 'middle', 'bottom', 'stretch');
const RowJustify = tuple('start', 'end', 'center', 'space-around', 'space-between', 'space-evenly');

type Gap = number | undefined;
export type Gutter = number | undefined | Partial<Record<Breakpoint, number>>;
export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  gutter?: Gutter | [Gutter, Gutter];
  align?: typeof RowAligns[number];
  justify?: typeof RowJustify[number];
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

  const gutterRef = React.useRef<Gutter | [Gutter, Gutter]>(gutter);

  // ================================== Effect ==================================
  React.useEffect(() => {
    const token = ResponsiveObserve.subscribe(screen => {
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

  const prefixCls = getPrefixCls('row', customizePrefixCls);
  const gutters = getGutter();
  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-no-wrap`]: wrap === false,
      [`${prefixCls}-${justify}`]: justify,
      [`${prefixCls}-${align}`]: align,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );

  // Add gutter related style
  const rowStyle = {} as React.CSSProperties & {
    '--row-gutter-x'?: string;
    '--row-gutter-y'?: string;
  };

  if (gutters[0]) {
    rowStyle['--row-gutter-x'] = `${gutters[0]}px`;
  }

  if (gutters[1]) {
    rowStyle['--row-gutter-y'] = `${gutters[1]}px`;
  }

  const rowContext = React.useMemo(() => ({ wrap }), [wrap]);

  return (
    <RowContext.Provider value={rowContext}>
      <div {...others} className={classes} style={{ ...rowStyle, ...style }} ref={ref}>
        {children}
      </div>
    </RowContext.Provider>
  );
});

Row.displayName = 'Row';

export default Row;
