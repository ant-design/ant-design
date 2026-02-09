import type { ReactNode } from 'react';
import { isValidElement } from 'react';

import type { TooltipProps } from '../tooltip';
import isNonNullable from './isNonNullable';

const convertToTooltipProps = <P extends TooltipProps>(tooltip: P | ReactNode, context?: P) => {
  if (!isNonNullable(tooltip)) {
    return null;
  }

  if (typeof tooltip === 'object' && !isValidElement(tooltip)) {
    return { ...context, ...tooltip } as P;
  }

  return { ...context, title: tooltip } as P;
};

export default convertToTooltipProps;
