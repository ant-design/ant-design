import React from 'react';
import { createStaticStyles } from 'antd-style';
import { clsx } from 'clsx';

const classNames = createStaticStyles(({ css }) => ({
  siteMask: css`
    z-index: 1;
    position: relative;
  `,
}));

export interface GroupMaskLayerProps {
  className?: string;
  style?: React.CSSProperties;
  onMouseMove?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

const GroupMaskLayer: React.FC<React.PropsWithChildren<GroupMaskLayerProps>> = (props) => {
  const { children, className, style, onMouseMove, onMouseEnter, onMouseLeave } = props;
  return (
    <div
      style={style}
      className={clsx(className, classNames.siteMask)}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};

export default GroupMaskLayer;
