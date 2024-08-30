import { useEffect, useRef } from 'react';

import type { UseHandle, UseHandleProps } from '../interface';

const eventList: (keyof WindowEventMap)[] = ['mousemove', 'mouseup', 'contextmenu', 'blur'];
export default function useHandle({
  containerRef,
  basicsRef,
  layout,
  setOffset,
  setResizing,
  onResizeStart,
  onResizeEnd,
}: UseHandleProps): UseHandle {
  const startInfo = useRef({ x: 0, y: 0, index: 0 });
  const resizingRef = useRef(false);

  const move = (event: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    const { x: startX, y: startY } = startInfo.current;

    if (containerRef?.current && resizingRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      const containerWidth = width;
      const containerHeight = height;

      let offset = 0;
      if (layout === 'horizontal') {
        offset = 100 * ((startX - event.clientX) / containerWidth);
      } else {
        offset = 100 * ((startY - event.clientY) / containerHeight);
      }

      setOffset?.(
        offset,
        layout === 'horizontal' ? containerWidth : containerHeight,
        startInfo.current.index,
      );

      startInfo.current.x = event.clientX;
      startInfo.current.y = event.clientY;
    }
  };

  const end = () => {
    if (resizingRef.current) {
      startInfo.current = { x: 0, y: 0, index: 0 };
      resizingRef.current = false;
      setResizing?.(false);
      onResizeEnd?.(basicsRef.current, startInfo.current.index);
    }
  };

  const onStart = (x: number, y: number, index: number) => {
    startInfo.current = { x, y, index };
    resizingRef.current = true;
    setResizing?.(true);
    onResizeStart?.(basicsRef.current, index);
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
  }, [layout]);

  return { onStart };
}
