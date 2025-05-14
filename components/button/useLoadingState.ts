import { useCallback, useEffect, useMemo, useRef } from 'react';

import useForceUpdate from '../_util/hooks/useForceUpdate';

type LoadingConfigType = {
  loading: boolean;
  delay: number;
};

function getLoadingConfig(loading: boolean | { delay?: number }): LoadingConfigType {
  if (typeof loading === 'object' && loading) {
    let delay = loading?.delay;
    delay = !Number.isNaN(delay) && typeof delay === 'number' ? delay : 0;
    return {
      loading: delay <= 0,
      delay,
    };
  }

  return {
    loading: !!loading,
    delay: 0,
  };
}

export default function useLoadingState(loadingProp: boolean | { delay?: number }) {
  const forceUpdate = useForceUpdate();
  const loadingOrDelay = useMemo(() => getLoadingConfig(loadingProp), [loadingProp]);
  const innerLoading = useRef<boolean>(loadingOrDelay.loading);
  const getLoading = useCallback(() => innerLoading.current, []);

  useEffect(() => {
    let delayTimer: ReturnType<typeof setTimeout> | null = null;
    if (loadingOrDelay.delay > 0) {
      delayTimer = setTimeout(() => {
        delayTimer = null;
        innerLoading.current = true;
        forceUpdate();
      }, loadingOrDelay.delay);
    } else {
      innerLoading.current = loadingOrDelay.loading;
      forceUpdate();
    }

    const cleanupTimer = () => {
      if (delayTimer) {
        clearTimeout(delayTimer);
        delayTimer = null;
      }
    };

    return cleanupTimer;
  }, [loadingOrDelay, forceUpdate]);

  return {
    loading: innerLoading.current,
    getLoading,
  };
}
