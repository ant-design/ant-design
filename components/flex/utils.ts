import React from 'react';
import type { ElementType, PropsWithChildren } from 'react';

import type { FlexProps } from './interface';

const flexSize = {
  small: 8,
  middle: 16,
  large: 24,
} as const;

export const getGapSize = (gap: FlexProps['gap']) => {
  if (!gap) {
    return 0;
  }
  if (typeof gap === 'number') {
    return gap;
  }
  return ['small', 'middle', 'large'].includes(gap) ? flexSize[gap as keyof typeof flexSize] : gap;
};

export function createContainer<T, P extends PropsWithChildren>(component: ElementType<P>) {
  return React.forwardRef<T, P>((props, ref) => React.createElement(component, { ...props, ref }));
}
