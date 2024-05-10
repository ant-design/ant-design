/* eslint-disable import/prefer-default-export */
import type { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';

import type { AliasToken, FullToken } from '../theme/internal';
import type { CSSUtil, OverrideComponent } from '../theme/util/genComponentStyleHook';

function compactItemVerticalBorder(token: AliasToken & CSSUtil, parentCls: string): CSSObject {
  return {
    // border collapse
    [`&-item:not(${parentCls}-last-item)`]: {
      marginBottom: token.calc(token.lineWidth).mul(-1).equal(),
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

function compactItemBorderVerticalRadius(prefixCls: string, parentCls: string): CSSObject {
  return {
    [`&-item:not(${parentCls}-first-item):not(${parentCls}-last-item)`]: {
      borderRadius: 0,
    },

    [`&-item${parentCls}-first-item:not(${parentCls}-last-item)`]: {
      [`&, &${prefixCls}-sm, &${prefixCls}-lg`]: {
        borderEndEndRadius: 0,
        borderEndStartRadius: 0,
      },
    },

    [`&-item${parentCls}-last-item:not(${parentCls}-first-item)`]: {
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
  const compactCls = `${token.componentCls}-compact-vertical`;

  return {
    [compactCls]: {
      ...compactItemVerticalBorder(token, compactCls),
      ...compactItemBorderVerticalRadius(token.componentCls, compactCls),
    },
  };
}
