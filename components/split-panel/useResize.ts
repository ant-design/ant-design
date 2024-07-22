import type React from 'react';
import { useRef, useState } from 'react';

export interface StartInfo {
  x: number;
  y: number;
  splitPanelBar: HTMLDivElement | null;
}

const useResize = (
  container: React.RefObject<HTMLDivElement>,
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

      const { width } = container.current.getBoundingClientRect();
      const containerWidth = width - splitBarSizeCount;

      const previousElement = target.previousElementSibling as HTMLDivElement;
      const nextElement = target.nextElementSibling as HTMLDivElement;

      resizingRef.current = true;
      changeRef.current = {
        previousSize: (100 * (previousElement.clientWidth + gutter)) / containerWidth,
        nextSize: (100 * (nextElement.clientWidth + gutter)) / containerWidth,
      };
      startInfo.current = { x: e.clientX, y: e.clientY, splitPanelBar: target };

      console.log('[ changeRef ] ===>', JSON.stringify(changeRef.current));
    }
  };

  const resizeStart = (startEvent: React.MouseEvent<HTMLDivElement>) => {
    setStartInfo(startEvent);

    document.body.addEventListener('mousemove', (event) => {
      const { x: startX, splitPanelBar } = startInfo.current;

      if (resizingRef.current && container.current && splitPanelBar) {
        const { width } = container.current.getBoundingClientRect();
        const containerWidth = width - splitBarSizeCount;

        const previousElement = splitPanelBar.previousElementSibling as HTMLDivElement;
        const nextElement = splitPanelBar.nextElementSibling as HTMLDivElement;

        const offset = startX - event.clientX;
        const offsetRate = 100 * (Math.abs(offset) / containerWidth);

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
