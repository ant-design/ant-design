import type React from 'react';
import { useEffect, useRef, useState } from 'react';

import type { PanelProps } from './Panel';
import type { SplitterProps } from './Splitter';

interface UseResizeProps
  extends Pick<SplitterProps, 'layout' | 'onResizeStart' | 'onResize' | 'onResizeEnd'> {
  containerSize: number;
  panelsRef: React.RefObject<(HTMLDivElement | null)[]>;
  gutter: number;
  items: PanelProps[];
  basicsData: number[];
  setBasicsState: React.Dispatch<React.SetStateAction<number[]>>;
}
export interface UseResize {
  resizing: boolean;
  resizeStart: (e: React.MouseEvent<HTMLDivElement>, index: number) => void;
  setSize: (size: number, index: number) => void;
}

export const sizeTransform = (size: number | string, sizeCount: number) => {
  let currentSize = 0;
  if (typeof size === 'number') {
    return size;
  }

  if (size.includes('%')) {
    currentSize = Number(size.replace('%', ''));
  } else if (size.includes('px')) {
    currentSize = (Number(size.replace('px', '')) / sizeCount) * 100;
  }

  return currentSize;
};

const useResize = ({
  containerSize,
  panelsRef,
  layout,
  gutter,
  items,
  basicsData,
  onResize,
  onResizeEnd,
  onResizeStart,
  setBasicsState,
}: UseResizeProps): UseResize => {
  const startInfo = useRef({ x: 0, y: 0, index: 0 });
  const basicsRef = useRef<number[]>(basicsData);

  const resizingRef = useRef(false);
  const [resizing, setResizing] = useState(false);

  const splitBarSizeCount = items.length * gutter;

  const setOffset = (offset: number, x: number, y: number) => {
    const { index } = startInfo.current;

    if (panelsRef.current?.[index] && basicsRef.current) {
      const previousElement = panelsRef.current[index];
      const nextElement = panelsRef.current[index + 1]!;

      const percentCount = basicsRef.current[index] + basicsRef.current[index + 1];

      let previousSize = basicsRef.current[index] - offset;
      let nextSize = basicsRef.current[index + 1] + offset;

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

      const previousMaxNumber = sizeTransform(previousMax, containerSize);
      const previousMinNumber = sizeTransform(previousMin, containerSize);
      const nextMaxNumber = sizeTransform(nextMax, containerSize);
      const nextMinNumber = sizeTransform(nextMin, containerSize);

      // collapsible = true 忽略大小限制
      const collapsible = previousCollapsible || nextCollapsible;

      // size limit
      let skipNext = false;
      if (previousSize < previousMinNumber && !collapsible) {
        previousSize = previousMinNumber;
        nextSize = percentCount - previousSize;
        skipNext = true;
      } else if (previousSize < 0) {
        previousSize = 0;
      } else if (previousSize > percentCount) {
        previousSize = percentCount;
      } else if (previousSize > previousMaxNumber && !collapsible) {
        previousSize = previousMaxNumber;
        nextSize = percentCount - previousSize;
        skipNext = true;
      }

      if (!skipNext) {
        if (nextSize < nextMinNumber && !collapsible) {
          nextSize = nextMinNumber;
          previousSize = percentCount - nextSize;
        } else if (nextSize < 0) {
          nextSize = 0;
        } else if (nextSize > percentCount) {
          nextSize = percentCount;
        } else if (nextSize > nextMaxNumber && !collapsible) {
          nextSize = nextMaxNumber;
          previousSize = percentCount - nextSize;
        }
      }

      previousElement.style.flexBasis = `calc(${previousSize}% - ${gutter}px)`;
      nextElement.style.flexBasis = `calc(${nextSize}% - ${gutter}px)`;

      startInfo.current.x = x;
      startInfo.current.y = y;
      basicsRef.current[index] = previousSize;
      basicsRef.current[index + 1] = nextSize;

      setBasicsState([...basicsRef.current]);
      onResize?.(basicsRef.current);
    }
  };

  const move = (event: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    const { x: startX, y: startY } = startInfo.current;
    const { clientX, clientY } = event;

    if (resizingRef.current && containerSize > 0) {
      let offset = 0;
      if (layout === 'horizontal') {
        offset = 100 * ((startX - event.clientX) / (containerSize - splitBarSizeCount));
      } else {
        offset = 100 * ((startY - event.clientY) / (containerSize - splitBarSizeCount));
      }

      setOffset(offset, clientX, clientY);
    }
  };

  const end = () => {
    if (resizingRef.current && basicsRef.current) {
      startInfo.current = { x: 0, y: 0, index: 0 };

      resizingRef.current = false;
      setResizing(false);

      onResizeEnd?.(basicsRef.current);
    }
  };

  const resizeStart = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (e.currentTarget && basicsRef.current) {
      startInfo.current = { x: e.clientX, y: e.clientY, index };

      resizingRef.current = true;
      setResizing(true);

      onResizeStart?.(basicsRef.current);
    }
  };

  const setSize = (size: number, index: number) => {
    if (basicsRef.current && panelsRef.current?.[index]) {
      basicsRef.current[index] = size;
      setBasicsState([...basicsRef.current]);
      panelsRef.current[index].style.flexBasis = size > 0 ? `calc(${size}% - ${gutter}px)` : '0';
    }
  };

  useEffect(() => {
    basicsRef.current = basicsData;
  }, [basicsData]);

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
  }, [layout, containerSize]);

  return { resizing, resizeStart, setSize };
};

export default useResize;
