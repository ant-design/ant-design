import * as React from 'react';
import classNames from 'classnames';
import type { Placement } from 'rc-drawer/lib/Drawer';

export interface ResizeHandleProps {
  prefixCls: string;
  placement: Placement;
  onMouseDown: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  className?: string;
  hashId?: string;
  cssVarCls?: string;
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({
  prefixCls,
  placement,
  onMouseDown,
  style,
  className,
  hashId,
  cssVarCls,
}) => {
  const handleClassName = `${prefixCls}-resize-handle`;
  const placementClassName = `${handleClassName}-${placement}`;

  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onMouseDown(e);
    },
    [onMouseDown],
  );

  return (
    <div
      className={classNames(handleClassName, placementClassName, hashId, cssVarCls, className)}
      style={style}
      onMouseDown={handleMouseDown}
      role="separator"
      aria-label="Resize drawer"
    />
  );
};

export default ResizeHandle;
