import { useRef } from 'react';

import type { UseCollapsible, UseCollapsibleProps } from '../interface';

export default function useCollapsible({
  basicsState,
  collapsible,
  index,
  reverse,
  setSize,
}: UseCollapsibleProps): UseCollapsible {
  // Panel size before folding
  const oldBasicsRef = useRef({ previous: basicsState[index], next: basicsState[index + 1] });

  // panel size
  const previousIdx = reverse ? index + 1 : index;
  const nextIdx = reverse ? index : index + 1;
  const previousSize = basicsState?.[previousIdx] || 0;
  const nextSize = basicsState?.[nextIdx] || 0;

  // collapsible
  let previousIcon = false;
  let nextIcon = false;
  if (typeof collapsible === 'object') {
    const { start = false, end = false } = collapsible;
    previousIcon = start;
    nextIcon = end;

    if (previousIcon && previousSize === 0) {
      previousIcon = false;
      nextIcon = true;
    }
    if (nextIcon && nextSize === 0) {
      previousIcon = true;
      nextIcon = false;
    }
  } else if (collapsible) {
    previousIcon = true;
    nextIcon = true;
  }

  // When the panel size is 0, the SplitBar will overlap
  const overlap = previousSize === 0 || nextSize === 0;

  const onFold = (type: 'previous' | 'next') => {
    oldBasicsRef.current[type] = type === 'previous' ? previousSize : nextSize;

    const count = previousSize + nextSize;
    let curPreviousSize = 0;
    let curNextSize = 0;

    if (type === 'previous') {
      if (nextSize) {
        curPreviousSize = 0;
        curNextSize = count;
      } else {
        curPreviousSize = count - oldBasicsRef.current.next;
        curNextSize = oldBasicsRef.current.next;
      }
    } else if (previousSize) {
      curPreviousSize = count;
      curNextSize = 0;
    } else {
      curPreviousSize = oldBasicsRef.current.previous;
      curNextSize = count - oldBasicsRef.current.previous;
    }

    setSize?.([
      { size: curPreviousSize, index: previousIdx },
      { size: curNextSize, index: nextIdx },
    ]);

    oldBasicsRef.current[type === 'previous' ? 'next' : 'previous'] =
      type === 'previous' ? nextSize : previousSize;
  };

  const setOldBasics = () => {
    oldBasicsRef.current = { previous: previousSize, next: nextSize };
  };

  return {
    previousIcon: !!(previousIcon && previousSize),
    nextIcon: !!(nextIcon && nextSize),
    overlap,
    onFold,
    setOldBasics,
  };
}
