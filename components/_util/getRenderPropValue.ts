import type * as React from 'react';

export type RenderFunction = () => React.ReactNode;

export const getRenderPropValue = (
  propValue?: React.ReactNode | RenderFunction,
): React.ReactNode => {
  if (!propValue) {
    return null;
  }

  if (typeof propValue === 'function') {
    return propValue();
  }

  return propValue;
};
