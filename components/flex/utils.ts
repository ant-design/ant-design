import React from 'react';
import type { ElementType, PropsWithChildren } from 'react';

import type { SizeType } from '../config-provider/SizeContext';

export function isPresetSize(size: any): size is SizeType {
  return typeof size === 'string' && ['small', 'middle', 'large'].includes(size);
}

export function createContainer<T, P extends PropsWithChildren>(component: ElementType<P>) {
  return React.forwardRef<T, P>((props, ref) =>
    React.createElement<P>(component, { ...props, ref }),
  );
}
