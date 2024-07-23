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
  splitBarSizeCount: number,
  offsets: React.RefObject<number[]>,
): UseResize => {
  const resizingRef = useRef(false);
  const startInfo = useRef<StartInfo>({ x: 0, y: 0, index: 0, splitPanelBar: null });

  const [resizing, setResizing] = useState(false);

  const setOffset = (offset: number, x: number, y: number) => {
    const { index, splitPanelBar } = startInfo.current;

    if (splitPanelBar && offsets.current) {
      const previousElement = splitPanelBar.previousElementSibling as HTMLDivElement;
      const nextElement = splitPanelBar.nextElementSibling as HTMLDivElement;

      const previousSize = offsets.current[index] - offset;
      const nextSize = offsets.current[index + 1] + offset;

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

  const cancel = () => {
    if (!resizingRef.current) return;

    resizingRef.current = false;
    startInfo.current = { x: 0, y: 0, index: 0, splitPanelBar: null };
    setResizing(false);

    console.log('[ cancel ] ===>');
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
    window.addEventListener('mouseup', cancel);
    window.addEventListener('contextmenu', cancel);
    window.addEventListener('blur', cancel);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', cancel);
      window.removeEventListener('contextmenu', cancel);
      window.removeEventListener('blur', cancel);

      cancel()
    };
  }, [layout]);

  return { resizing, resizeStart };
};

export default useResize;
