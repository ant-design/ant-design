import { useRef } from 'react';
import useLayoutEffect from 'rc-util/lib/hooks/useLayoutEffect';

import useForceUpdate from '../../_util/hooks/useForceUpdate';
import type { ScreenMap } from '../../_util/responsiveObserver';
import useResponsiveObserver from '../../_util/responsiveObserver';

function useBreakpoint<T extends ScreenMap | null = ScreenMap>(
  refreshOnChange = true,
  defaultScreens: T = {} as T,
): T {
  const screensRef = useRef<T>(defaultScreens);
  const forceUpdate = useForceUpdate();
  const responsiveObserver = useResponsiveObserver();

  useLayoutEffect(() => {
    const token = responsiveObserver.subscribe((supportScreens) => {
      screensRef.current = supportScreens as T;
      if (refreshOnChange) {
        forceUpdate();
      }
    });

    return () => responsiveObserver.unsubscribe(token);
  }, []);

  return screensRef.current;
}

export default useBreakpoint;
