import type React from 'react';
import { useRef, useState } from 'react';

import type { SplitPanelProps } from './SplitPanel';

export interface StartInfo {
  x: number;
  y: number;
  splitPanelBar: HTMLDivElement | null;
}

const useResize = (
  container: React.RefObject<HTMLDivElement>,
  layout: SplitPanelProps['layout'],
  gutter: number,
  splitBarSizeCount: number,
): { resizing: boolean; resizeStart: (e: React.MouseEvent<HTMLDivElement>) => void } => {
  const resizingRef = useRef(false);
  const changeRef = useRef({ previousSize: 0, nextSize: 0 });
  const startInfo = useRef<StartInfo>({ x: 0, y: 0, splitPanelBar: null });

  const [resizing, setResizing] = useState(false);

  const setStartInfo = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (e.target && container.current) {
      setResizing(true);

      const { width, height } = container.current.getBoundingClientRect();
      const containerWidth = width - splitBarSizeCount;
      const containerHeight = height - splitBarSizeCount;

      const previousElement = target.previousElementSibling as HTMLDivElement;
      const nextElement = target.nextElementSibling as HTMLDivElement;

      resizingRef.current = true;
      changeRef.current = {
        previousSize:
          (100 * previousElement[layout === 'horizontal' ? 'clientWidth' : 'clientHeight']) /
          (layout === 'horizontal' ? containerWidth : containerHeight),
        nextSize:
          (100 * nextElement[layout === 'horizontal' ? 'clientWidth' : 'clientHeight']) /
          (layout === 'horizontal' ? containerWidth : containerHeight),
      };
      startInfo.current = { x: e.clientX, y: e.clientY, splitPanelBar: target };
    }
  };

  const resizeStart = (startEvent: React.MouseEvent<HTMLDivElement>) => {
    setStartInfo(startEvent);

    document.body.addEventListener('mousemove', (event) => {
      const { x: startX, y: startY, splitPanelBar } = startInfo.current;

      if (resizingRef.current && container.current && splitPanelBar) {
        const { width, height } = container.current.getBoundingClientRect();
        const containerWidth = width - splitBarSizeCount;
        const containerHeight = height - splitBarSizeCount;

        const previousElement = splitPanelBar.previousElementSibling as HTMLDivElement;
        const nextElement = splitPanelBar.nextElementSibling as HTMLDivElement;

        let offset = 0;
        let offsetRate = 0;
        if (layout === 'horizontal') {
          offset = startX - event.clientX;
          offsetRate = 100 * (Math.abs(offset) / containerWidth);
        } else {
          offset = startY - event.clientY;
          offsetRate = 100 * (Math.abs(offset) / containerHeight);
        }

        const previousSize =
          offset > 0
            ? changeRef.current.previousSize - offsetRate
            : changeRef.current.previousSize + offsetRate;

        const nextSize =
          offset > 0
            ? changeRef.current.nextSize + offsetRate
            : changeRef.current.nextSize - offsetRate;

        previousElement.style.flexBasis =
          previousSize > 0 ? `calc(${previousSize}% - ${gutter}px)` : 'auto';
        nextElement.style.flexBasis = nextSize > 0 ? `calc(${nextSize}% - ${gutter}px)` : 'auto';

        startInfo.current.x = event.clientX;
        startInfo.current.y = event.clientY;

        changeRef.current = { previousSize, nextSize };
      }
    });

    document.body.addEventListener('mouseup', () => {
      if (!resizingRef.current) {
        return;
      }

      console.log('[ onMouseUp ] ===>');
      resizingRef.current = false;
      startInfo.current = { x: 0, y: 0, splitPanelBar: null };
      changeRef.current = { previousSize: 0, nextSize: 0 };
      setResizing(false);
    });
  };

  return { resizing, resizeStart };
};

export default useResize;
