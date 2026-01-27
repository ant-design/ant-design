import type { ReactNode } from 'react';
import { isValidElement } from 'react';

import type { TooltipProps } from '../tooltip';

function convertToTooltipProps<P extends TooltipProps>(tooltip: P | ReactNode): P | null {
  // isNil
  if (tooltip === undefined || tooltip === null) {
    return null;
  }

  if (typeof tooltip === 'object' && !isValidElement(tooltip)) {
    return tooltip as P;
  }

  return {
    title: tooltip,
  } as P;
}

export default convertToTooltipProps;
