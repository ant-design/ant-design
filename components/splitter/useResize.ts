import type React from 'react';
import { useEffect, useRef, useState } from 'react';

import type { SplitterProps } from './Splitter';

interface StartInfo {
  x: number;
  y: number;
  index: number;
  splitBar: HTMLDivElement | null;
}

interface UseResizeProps
  extends Pick<SplitterProps, 'layout' | 'items' | 'onResizeStart' | 'onResize' | 'onResizeEnd'> {
  container: React.RefObject<HTMLDivElement>;
  panels: React.RefObject<(HTMLDivElement | null)[]>;
  gutter: number;
  basics: React.RefObject<number[]>;
  setBasicsState: React.Dispatch<React.SetStateAction<number[]>>;
}
export interface UseResize {
  resizing: boolean;
  resizeStart: (e: React.MouseEvent<HTMLDivElement>, index: number) => void;
  setSize: (size: number, index: number) => void;
}

const useResize = ({
  container,
  panels,
  layout,
  gutter,
  items,
  basics,
  onResize,
  onResizeEnd,
  onResizeStart,
  setBasicsState,
}: UseResizeProps): UseResize => {
  const startInfo = useRef<StartInfo>({ x: 0, y: 0, index: 0, splitBar: null });
  const resizingRef = useRef(false);
  const [resizing, setResizing] = useState(false);

  const splitBarSizeCount = items.length * gutter;

  const setOffset = (offset: number, x: number, y: number) => {
    const { index, splitBar } = startInfo.current;

    if (splitBar && basics.current) {
      const previousElement = splitBar.previousElementSibling as HTMLDivElement;
      const nextElement = splitBar.nextElementSibling as HTMLDivElement;

      const percentCount = basics.current[index] + basics.current[index + 1];

      let previousSize = basics.current[index] - offset;
      let nextSize = basics.current[index + 1] + offset;

      const {
        max: previousMax = percentCount,
        min: previousMin = 0,
        collapsible: previousCollapsible,
      } = items[index];
      const {
        max: nextMax = percentCount,
        min: nextMin = 0,
        collapsible: nextCollapsible,
      } = items[index + 1];

      // collapsible = true 忽略大小限制
      const collapsible = previousCollapsible || nextCollapsible;

      // size limit
      let skipNext = false;
      if (previousSize < previousMin && !collapsible) {
        previousSize = previousMin;
        nextSize = percentCount - previousSize;
        skipNext = true;
      } else if (previousSize < 0) {
        previousSize = 0;
      } else if (previousSize > percentCount) {
        previousSize = percentCount;
      } else if (previousSize > previousMax && !collapsible) {
        previousSize = previousMax;
        nextSize = percentCount - previousSize;
        skipNext = true;
      }

      if (!skipNext) {
        if (nextSize < nextMin && !collapsible) {
          nextSize = nextMin;
          previousSize = percentCount - nextSize;
        } else if (nextSize < 0) {
          nextSize = 0;
        } else if (nextSize > percentCount) {
          nextSize = percentCount;
        } else if (nextSize > nextMax && !collapsible) {
          nextSize = nextMax;
          previousSize = percentCount - nextSize;
        }
      }

      previousElement.style.flexBasis = `calc(${previousSize}% - ${gutter}px)`;
      nextElement.style.flexBasis = `calc(${nextSize}% - ${gutter}px)`;

      startInfo.current.x = x;
      startInfo.current.y = y;
      basics.current[index] = previousSize;
      basics.current[index + 1] = nextSize;

      setBasicsState([...basics.current]);
      onResize?.(basics.current);
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
    if (resizingRef.current && basics.current) {
      startInfo.current = { x: 0, y: 0, index: 0, splitBar: null };

      resizingRef.current = false;
      setResizing(false);

      onResizeEnd?.(basics.current);
    }
  };

  const resizeStart = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const target = e.target as HTMLDivElement;
    if (e.target && basics.current) {
      startInfo.current = { x: e.clientX, y: e.clientY, index, splitBar: target };

      resizingRef.current = true;
      setResizing(true);

      onResizeStart?.(basics.current);
    }
  };

  const setSize = (size: number, index: number) => {
    if (basics.current && panels.current?.[index]) {
      basics.current[index] = size;
      setBasicsState([...basics.current]);
      panels.current[index].style.flexBasis = size > 0 ? `calc(${size}% - ${gutter}px)` : '0';
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

  return { resizing, resizeStart, setSize };
};

export default useResize;
