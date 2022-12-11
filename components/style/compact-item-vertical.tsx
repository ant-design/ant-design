/* eslint-disable import/prefer-default-export */
import type { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import type { DerivativeToken, FullToken } from '../theme/internal';
import type { OverrideComponent } from '../theme/util/genComponentStyleHook';

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

export function genCompactItemVerticalStyle<T extends OverrideComponent>(
  token: FullToken<T>,
): CSSInterpolation {
  return {
    [`${token.componentCls}-compact-vertical`]: {
      ...compactItemVerticalBorder(token),
      ...compactItemBorderVerticalRadius(token.componentCls),
    },
  };
}
