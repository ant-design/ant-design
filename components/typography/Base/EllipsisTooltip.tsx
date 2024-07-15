import * as React from 'react';

import type { PopoverProps } from '../../popover';
import Popover from '../../popover';
import Tooltip from '../../tooltip';
import type { TooltipProps } from '../../tooltip';

export interface EllipsisTooltipProps {
  showMode?: string;
  tooltipProps: TooltipProps;
  popoverProps: PopoverProps;
  enableEllipsis: boolean;
  isEllipsis?: boolean;
  children: React.ReactElement;
}

const EllipsisTooltip: React.FC<EllipsisTooltipProps> = ({
  showMode,
  enableEllipsis,
  isEllipsis,
  children,
  tooltipProps,
  popoverProps,
}) => {
  if (showMode === 'tooltip') {
    if (!tooltipProps?.title || !enableEllipsis) {
      return children;
    }
    return (
      <Tooltip open={isEllipsis ? undefined : false} {...tooltipProps}>
        {children}
      </Tooltip>
    );
  }
  if (showMode === 'popover') {
    if (!popoverProps?.content || !enableEllipsis) {
      return children;
    }
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
