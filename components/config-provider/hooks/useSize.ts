import React from 'react';
import type { SizeType } from '../SizeContext';
import SizeContext from '../SizeContext';

const useSize = <T>(customSize?: T | ((ctxSize: SizeType) => T)): T => {
  const size = React.useContext<SizeType>(SizeContext);
  const mergedSize = React.useMemo<T>(() => {
    if (!customSize) {
      return size as T;
    }
    if (typeof customSize === 'string') {
      return customSize ?? size;
    }
    if (customSize instanceof Function) {
      return customSize(size);
    }
    return size as T;
  }, [customSize, size]);
  return mergedSize;
};

export default useSize;
