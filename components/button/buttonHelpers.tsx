import React from 'react';
import { clsx } from 'clsx';

import isNonNullable from '../_util/isNonNullable';
import { cloneElement, isFragment } from '../_util/reactNode';
import { PresetColors } from '../theme/interface';
import type { BaseButtonProps, LegacyButtonType } from './Button';

const rxTwoCNChar = /^[\u4E00-\u9FA5]{2}$/;

export const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);

export function convertLegacyProps(
  type?: LegacyButtonType,
): Pick<BaseButtonProps, 'danger' | 'type'> {
  if (type === 'danger') {
    return { danger: true };
  }
  return { type };
}

export function isString(str: unknown): str is string {
  return typeof str === 'string';
}

export function isUnBorderedButtonVariant(type?: ButtonVariantType) {
  return type === 'text' || type === 'link';
}

function splitCNCharsBySpace(
  child: React.ReactElement<any> | string | number,
  needInserted: boolean,
  style?: React.CSSProperties,
  className?: string,
) {
  if (!isNonNullable(child) || child === '') {
    return;
  }

  const SPACE = needInserted ? ' ' : '';

  if (
    typeof child !== 'string' &&
    typeof child !== 'number' &&
    isString(child.type) &&
    isTwoCNChar((child as React.ReactElement<{ children: string }>).props.children)
  ) {
    return cloneElement(child, (oriProps) => {
      const mergedCls = clsx(oriProps.className, className);
      const mergedStyle: React.CSSProperties = { ...style, ...oriProps.style };
      return {
        ...oriProps,
        children: oriProps.children.split('').join(SPACE),
        className: mergedCls,
        style: mergedStyle,
      };
    });
  }

  if (isString(child)) {
    return (
      <span className={className} style={style}>
        {isTwoCNChar(child) ? child.split('').join(SPACE) : child}
      </span>
    );
  }

  if (isFragment(child)) {
    return (
      <span className={className} style={style}>
        {child}
      </span>
    );
  }

  return cloneElement(child, (oriProps) => ({
    ...oriProps,
    className: clsx(oriProps.className, className) || undefined,
    style: { ...oriProps.style, ...style },
  }));
}

export function spaceChildren(
  children: React.ReactNode,
  needInserted: boolean,
  style?: React.CSSProperties,
  className?: string,
) {
  let isPrevChildPure = false;
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
    splitCNCharsBySpace(
      child as React.ReactElement | string | number,
      needInserted,
      style,
      className,
    ),
  );
}

const _ButtonTypes = ['default', 'primary', 'dashed', 'link', 'text'] as const;
export type ButtonType = (typeof _ButtonTypes)[number];

const _ButtonShapes = ['default', 'circle', 'round', 'square'] as const;
export type ButtonShape = (typeof _ButtonShapes)[number];

const _ButtonHTMLTypes = ['submit', 'button', 'reset'] as const;
export type ButtonHTMLType = (typeof _ButtonHTMLTypes)[number];

export const _ButtonVariantTypes = [
  'outlined',
  'dashed',
  'solid',
  'filled',
  'text',
  'link',
] as const;
export type ButtonVariantType = (typeof _ButtonVariantTypes)[number];

export const _ButtonColorTypes = ['default', 'primary', 'danger', ...PresetColors] as const;

export type ButtonColorType = (typeof _ButtonColorTypes)[number];
