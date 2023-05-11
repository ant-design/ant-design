import React from 'react';
import type { SizeType } from '../../config-provider/SizeContext';
import SizeContext from '../../config-provider/SizeContext';

const useSize = <T extends string>(customizeSize?: T) => {
  const size = React.useContext<SizeType>(SizeContext);
  const mergeSize = React.useMemo<T>(() => {
    if (!customizeSize) {
      return size as T;
    }
    return customizeSize ?? size;
  }, [customizeSize, size]);
  return mergeSize;
};

export default useSize;
