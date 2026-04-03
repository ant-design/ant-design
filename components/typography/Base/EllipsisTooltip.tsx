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

  const tooltipOpenProp = typeof open === 'boolean' ? { open: open && isEllipsis } : {};
  const mergedTitle = isEllipsis ? tooltipProps.title : '';

  return (
    <Tooltip {...tooltipProps} title={mergedTitle} {...tooltipOpenProp}>
      {children}
    </Tooltip>
  );
};

if (process.env.NODE_ENV !== 'production') {
  EllipsisTooltip.displayName = 'EllipsisTooltip';
}

export default EllipsisTooltip;
