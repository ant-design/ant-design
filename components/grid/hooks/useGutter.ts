import type { Breakpoint, ScreenMap } from '../../_util/responsiveObserver';
import { responsiveArray } from '../../_util/responsiveObserver';
import type { RowProps } from '../row';

export type Gap = number | string | undefined;

export default function useGutter(
  gutter: RowProps['gutter'],
  screens: ScreenMap | null,
): [Gap, Gap] {
  const results: [Gap, Gap] = [undefined, undefined];
  const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, undefined];

  // By default use as `xs`
  const mergedScreens = screens || {
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true,
    xxl: true,
  };

  normalizedGutter.forEach((g, index) => {
    if (typeof g === 'object' && g !== null) {
      for (let i = 0; i < responsiveArray.length; i++) {
        const breakpoint: Breakpoint = responsiveArray[i];
        if (mergedScreens[breakpoint] && g[breakpoint] !== undefined) {
          results[index] = g[breakpoint] as number | string;
          break;
        }
      }
    } else {
      results[index] = g;
    }
  });
  return results;
}
