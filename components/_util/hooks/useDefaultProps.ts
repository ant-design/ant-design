import React from 'react';

import type { AnyObject } from '../type';

const useDefaultProps = <T extends AnyObject>(originalProps: T, defaultProps: Partial<T>): T => {
  return React.useMemo<T>(() => {
    const props = Object.assign({}, originalProps);
    Object.keys(defaultProps).forEach((key) => {
      if (props[key] === undefined) {
        (props as any)[key] = defaultProps[key];
      }
    });
    return props;
  }, [originalProps, defaultProps]);
};

export default useDefaultProps;
