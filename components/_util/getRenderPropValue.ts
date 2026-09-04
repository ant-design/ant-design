import type * as React from 'react';
import { isReactRenderable } from '@rc-component/util';

import { isFunction } from './is';

export type RenderFunction = () => React.ReactNode;

export const getRenderPropValue = (
  propValue?: React.ReactNode | RenderFunction,
): React.ReactNode => {
  if (!isReactRenderable(propValue)) {
    return null;
  }
  return isFunction(propValue) ? propValue() : propValue;
};
