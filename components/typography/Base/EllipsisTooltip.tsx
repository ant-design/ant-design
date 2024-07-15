import * as React from 'react';

import type { EllipsisConfig } from '.';
import Tooltip from '../../tooltip';
import type { TooltipProps } from '../../tooltip';

export interface EllipsisTooltipProps {
  tooltipProps?: TooltipProps;
  enableEllipsis: boolean;
  isEllipsis?: boolean;
  children: React.ReactElement;
  tooltip?: EllipsisConfig['tooltip'];
}

const EllipsisTooltip: React.FC<EllipsisTooltipProps> = ({
  tooltip,
  enableEllipsis,
  isEllipsis,
  children,
  tooltipProps,
}) => {
  if (typeof tooltip === 'function') {
    return tooltip(children, isEllipsis);
  }

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
