/* eslint-disable import/prefer-default-export */
import type { CSSObject } from '@ant-design/cssinjs';
import type { DerivativeToken } from '../theme';

function compactItemBorder(
  token: DerivativeToken,
  prefixCls: string,
  borderItemCls?: string,
  specialItemCls?: string,
): CSSObject {
  function genSpecial(): CSSObject {
    if (specialItemCls) {
      return {
        [`&.${specialItemCls}`]: {
          zIndex: 2,
        },
      };
    }
    return {};
  }
  if (!borderItemCls) {
    return {
      // border collapse
      '&-item:not(&-last-item)': {
        marginInlineEnd: -token.controlLineWidth,
      },

      '&-item': {
        '&:hover, &:focus, &:active': {
          zIndex: 2,
        },
        ...genSpecial(),

        '&[disabled]': {
          zIndex: 0,
        },
      },
    };
  }
  return {
    // border collapse
    '&-item:not(&-last-item)': {
      marginInlineEnd: -token.controlLineWidth,

      [`&.${prefixCls}-compact-item-rtl`]: {
        marginInlineEnd: 0,
        marginInlineStart: -token.controlLineWidth,
      },
    },
    '&-item': {
      '&:hover,&:focus,&:active': {
        '> *': {
          zIndex: 2,
        },
      },
      ...genSpecial(),

      '&[disabled] > *': {
        zIndex: 0,
      },
    },
  };
}

function compactItemBorderRadius(
  token: DerivativeToken,
  prefixCls: string,
  borderItemCls?: string,
): CSSObject {
  if (!borderItemCls) {
    return {
      [`&-item:not(&-first-item):not(&-last-item)`]: {
        borderRadius: 0,
      },

      '&-item&-first-item': {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0,

        [`&&${prefixCls}-sm`]: {
          borderStartEndRadius: 0,
          borderEndEndRadius: 0,
        },
      },

      '&-item&-last-item': {
        borderStartStartRadius: 0,
        borderEndStartRadius: 0,

        [`&&${prefixCls}-sm`]: {
          borderStartStartRadius: 0,
          borderEndStartRadius: 0,
        },
      },
    };
  }

  return {
    // border-radius
    [`&-item:not(&-first-item):not(&-last-item) > ${borderItemCls}`]: {
      borderRadius: 0,
    },

    [`&-item&-first-item > ${borderItemCls}`]: {
      borderStartEndRadius: 0,
      borderEndEndRadius: 0,

      [`&&${prefixCls}-sm`]: {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0,
      },
    },

    [`&-item&-last-item > ${borderItemCls}`]: {
      borderStartStartRadius: 0,
      borderEndStartRadius: 0,

      [`&&${prefixCls}-sm`]: {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0,
      },
    },
  };
}

export function genCompactItem(
  token: DerivativeToken,
  prefixCls: string,
  borderItemCls?: string,
  specialItemCls?: string,
): CSSObject {
  return {
    '&-compact': {
      ...compactItemBorder(token, prefixCls, borderItemCls, specialItemCls),
      ...compactItemBorderRadius(token, prefixCls, borderItemCls),
    },
  };
}
