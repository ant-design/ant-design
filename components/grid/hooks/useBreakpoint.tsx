import { useEffect, useState } from 'react';
import ResponsiveObserve, { ScreenMap, getScreenMap } from '../../_util/responsiveObserve';

function useBreakpoint(): ScreenMap {
  const [screens, setScreens] = useState<ScreenMap>(() => getScreenMap());

  useEffect(() => {
    const token = ResponsiveObserve.subscribe(supportScreens => {
      setScreens(supportScreens);
    });

    return () => ResponsiveObserve.unsubscribe(token);
  }, []);

  return screens;
}

export default useBreakpoint;
