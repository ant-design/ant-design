import type { ReactNode } from 'react';
import { isValidElement } from 'react';

import type { TooltipProps } from '../tooltip';
import isNonNullable from './isNonNullable';

const convertToTooltipProps = <P extends TooltipProps>(tooltip: P | ReactNode) => {
  if (!isNonNullable(tooltip)) {
    return null;
  }

  if (typeof tooltip === 'object' && !isValidElement(tooltip)) {
    return tooltip as P;
  }

  return { title: tooltip } as P;
};

export default convertToTooltipProps;
