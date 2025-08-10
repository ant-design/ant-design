import { useCallback, useEffect, useRef, useState } from 'react';
import type { Placement } from 'rc-drawer/lib/Drawer';

interface ResizeState {
  width?: number;
  height?: number;
}

export interface UseResizableOptions {
  placement?: Placement;
  defaultWidth?: number | string;
  defaultHeight?: number | string;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
}

export default function useResizable(options: UseResizableOptions) {
  const {
    placement = 'right',
    defaultWidth,
    defaultHeight,
    minWidth = 0,
    maxWidth = window.innerWidth,
    minHeight = 0,
    maxHeight = window.innerHeight,
  } = options;

  const [size, setSize] = useState<ResizeState>(() => {
    const initialWidth = typeof defaultWidth === 'number' ? defaultWidth : undefined;
    const initialHeight = typeof defaultHeight === 'number' ? defaultHeight : undefined;
    return {
      width: initialWidth,
      height: initialHeight,
    };
  });

  const [isResizing, setIsResizing] = useState<boolean>(false);
  const isResizingRef = useRef<boolean>(false);
  const resizeStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const resizeStartSize = useRef<ResizeState>({ width: 0, height: 0 });
  const prevPlacementRef = useRef<Placement>(placement);

  // Listen for placement changes, and reset the corresponding size when the direction changes
  useEffect(() => {
    const prevPlacement = prevPlacementRef.current;

    const isHorizontalChange =
      (prevPlacement === 'left' || prevPlacement === 'right') &&
      (placement === 'top' || placement === 'bottom');
    const isVerticalChange =
      (prevPlacement === 'top' || prevPlacement === 'bottom') &&
      (placement === 'left' || placement === 'right');

    if (isHorizontalChange || isVerticalChange) {
      setSize((prevSize) => {
        const newSize: ResizeState = {};

        if (isHorizontalChange) {
          newSize.width = prevSize.width;
          newSize.height = typeof defaultHeight === 'number' ? defaultHeight : undefined;
        } else if (isVerticalChange) {
          newSize.width = typeof defaultWidth === 'number' ? defaultWidth : undefined;
          newSize.height = prevSize.height;
        }

        return newSize;
      });
    }

    prevPlacementRef.current = placement;
  }, [placement, defaultWidth, defaultHeight]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent | MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      setIsResizing(true);
      isResizingRef.current = true;
      resizeStartPos.current = { x: e.clientX, y: e.clientY };
      resizeStartSize.current = { ...size };

      document.body.style.cursor =
        placement === 'left' || placement === 'right' ? 'ew-resize' : 'ns-resize';
      document.body.style.userSelect = 'none';

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!isResizingRef.current) return;

        const deltaX = moveEvent.clientX - resizeStartPos.current.x;
        const deltaY = moveEvent.clientY - resizeStartPos.current.y;

        let newWidth: number | undefined;
        let newHeight: number | undefined;

        if (placement === 'left') {
          newWidth = Math.max(
            minWidth,
            Math.min(maxWidth, (resizeStartSize.current.width || 0) + deltaX),
          );
        } else if (placement === 'right') {
          newWidth = Math.max(
            minWidth,
            Math.min(maxWidth, (resizeStartSize.current.width || 0) - deltaX),
          );
        } else if (placement === 'top') {
          newHeight = Math.max(
            minHeight,
            Math.min(maxHeight, (resizeStartSize.current.height || 0) + deltaY),
          );
        } else if (placement === 'bottom') {
          newHeight = Math.max(
            minHeight,
            Math.min(maxHeight, (resizeStartSize.current.height || 0) - deltaY),
          );
        }

        const newSize: ResizeState = {
          width: newWidth,
          height: newHeight,
        };

        setSize(newSize);
      };

      const handleMouseUp = () => {
        setIsResizing(false);
        isResizingRef.current = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';

        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp, { passive: false });
    },
    [placement, size, minWidth, maxWidth, minHeight, maxHeight],
  );

  return {
    size,
    setSize,
    handleMouseDown,
    isResizing,
  };
}
