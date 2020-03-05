import * as React from 'react';

type UseSyncStateProps<T> = [() => T, (newValue: T) => void];

export default function useSyncState<T>(filteredKeys: T): UseSyncStateProps<T> {
  const filteredKeysRef = React.useRef<T>(filteredKeys);
  const [, forceUpdate] = React.useState<object | null>(null);

  return [
    () => filteredKeysRef.current,
    (newValue: T) => {
      filteredKeysRef.current = newValue;
      // re-render
      forceUpdate({});
    },
  ];
}
