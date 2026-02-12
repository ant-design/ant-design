import * as React from 'react';

import Tooltip from '../../tooltip';
import type { TooltipProps } from '../../tooltip';

export interface EllipsisTooltipProps {
  tooltipProps?: TooltipProps;
  enableEllipsis: boolean;
  isEllipsis?: boolean;
  /** When true, show the ellipsis tooltip; when false, hide it. Fully controlled so tooltip re-opens when moving from copy button back to text. */
  open: boolean;
  children: React.ReactElement;
}

const EllipsisTooltip: React.FC<EllipsisTooltipProps> = ({
  enableEllipsis,
  isEllipsis,
  open,
  children,
  tooltipProps,
}) => {
  if (!tooltipProps?.title || !enableEllipsis) {
    return children;
  }

  const mergedOpen = open && isEllipsis;
  return (
    <Tooltip open={mergedOpen} {...tooltipProps}>
      {children}
    </Tooltip>
  );
};

if (process.env.NODE_ENV !== 'production') {
  EllipsisTooltip.displayName = 'EllipsisTooltip';
}

export default EllipsisTooltip;
