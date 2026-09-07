import * as React from 'react';
import { isEqual } from '@rc-component/util';

import { isHTMLElement } from '../_util/is';

export type GetCache<T, R> = (cacheKeys: T, callback: () => R) => R;

/**
 * Singleton cache will only take latest `cacheParams` as key
 * and return the result for callback matching.
 */
const useSingletonCache = <T extends any[], R>(): GetCache<T, R> => {
  const cacheRef = React.useRef<[any[] | null, R | null]>([null, null]);

  const getCache: GetCache<T, R> = (cacheKeys, callback) => {
    const filteredKeys = cacheKeys.map<string>((item) =>
      isHTMLElement(item) || Number.isNaN(item) ? '' : item,
    );

    if (!isEqual(cacheRef.current[0], filteredKeys)) {
      cacheRef.current = [filteredKeys, callback()];
    }
    return cacheRef.current[1]!;
  };

  return getCache;
};

export default useSingletonCache;
