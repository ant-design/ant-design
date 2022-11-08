import * as React from 'react';
import Tooltip from '../../tooltip';
import Popover from '../../popover';
import type { TooltipProps } from '../../tooltip';
import type { PopoverProps } from '../../popover';

export interface EllipsisTooltipProps {
  tooltipProps?: TooltipProps;
  popoverProps?: PopoverProps;
  enabledEllipsis: boolean;
  isEllipsis?: boolean;
  children: React.ReactElement;
}

const EllipsisTooltip = ({
  enabledEllipsis,
  isEllipsis,
  children,
  tooltipProps,
  popoverProps,
}: EllipsisTooltipProps) => {
  if (tooltipProps?.title && enabledEllipsis) {
    return (
      <Tooltip open={isEllipsis ? undefined : false} {...tooltipProps}>
        {children}
      </Tooltip>
    );
  }
  if (popoverProps?.content && enabledEllipsis) {
    return (
      <Popover open={isEllipsis ? undefined : false} {...popoverProps}>
        {children}
      </Popover>
    );
  }
  return children;
};

if (process.env.NODE_ENV !== 'production') {
  EllipsisTooltip.displayName = 'EllipsisTooltip';
}

export default EllipsisTooltip;
