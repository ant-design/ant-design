import useBreakpoint from './useBreakpoint';
import { Breakpoint, ScreenMap, responsiveArray } from '../../_util/responsiveObserve';

type UseValueBreakpointConfigs<T> = {
  [key in Breakpoint]?: T;
};

function useValueBreakpoint<T>(
  configs: UseValueBreakpointConfigs<T>,
): { screens: ScreenMap; value: T | undefined } {
  const curConfigs = { ...configs };
  const screenMap = useBreakpoint();

  for (let i = 0; i < responsiveArray.length; i += 1) {
    const screen = responsiveArray[i];
    const isMatch = screenMap[screen];

    if (isMatch && Object.prototype.hasOwnProperty.call(curConfigs, screen)) {
      return { screens: screenMap, value: curConfigs[screen] };
    }
  }

  // return default value
  return { screens: screenMap, value: curConfigs.xs };
}

export default useValueBreakpoint;
