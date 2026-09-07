import type { ReactNode } from 'react';
import { isValidElement } from 'react';
import { isReactRenderable } from '@rc-component/util';

import type { TooltipProps } from '../tooltip';
import { isPlainObject } from './is';

const convertToTooltipProps = <P extends TooltipProps>(tooltip: P | ReactNode, context?: P) => {
  if (!isReactRenderable(tooltip)) {
    return null;
  }

  if (isPlainObject<TooltipProps>(tooltip) && !isValidElement(tooltip)) {
    return { ...context, ...tooltip };
  }

  return { ...context, title: tooltip } as P;
};

export default convertToTooltipProps;
