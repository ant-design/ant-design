import * as React from 'react';
import type { AnyObject } from './type';

export const { isValidElement } = React;

export function isFragment(child: any): boolean {
  return child && isValidElement(child) && child.type === React.Fragment;
}

type RenderProps = AnyObject | ((originProps: AnyObject) => AnyObject | void);

export function replaceElement(
  element: React.ReactNode,
  replacement: React.ReactNode,
  props?: RenderProps,
): React.ReactNode {
  if (!isValidElement(element)) {
    return replacement;
  }
  return React.cloneElement(
    element,
    typeof props === 'function' ? props(element.props || {}) : props,
  );
}

export function cloneElement(element: React.ReactNode, props?: RenderProps): React.ReactElement {
  return replaceElement(element, element, props) as React.ReactElement;
}
