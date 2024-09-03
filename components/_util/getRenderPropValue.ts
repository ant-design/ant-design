import type * as React from 'react';

export type RenderFunction = () => React.ReactNode;

export const getRenderPropValue = (
  propValue?: React.ReactNode | RenderFunction,
): React.ReactNode => {
  if (!propValue) {
    return null;
  }

  return typeof propValue === 'function' ? propValue() : propValue;
};
