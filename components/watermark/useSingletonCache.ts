import * as React from 'react';
import isEqual from 'rc-util/lib/isEqual';

export type GetCache<T, R> = (cacheKeys: T, callback: () => R) => R;

/**
 * Singleton cache will only take latest `cacheParams` as key
 * and return the result for callback matching.
 */
export default function useSingletonCache<T, R>(): GetCache<T, R> {
  const cacheRef = React.useRef<[T | null, R | null]>([null, null]);

  const getCache: GetCache<T, R> = (cacheKeys, callback) => {
    if (!isEqual(cacheRef.current[0], cacheKeys)) {
      cacheRef.current = [cacheKeys, callback()];
    }
    return cacheRef.current[1]!;
  };

  return getCache;
}
