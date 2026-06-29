import React from 'react';

import { isFunction, isString } from '../../_util/is';
import type { SizeType } from '../SizeContext';
import SizeContext from '../SizeContext';

const useSize = <T extends string | undefined | number | object>(
  customSize?: T | ((ctxSize: SizeType) => T),
): T => {
  const size = React.useContext<SizeType>(SizeContext);
  const mergedSize = React.useMemo<T>(() => {
    if (!customSize) {
      return size as T;
    }
    if (isString(customSize)) {
      return customSize ?? size;
    }
    if (isFunction(customSize)) {
      return customSize(size);
    }
    return size as T;
  }, [customSize, size]);
  return mergedSize;
};

export default useSize;
