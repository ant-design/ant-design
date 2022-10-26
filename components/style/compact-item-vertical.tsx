/* eslint-disable import/prefer-default-export */
import type { CSSObject } from '@ant-design/cssinjs';
import type { DerivativeToken } from '../theme';

function compactItemVerticalBorder(token: DerivativeToken): CSSObject {
  return {
    // border collapse
    '&-item:not(&-last-item)': {
      marginBottom: -token.controlLineWidth,
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

    '&-item&-first-item': {
      borderEndEndRadius: 0,
      borderEndStartRadius: 0,

      [`&&${prefixCls}-sm`]: {
        borderEndEndRadius: 0,
        borderEndStartRadius: 0,
      },
    },

    '&-item&-last-item': {
      borderStartStartRadius: 0,
      borderStartEndRadius: 0,

      [`&&${prefixCls}-sm`]: {
        borderStartStartRadius: 0,
        borderStartEndRadius: 0,
      },
    },
  };
}

export function genCompactItemVertical(token: DerivativeToken, prefixCls: string): CSSObject {
  return {
    '&-compact-vertical': {
      ...compactItemVerticalBorder(token),
      ...compactItemBorderVerticalRadius(prefixCls),
    },
  };
}
