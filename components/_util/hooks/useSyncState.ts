import * as React from 'react';
import useForceUpdate from './useForceUpdate';

type UseSyncStateProps<T> = readonly [() => T, (newValue: T) => void];

export default function useSyncState<T>(initialValue: T): UseSyncStateProps<T> {
  const ref = React.useRef<T>(initialValue);
  const forceUpdate = useForceUpdate();

  return [
    () => ref.current,
    (newValue: T) => {
      ref.current = newValue;
      // re-render
      forceUpdate();
    },
  ] as const;
}
