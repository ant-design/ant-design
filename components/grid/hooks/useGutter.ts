import type { Breakpoint, ScreenMap } from '../../_util/responsiveObserver';
import { responsiveArray } from '../../_util/responsiveObserver';
import type { RowProps } from '../row';

type Gap = number | undefined;

export default function useGutter(gutter: RowProps['gutter'], screens: ScreenMap): [Gap, Gap] {
  const results: [number | undefined, number | undefined] = [undefined, undefined];
  const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, undefined];
  normalizedGutter.forEach((g, index) => {
    if (typeof g === 'object' && g !== null) {
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
}
