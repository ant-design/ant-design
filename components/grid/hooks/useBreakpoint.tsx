import { useEffect, useRef } from 'react';
import useForceUpdate from '../../_util/hooks/useForceUpdate';
import type { ScreenMap } from '../../_util/responsiveObserve';
import ResponsiveObserve from '../../_util/responsiveObserve';

function useBreakpoint(refreshOnChange: boolean = true): ScreenMap {
  const screensRef = useRef<ScreenMap>({});
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const token = ResponsiveObserve.subscribe(supportScreens => {
      screensRef.current = supportScreens;
      if (refreshOnChange) {
        forceUpdate();
      }
    });

    return () => ResponsiveObserve.unsubscribe(token);
  }, []);

  return screensRef.current;
}

export default useBreakpoint;
