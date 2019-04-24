import * as React from 'react';

export function cloneElement(element: React.ReactNode, props?: any, children?: any) {
  if (!React.isValidElement(element)) return element;

  return React.cloneElement(element, props, children);
}