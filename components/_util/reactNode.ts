import React from 'react';

import type { AnyObject } from './type';

export function isFragment(child: any): boolean {
  return child && React.isValidElement(child) && child.type === React.Fragment;
}

type RenderProps = AnyObject | ((originProps: AnyObject) => AnyObject | void);

export const replaceElement = <P>(
  element: React.ReactNode,
  replacement: React.ReactNode,
  props?: RenderProps,
) => {
  if (!React.isValidElement<P>(element)) {
    return replacement;
  }
  return React.cloneElement<P>(
    element,
    typeof props === 'function' ? props(element.props || {}) : props,
  );
};

export function cloneElement<P>(element: React.ReactNode, props?: RenderProps) {
  return replaceElement<P>(element, element, props) as React.ReactElement;
}
