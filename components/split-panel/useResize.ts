import type React from 'react';
import { useEffect, useRef, useState } from 'react';

import type { SplitPanelProps } from './SplitPanel';

export interface StartInfo {
  x: number;
  y: number;
  index: number;
  splitPanelBar: HTMLDivElement | null;
}

export interface UseResize {
  resizing: boolean;
  resizeStart: (e: React.MouseEvent<HTMLDivElement>, index: number) => void;
}

const useResize = (
  container: React.RefObject<HTMLDivElement>,
  layout: SplitPanelProps['layout'],
  gutter: number,
  offsets: React.RefObject<number[]>,
  items: SplitPanelProps['items'] = [],
): UseResize => {
  const resizingRef = useRef(false);
  const startInfo = useRef<StartInfo>({ x: 0, y: 0, index: 0, splitPanelBar: null });

  const [resizing, setResizing] = useState(false);

  const splitBarSizeCount = items.length * gutter;

  const setOffset = (offset: number, x: number, y: number) => {
    const { index, splitPanelBar } = startInfo.current;

    if (splitPanelBar && offsets.current) {
      const previousElement = splitPanelBar.previousElementSibling as HTMLDivElement;
      const nextElement = splitPanelBar.nextElementSibling as HTMLDivElement;

      const percentCount = offsets.current[index] + offsets.current[index + 1];

      let previousSize = offsets.current[index] - offset;
      let nextSize = offsets.current[index + 1] + offset;

      const { max: previousMax = percentCount, min: previousMin = 0 } = items[index];
      const { max: nextMax = percentCount, min: nextMin = 0 } = items[index + 1];

      // size limit
      let skipNext = false;
      if (previousSize < previousMin) {
        previousSize = previousMin;
        nextSize = percentCount - previousSize;
        skipNext = true;
      } else if (previousSize < 0) {
        previousSize = 0;
      } else if (previousSize > percentCount) {
        previousSize = percentCount;
      } else if (previousSize > previousMax) {
        previousSize = previousMax;
        nextSize = percentCount - previousSize;
        skipNext = true;
      }

      if (skipNext) {
        if (nextSize < nextMin) {
          nextSize = nextMin;
        } else if (nextSize < 0) {
          nextSize = 0;
        } else if (nextSize > percentCount) {
          nextSize = percentCount;
        } else if (nextSize > nextMax) {
          nextSize = nextMax;
        }
      }

      previousElement.style.flexBasis = `calc(${previousSize}% - ${gutter}px)`;
      nextElement.style.flexBasis = `calc(${nextSize}% - ${gutter}px)`;

      startInfo.current.x = x;
      startInfo.current.y = y;
      offsets.current[index] = previousSize;
      offsets.current[index + 1] = nextSize;
    }
  };

  const move = (event: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    const { x: startX, y: startY } = startInfo.current;
    const { clientX, clientY } = event;

    if (resizingRef.current && container.current) {
      const { width, height } = container.current.getBoundingClientRect();
      const containerWidth = width - splitBarSizeCount;
      const containerHeight = height - splitBarSizeCount;

      let offset = 0;
      if (layout === 'horizontal') {
        offset = 100 * ((startX - event.clientX) / containerWidth);
      } else {
        offset = 100 * ((startY - event.clientY) / containerHeight);
      }

      setOffset(offset, clientX, clientY);
    }
  };

  const end = () => {
    if (!resizingRef.current) return;

    resizingRef.current = false;
    startInfo.current = { x: 0, y: 0, index: 0, splitPanelBar: null };
    setResizing(false);
  };

  const resizeStart = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const target = e.target as HTMLDivElement;
    if (e.target) {
      setResizing(true);
      resizingRef.current = true;
      startInfo.current = { x: e.clientX, y: e.clientY, index, splitPanelBar: target };
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', end);
    window.addEventListener('contextmenu', end);
    window.addEventListener('blur', end);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', end);
      window.removeEventListener('contextmenu', end);
      window.removeEventListener('blur', end);
    };
  }, [layout]);

  return { resizing, resizeStart };
};

export default useResize;
