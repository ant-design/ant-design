import { useState, useLayoutEffect, useMemo } from 'react';

type LoadingConfigType = {
  loading: boolean;
  delay: number;
};

function getLoadingConfig(loading?: boolean | { delay?: number }): LoadingConfigType {
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

export default function useLoading(loading?: boolean | { delay?: number }): [boolean] {
  const loadingOrDelay = useMemo<LoadingConfigType>(() => getLoadingConfig(loading), [loading]);

  const [innerLoading, setLoading] = useState<boolean>(loadingOrDelay.loading);

  useLayoutEffect(() => {
    if (loadingOrDelay.delay <= 0) {
      setLoading(loadingOrDelay.loading);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
    }, loadingOrDelay.delay);

    return () => {
      clearTimeout(timer);
    };
  }, [loadingOrDelay]);

  return [innerLoading];
}
