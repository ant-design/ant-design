import { useEffect, useRef } from 'react';
import useForceUpdate from '../../_util/hooks/useForceUpdate';
import type { ScreenMap } from '../../_util/responsiveObserve';
import useResponsiveObserve from '../../_util/responsiveObserve';

function useBreakpoint(refreshOnChange: boolean = true): ScreenMap {
  const screensRef = useRef<ScreenMap>({});
  const forceUpdate = useForceUpdate();
  const responsiveObserve = useResponsiveObserve();

  useEffect(() => {
    const token = responsiveObserve.subscribe((supportScreens) => {
      screensRef.current = supportScreens;
      if (refreshOnChange) {
        forceUpdate();
      }
    });

    return () => responsiveObserve.unsubscribe(token);
  }, []);

  return screensRef.current;
}

export default useBreakpoint;
