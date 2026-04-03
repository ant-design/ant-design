import * as React from 'react';

import Tooltip from '../../tooltip';
import type { TooltipProps } from '../../tooltip';

export interface EllipsisTooltipProps {
  tooltipProps?: TooltipProps;
  enableEllipsis: boolean;
  isEllipsis?: boolean;
  /** Undefined means uncontrolled hover behavior; false means force hidden. */
  open?: boolean;
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

  const controlledOpen = typeof open === 'boolean' ? open && isEllipsis : undefined;
  const mergedTitle = isEllipsis ? tooltipProps.title : '';

  return (
    <Tooltip {...tooltipProps} title={mergedTitle} open={controlledOpen}>
      {children}
    </Tooltip>
  );
};

if (process.env.NODE_ENV !== 'production') {
  EllipsisTooltip.displayName = 'EllipsisTooltip';
}

export default EllipsisTooltip;
