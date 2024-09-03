import { useEffect, useRef } from 'react';
import { useEvent } from 'rc-util';

import type { UseHandle, UseHandleProps } from '../interface';

const resizeEvent = 'mousemove';
const stopResizeEvents: (keyof WindowEventMap)[] = ['mouseup', 'contextmenu', 'blur'];
export default function useHandle({
  basicsState,
  containerRef,
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

  const end = useEvent(() => {
    if (resizingRef.current) {
      startInfo.current = { x: 0, y: 0, index: 0 };
      resizingRef.current = false;
      setResizing?.(false);
      onResizeEnd?.(basicsState, startInfo.current.index);
    }
  });

  const onStart = useEvent((x: number, y: number, index: number) => {
    startInfo.current = { x, y, index };
    resizingRef.current = true;
    setResizing?.(true);
    onResizeStart?.(basicsState, index);
  });

  useEffect(() => {
    document.documentElement.addEventListener(resizeEvent, move);
    stopResizeEvents.forEach((event) => {
      document.documentElement.addEventListener(event, end);
    });

    return () => {
      document.documentElement.removeEventListener(resizeEvent, move);
      stopResizeEvents.forEach((event) => {
        document.documentElement.removeEventListener(event, end);
      });
    };
  }, [layout]);

  return { onStart };
}
