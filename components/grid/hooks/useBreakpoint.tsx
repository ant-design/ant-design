import { useRef } from 'react';
import useLayoutEffect from 'rc-util/lib/hooks/useLayoutEffect';
import useForceUpdate from '../../_util/hooks/useForceUpdate';
import type { ScreenMap } from '../../_util/responsiveObserver';
import useResponsiveObserver from '../../_util/responsiveObserver';

function useBreakpoint(refreshOnChange: boolean = true): ScreenMap {
  const screensRef = useRef<ScreenMap>({});
  const forceUpdate = useForceUpdate();
  const responsiveObserver = useResponsiveObserver();

  useLayoutEffect(() => {
    const token = responsiveObserver.subscribe((supportScreens) => {
      screensRef.current = supportScreens;
      if (refreshOnChange) {
        forceUpdate();
      }
    });

    return () => responsiveObserver.unsubscribe(token);
  }, []);

  return screensRef.current;
}

export default useBreakpoint;
