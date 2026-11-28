import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ css, token }) => ({
  resizeHandle: css`
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    width: 4px;
    height: 100%;
    cursor: col-resize;
    background: ${token.colorBorder};
    opacity: 0.3;
    transition: opacity 0.2s, background-color 0.2s;
    user-select: none;
    z-index: 1;

    &:hover {
      opacity: 0.6;
      background: ${token.colorPrimary};
    }

    &.dragging {
      opacity: 1;
      background: ${token.colorPrimary};
    }
  `,
}));

interface ResizeHandleProps {
  onWidthChange: (width: number) => void;
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({ onWidthChange }) => {
  const { styles } = useStyle();
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number>(0);
  const startWidthRef = useRef<number>(0);

  const adjustWidth = useCallback((deltaX: number) => {
    // Calculate new width based on delta
    const newWidth = startWidthRef.current + deltaX;
    // Apply constraints (min 148px, max 400px)
    const clampedWidth = Math.min(Math.max(newWidth, 148), 400);
    onWidthChange(clampedWidth);
  }, [onWidthChange]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    startXRef.current = e.clientX;
    // Get current width from the parent element
    const tocWrapper = (e.target as HTMLElement).parentElement;
    if (tocWrapper) {
      startWidthRef.current = tocWrapper.offsetWidth;
    }
    // Prevent text selection during drag
    document.body.style.userSelect = 'none';
  }, []);

  useEffect(() => {
    if (!isDragging) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate the change in X position
      const deltaX = e.clientX - startXRef.current;
      adjustWidth(deltaX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      // Re-enable text selection
      document.body.style.userSelect = '';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isDragging, adjustWidth]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Arrow keys to adjust width (reuse existing logic)
    const step = 10; // pixels per key press
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      adjustWidth(step);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      adjustWidth(-step);
    }
  }, [adjustWidth]);

  return (
    <div
      className={`${styles.resizeHandle} ${isDragging ? 'dragging' : ''}`}
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
      role="separator"
      aria-label="Resize anchor menu"
      aria-orientation="vertical"
      tabIndex={0}
    />
  );
};

export default ResizeHandle;
