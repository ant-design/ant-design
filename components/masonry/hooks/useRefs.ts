import * as React from 'react';

export default function useRefs() {
  const ref = React.useRef<Map<React.Key, HTMLDivElement | null> | null>(null);

  if (ref.current === null) {
    ref.current = new Map();
  }

  const setRef = (key: React.Key, element: HTMLDivElement | null) => {
    ref.current!.set(key, element);
  };

  const getRef = (key: React.Key) => ref.current!.get(key);

  return [setRef, getRef] as const;
}
