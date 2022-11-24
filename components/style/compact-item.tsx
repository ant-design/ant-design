/* eslint-disable import/prefer-default-export */
import type { CSSObject } from '@ant-design/cssinjs';
import type { DerivativeToken } from '../theme/internal';

// handle border collapse
function compactItemBorder(
  token: DerivativeToken,
  borderedItemCls?: string,
  popoverFocusedCls?: string,
): CSSObject {
  const childCombinator = borderedItemCls ? '> *' : '';
  return {
    '&-item:not(&-last-item)': {
      marginInlineEnd: -token.lineWidth,
    },

    '&-item': {
      [`&:hover ${childCombinator}, &:focus ${childCombinator}, &:active ${childCombinator}`]: {
        zIndex: 2,
      },

      ...(popoverFocusedCls
        ? {
            [`&${popoverFocusedCls}`]: {
              zIndex: 2,
            },
          }
        : {}),

      [`&[disabled] ${childCombinator}`]: {
        zIndex: 0,
      },
    },
  };
}

// handle border-radius
function compactItemBorderRadius(prefixCls: string, borderedElementCls?: string): CSSObject {
  const childCombinator = borderedElementCls ? `> ${borderedElementCls}` : '';

  return {
    [`&-item:not(&-first-item):not(&-last-item) ${childCombinator}`]: {
      borderRadius: 0,
    },

    '&-item:not(&-last-item)&-first-item': {
      [`& ${childCombinator}, &${prefixCls}-sm ${childCombinator}, &${prefixCls}-lg ${childCombinator}`]:
        {
          borderStartEndRadius: 0,
          borderEndEndRadius: 0,
        },
    },

    '&-item:not(&-first-item)&-last-item': {
      [`& ${childCombinator}, &${prefixCls}-sm ${childCombinator}, &${prefixCls}-lg ${childCombinator}`]:
        {
          borderStartStartRadius: 0,
          borderEndStartRadius: 0,
        },
    },
  };
}

export function genCompactItemStyle(
  token: DerivativeToken,
  prefixCls: string,
  /** Some component borders are implemented on child elements like `Select` */
  borderedElementCls?: string,
  /**
   * Some components have special `focus` className especially with popovers like `Select` and
   * `DatePicker`
   */
  popoverFocusedCls?: string,
): CSSObject {
  return {
    '&-compact': {
      ...compactItemBorder(token, borderedElementCls, popoverFocusedCls),
      ...compactItemBorderRadius(prefixCls, borderedElementCls),
    },
  };
}
