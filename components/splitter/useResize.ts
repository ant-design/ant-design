import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useEvent } from 'rc-util';

import type { PanelProps } from './Panel';
import type { SplitterProps } from './Splitter';

interface UseResizeProps
  extends Pick<SplitterProps, 'layout' | 'onResizeStart' | 'onResize' | 'onResizeEnd'> {
  containerRef: React.RefObject<HTMLDivElement | null>;
  panelsRef: React.RefObject<(HTMLDivElement | null)[]>;
  gutter: number;
  gutterCount: number;
  items: PanelProps[];
  isRTL: boolean;
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

const eventList: (keyof WindowEventMap)[] = ['mousemove', 'mouseup', 'contextmenu', 'blur'];

const useResize = ({
  containerRef,
  panelsRef,
  layout,
  gutter,
  gutterCount,
  items,
  isRTL,
  basicsData,
  onResize,
  onResizeEnd,
  onResizeStart,
  setBasicsState,
}: UseResizeProps): UseResize => {
  const startInfo = useRef({ x: 0, y: 0, index: 0 });
  const basicsRef = useRef<number[]>(basicsData);
  const resizingRef = useRef(false);

  const resizeStartWarp = useEvent<Required<UseResizeProps>['onResizeStart']>((sizes, index) => {
    onResizeStart?.(sizes, index);
  });

  const [resizing, setResizing] = useState(false);

  const setOffset = (offset: number, x: number, y: number, containerSize: number) => {
    const { index } = startInfo.current;
    const reverse = layout === 'horizontal' && isRTL;

    if (panelsRef.current?.[index] && basicsRef.current) {
      const previousElement = panelsRef.current[index];
      const nextElement = panelsRef.current[index + 1]!;

      const percentCount = basicsRef.current[index] + basicsRef.current[index + 1];

      let previousSize = reverse
        ? basicsRef.current[index] + offset
        : basicsRef.current[index] - offset;
      let nextSize = reverse
        ? basicsRef.current[index + 1] - offset
        : basicsRef.current[index + 1] + offset;

      const { max: previousMax = percentCount, min: previousMin = 0 } = items[index];
      const { max: nextMax = percentCount, min: nextMin = 0 } = items[index + 1];

      const previousMaxNumber = sizeTransform(previousMax, containerSize);
      const previousMinNumber = sizeTransform(previousMin, containerSize);
      const nextMaxNumber = sizeTransform(nextMax, containerSize);
      const nextMinNumber = sizeTransform(nextMin, containerSize);

      // size limit
      let skipNext = false;
      if (previousSize < previousMinNumber) {
        previousSize = previousMinNumber;
        nextSize = percentCount - previousSize;
        skipNext = true;
      } else if (previousSize > previousMaxNumber) {
        previousSize = previousMaxNumber;
        nextSize = percentCount - previousSize;
        skipNext = true;
      }

      if (!skipNext) {
        if (nextSize < nextMinNumber) {
          nextSize = nextMinNumber;
          previousSize = percentCount - nextSize;
        } else if (nextSize > nextMaxNumber) {
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
      onResize?.(basicsRef.current, index);
    }
  };

  const move = (event: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    const { x: startX, y: startY } = startInfo.current;
    const { clientX, clientY } = event;

    if (containerRef.current && resizingRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      const containerWidth = width - gutterCount;
      const containerHeight = height - gutterCount;

      let offset = 0;
      if (layout === 'horizontal') {
        offset = 100 * ((startX - event.clientX) / containerWidth);
      } else {
        offset = 100 * ((startY - event.clientY) / containerHeight);
      }

      setOffset(
        offset,
        clientX,
        clientY,
        layout === 'horizontal' ? containerWidth : containerHeight,
      );
    }
  };

  const end = () => {
    if (resizingRef.current && basicsRef.current) {
      startInfo.current = { x: 0, y: 0, index: 0 };

      resizingRef.current = false;
      setResizing(false);

      onResizeEnd?.(basicsRef.current, startInfo.current.index);
    }
  };

  const resizeStart = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (e.currentTarget && basicsRef.current) {
      startInfo.current = { x: e.clientX, y: e.clientY, index };

      resizingRef.current = true;
      setResizing(true);

      resizeStartWarp(basicsRef.current, startInfo.current.index);
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
    eventList.forEach((event) => {
      if (event === 'mousemove') {
        document.documentElement.addEventListener(event, move);
      } else {
        document.documentElement.addEventListener(event, end);
      }
    });

    return () => {
      eventList.forEach((event) => {
        if (event === 'mousemove') {
          document.documentElement.removeEventListener(event, move);
        } else {
          document.documentElement.removeEventListener(event, end);
        }
      });
    };
  }, [layout, isRTL, items]);

  basicsRef.current = basicsData;

  return { resizing, resizeStart, setSize };
};

export default useResize;
