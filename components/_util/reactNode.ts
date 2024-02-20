import * as React from 'react';

import type { AnyObject } from './type';

export const { isValidElement } = React;

export function isFragment(child: any): boolean {
  return child && isValidElement(child) && child.type === React.Fragment;
}

type RenderProps = AnyObject | ((originProps: AnyObject) => AnyObject | void);

export function replaceElement<P>(
  element: React.ReactNode,
  replacement: React.ReactNode,
  props?: RenderProps,
) {
  if (!isValidElement<P>(element)) {
    return replacement;
  }
  return React.cloneElement<P>(
    element,
    typeof props === 'function' ? props(element.props || {}) : props,
  );
}

export function cloneElement<P>(element: React.ReactNode, props?: RenderProps) {
  return replaceElement<P>(element, element, props) as React.ReactElement;
}
