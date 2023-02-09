import type * as React from 'react';
import isFunction from './isFunction';

export type RenderFunction = () => React.ReactNode;

export const getRenderPropValue = (
  propValue?: React.ReactNode | RenderFunction,
): React.ReactNode => {
  if (!propValue) {
    return null;
  }
  return isFunction(propValue) ? propValue() : propValue;
};
