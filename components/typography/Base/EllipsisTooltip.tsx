import * as React from 'react';
import Tooltip from '../../tooltip';
import type { TooltipProps } from '../../tooltip';

export interface EllipsisTooltipProps {
  tooltipProps?: TooltipProps;
  enableEllipsis: boolean;
  isEllipsis?: boolean;
  children: React.ReactElement;
}

const EllipsisTooltip: React.FC<EllipsisTooltipProps> = ({
  enableEllipsis,
  isEllipsis,
  children,
  tooltipProps,
}) => {
  if (!tooltipProps?.title || !enableEllipsis) {
    return children;
  }

  return (
    <Tooltip open={isEllipsis ? undefined : false} {...tooltipProps}>
      {children}
    </Tooltip>
  );
};

if (process.env.NODE_ENV !== 'production') {
  EllipsisTooltip.displayName = 'EllipsisTooltip';
}

export default EllipsisTooltip;
