/* eslint-disable import/prefer-default-export */
import type { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import type { DerivativeToken, FullToken } from '../theme/internal';
import type { OverrideComponent } from '../theme/util/genComponentStyleHook';

interface CompactItemOptions {
  focus?: boolean;
  /**
   * Some component borders are implemented on child elements
   * like `Select`
   */
  borderElCls?: string;
  /**
   * Some components have special `focus` className especially with popovers
   * like `Select` and `DatePicker`
   */
  focusElCls?: string;
}

// handle border collapse
function compactItemBorder(token: DerivativeToken, options: CompactItemOptions): CSSObject {
  const childCombinator = options.borderElCls ? '> *' : '';
  const hoverEffects = ['hover', options.focus ? 'focus' : null, 'active']
    .filter(Boolean)
    .map((n) => `&:${n} ${childCombinator}`)
    .join(',');
  return {
    '&-item:not(&-last-item)': {
      marginInlineEnd: -token.lineWidth,
    },

    '&-item': {
      [hoverEffects]: {
        zIndex: 2,
      },

      ...(options.focusElCls
        ? {
            [`&${options.focusElCls}`]: {
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
function compactItemBorderRadius(prefixCls: string, options: CompactItemOptions): CSSObject {
  const childCombinator = options.borderElCls ? `> ${options.borderElCls}` : '';

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

export function genCompactItemStyle<T extends OverrideComponent>(
  token: FullToken<T>,
  options: CompactItemOptions = { focus: true },
): CSSInterpolation {
  return {
    [`${token.componentCls}-compact`]: {
      ...compactItemBorder(token, options),
      ...compactItemBorderRadius(token.componentCls, options),
    },
  };
}
