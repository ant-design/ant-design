import * as React from 'react';
import { useDelayState } from '@rc-component/util';

export default function useDebounce<T>(value: T[]): T[] {
  const [cacheValue, setCacheValue] = useDelayState(value);

  React.useEffect(() => {
    setCacheValue(value, { ms: value.length ? 0 : 10 });
  }, [value]);

  return cacheValue;
}
