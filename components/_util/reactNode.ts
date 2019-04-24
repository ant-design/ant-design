import * as React from 'react';

export function cloneElement(element: React.ReactNode, ...restArgs: any[]) {
  if (!React.isValidElement(element)) return element;

  return React.cloneElement(element, ...restArgs);
}