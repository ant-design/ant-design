import { useCallback, useState, useSyncExternalStore } from 'react';

import type { ScreenMap } from '../../_util/responsiveObserver';
import useResponsiveObserver from '../../_util/responsiveObserver';

function useBreakpoint(refreshOnChange: boolean, defaultScreens: null): ScreenMap | null;
function useBreakpoint(refreshOnChange?: boolean, defaultScreens?: ScreenMap): ScreenMap;
function useBreakpoint(
  refreshOnChange = true,
  defaultScreens: ScreenMap | null = {} as ScreenMap,
): ScreenMap | null {
  const [initialScreens] = useState<ScreenMap>(defaultScreens as ScreenMap);
  const responsiveObserver = useResponsiveObserver();

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const token = responsiveObserver.subscribe(onStoreChange);
      return () => {
        responsiveObserver.unsubscribe(token);
      };
    },
    [responsiveObserver],
  );

  const getSnapshot = useCallback(() => {
    if (refreshOnChange) {
      return responsiveObserver.getSnapshot?.() ?? initialScreens;
    }
    return initialScreens;
  }, [responsiveObserver, refreshOnChange, initialScreens]);

  const getServerSnapshot = useCallback(() => {
    return responsiveObserver.getServerSnapshot?.() ?? initialScreens;
  }, [responsiveObserver, initialScreens]);

  const screens = useSyncExternalStore<ScreenMap>(subscribe, getSnapshot, getServerSnapshot);

  // Disabled refresh still exposes the latest breakpoints on the next parent render.
  return refreshOnChange ? screens : (responsiveObserver.getSnapshot?.() ?? initialScreens);
}

export default useBreakpoint;
