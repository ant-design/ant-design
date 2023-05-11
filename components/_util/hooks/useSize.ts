import React from 'react';
import type { SizeType } from '../../config-provider/SizeContext';
import SizeContext from '../../config-provider/SizeContext';

const useSize = <T = SizeType>(customSize?: T | ((ctxSize: SizeType) => T)): T => {
  const size = React.useContext<SizeType>(SizeContext);
  const mergeSize = React.useMemo<T>(() => {
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
  return mergeSize;
};

export default useSize;
