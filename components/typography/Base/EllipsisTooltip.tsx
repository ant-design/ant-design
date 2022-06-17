import * as React from 'react';
import Tooltip from '../../tooltip';
import type { TooltipProps } from '../../tooltip';

export interface EllipsisTooltipProps {
  title?: React.ReactNode;
  tooltipProps?: TooltipProps;
  enabledEllipsis: boolean;
  isEllipsis?: boolean;
  children: React.ReactElement;
}

const EllipsisTooltip = ({
  title,
  enabledEllipsis,
  isEllipsis,
  children,
  tooltipProps,
}: EllipsisTooltipProps) => {
  if (!title || !enabledEllipsis) {
    return children;
  }

  return (
    <Tooltip title={title} visible={isEllipsis ? undefined : false} {...tooltipProps}>
      {children}
    </Tooltip>
  );
};

if (process.env.NODE_ENV !== 'production') {
  EllipsisTooltip.displayName = 'EllipsisTooltip';
}

export default EllipsisTooltip;
