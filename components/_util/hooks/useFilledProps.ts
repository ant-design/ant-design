import React from 'react';

import type { AnyObject } from '../type';
import { devUseWarning } from '../warning';

const useFilledProps = <T extends AnyObject>(originalProps: T, filledProps: Partial<T>) => {
  return React.useMemo<T>(() => {
    if (process.env.NODE_ENV !== 'production') {
      const warning = devUseWarning('useFilledProps');
      warning(originalProps !== undefined, 'usage', `originalProps should be a non-null object`);
      warning(filledProps !== undefined, 'usage', `filledProps should be a non-null object`);
    }
    return { ...originalProps, ...filledProps };
  }, [originalProps, filledProps]);
};

export default useFilledProps;
