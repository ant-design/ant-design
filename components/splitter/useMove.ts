import type React from 'react';
import { useEffect, useRef } from 'react';
import { useEvent } from 'rc-util';
import type { UseMove, UseMoveProps } from './interface';

const eventList: (keyof WindowEventMap)[] = ['mousemove', 'mouseup', 'contextmenu', 'blur'];

const useMove = ({
  containerRef,
  basicsState,
  layout,
  gutterCount,
  setOffset,
  setResizing,
  onResizeStart,
  onResizeEnd,
}: UseMoveProps): UseMove => {
  const startInfo = useRef({ x: 0, y: 0, index: 0 });
  const resizingRef = useRef(false);

  const onResizeStartRef = useEvent((index: number) => {
    onResizeStart?.(basicsState, index);
  });
  const onResizeEndRef = useEvent(() => {
    onResizeEnd?.(basicsState, startInfo.current.index);
  });

  const move = (event: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    const { x: startX, y: startY } = startInfo.current;

    if (containerRef?.current && resizingRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      const containerWidth = width - gutterCount;
      const containerHeight = height - gutterCount;

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
      onResizeEndRef?.();
    }
  };

  const onStart = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (e.currentTarget) {
      startInfo.current = { x: e.clientX, y: e.clientY, index };
      resizingRef.current = true;
      setResizing?.(true);
      onResizeStartRef(index);
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
  }, [layout]);

  return { onStart };
};

export default useMove;
