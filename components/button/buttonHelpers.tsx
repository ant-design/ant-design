import React from 'react';
import { cloneElement, isFragment } from '../_util/reactNode';
import type { BaseButtonProps, LegacyButtonType } from './button';

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
export const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);

export function convertLegacyProps(
  type?: LegacyButtonType,
): Pick<BaseButtonProps, 'danger' | 'type'> {
  if (type === 'danger') {
    return { danger: true };
  }
  return { type };
}

export function isString(str: any): str is string {
  return typeof str === 'string';
}

export function isUnBorderedButtonType(type?: ButtonType) {
  return type === 'text' || type === 'link';
}

function splitCNCharsBySpace(child: React.ReactElement | string | number, needInserted: boolean) {
  if (child === null || child === undefined) {
    return;
  }

  const SPACE = needInserted ? ' ' : '';

  if (
    typeof child !== 'string' &&
    typeof child !== 'number' &&
    isString(child.type) &&
    isTwoCNChar(child.props.children)
  ) {
    return cloneElement(child, {
      children: child.props.children.split('').join(SPACE),
    });
  }

  if (isString(child)) {
    return isTwoCNChar(child) ? <span>{child.split('').join(SPACE)}</span> : <span>{child}</span>;
  }

  if (isFragment(child)) {
    return <span>{child}</span>;
  }

  return child;
}

export function spaceChildren(children: React.ReactNode, needInserted: boolean) {
  let isPrevChildPure: boolean = false;
  const childList: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    const type = typeof child;
    const isCurrentChildPure = type === 'string' || type === 'number';
    if (isPrevChildPure && isCurrentChildPure) {
      const lastIndex = childList.length - 1;
      const lastChild = childList[lastIndex];
      childList[lastIndex] = `${lastChild}${child}`;
    } else {
      childList.push(child);
    }

    isPrevChildPure = isCurrentChildPure;
  });

  return React.Children.map(childList, (child) =>
    splitCNCharsBySpace(child as React.ReactElement | string | number, needInserted),
  );
}

const ButtonTypes = ['default', 'primary', 'dashed', 'link', 'text'] as const;
export type ButtonType = typeof ButtonTypes[number];

const ButtonShapes = ['default', 'circle', 'round'] as const;
export type ButtonShape = typeof ButtonShapes[number];

const ButtonHTMLTypes = ['submit', 'button', 'reset'] as const;
export type ButtonHTMLType = typeof ButtonHTMLTypes[number];
