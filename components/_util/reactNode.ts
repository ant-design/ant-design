import React from 'react';

import { isFunction, isNonNullable } from './is';
import type { AnyObject } from './type';

export function isFragment(child: any): boolean {
  return child && React.isValidElement(child) && child.type === React.Fragment;
}

export function isValidReactNode(node: React.ReactNode): boolean {
  return isNonNullable(node) && typeof node !== 'boolean' && node !== '';
}

type RenderProps = AnyObject | ((originProps: AnyObject) => AnyObject | undefined);

export const replaceElement = <P>(
  element: React.ReactNode,
  replacement: React.ReactNode,
  props?: RenderProps,
) => {
  if (!React.isValidElement<P>(element)) {
    return replacement;
  }
  return React.cloneElement<P>(element, isFunction(props) ? props(element.props || {}) : props);
};

export function cloneElement<P>(element: React.ReactNode, props?: RenderProps) {
  return replaceElement<P>(element, element, props) as React.ReactElement<P>;
}
