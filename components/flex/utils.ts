import React from 'react';
import type { ElementType, PropsWithChildren } from 'react';

function createContainer<T, P extends PropsWithChildren>(component: ElementType<P>) {
  return React.forwardRef<T, P>((props, ref) =>
    React.createElement<P>(component, { ...props, ref }),
  );
}

export default createContainer;
