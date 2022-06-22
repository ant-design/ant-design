import * as React from 'react';
import Tooltip from '../../tooltip';

export interface EllipsisTooltipProps {
  title?: React.ReactNode;
  enabledEllipsis: boolean;
  isEllipsis?: boolean;
  children: React.ReactElement;
}

const EllipsisTooltip: React.FC<EllipsisTooltipProps> = ({
  title,
  enabledEllipsis,
  isEllipsis,
  children,
}) => {
  if (!title || !enabledEllipsis) {
    return children;
  }

  return (
    <Tooltip title={title} visible={isEllipsis ? undefined : false}>
      {children}
    </Tooltip>
  );
};

if (process.env.NODE_ENV !== 'production') {
  EllipsisTooltip.displayName = 'EllipsisTooltip';
}

export default EllipsisTooltip;
