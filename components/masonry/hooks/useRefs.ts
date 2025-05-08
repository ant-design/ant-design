import * as React from 'react';

export default function useRefs() {
  const refs = React.useRef<Map<React.Key, HTMLDivElement | null> | null>(null);

  if (refs.current === null) {
    refs.current = new Map();
  }

  const setRef = (key: React.Key, element: HTMLDivElement | null) => {
    refs.current!.set(key, element);
  };

  const getRef = (key: React.Key) => refs.current!.get(key);

  return [setRef, getRef] as const;
}
