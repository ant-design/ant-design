import * as React from 'react';

export type RenderFunction = () => React.ReactNode;

export const getRenderPropValue = (
  propValue?: React.ReactNode | RenderFunction,
): React.ReactNode => {
  if (!propValue) {
    return null;
  }

  const isRenderFunction = typeof propValue === 'function';
  if (isRenderFunction) {
    return (propValue as RenderFunction)();
  }

  return propValue;
};
