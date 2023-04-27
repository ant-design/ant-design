/* eslint-disable import/prefer-default-export */
import type { CSSObject } from '@ant-design/cssinjs';
import type { DerivativeToken } from '../theme/internal';

function compactItemVerticalBorder(token: DerivativeToken): CSSObject {
  return {
    // border collapse
    '&-item:not(&-last-item)': {
      marginBottom: -token.lineWidth,
    },

    '&-item': {
      '&:hover,&:focus,&:active': {
        zIndex: 2,
      },

      '&[disabled]': {
        zIndex: 0,
      },
    },
  };
}

function compactItemBorderVerticalRadius(prefixCls: string): CSSObject {
  return {
    '&-item:not(&-first-item):not(&-last-item)': {
      borderRadius: 0,
    },

    '&-item&-first-item:not(&-last-item)': {
      [`&, &${prefixCls}-sm, &${prefixCls}-lg`]: {
        borderEndEndRadius: 0,
        borderEndStartRadius: 0,
      },
    },

    '&-item&-last-item:not(&-first-item)': {
      [`&, &${prefixCls}-sm, &${prefixCls}-lg`]: {
        borderStartStartRadius: 0,
        borderStartEndRadius: 0,
      },
    },
  };
}

export function genCompactItemVerticalStyle(token: DerivativeToken, prefixCls: string): CSSObject {
  return {
    '&-compact-vertical': {
      ...compactItemVerticalBorder(token),
      ...compactItemBorderVerticalRadius(prefixCls),
    },
  };
}
