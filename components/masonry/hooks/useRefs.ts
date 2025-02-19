import * as React from 'react';

export default function useRefs(): [
  setRef: (key: React.Key, element: HTMLDivElement | null) => void,
  getRef: (key: React.Key) => HTMLDivElement | undefined | null,
] {
  const refs = React.useRef(new Map<React.Key, HTMLDivElement | null>());

  const setRef = (index: React.Key, element: HTMLDivElement | null) => {
    refs.current.set(index, element);
  };

  const getRef = (index: React.Key) => refs.current.get(index);

  return [setRef, getRef];
}
