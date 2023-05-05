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
function compactItemBorder(
  token: DerivativeToken,
  parentCls: string,
  options: CompactItemOptions,
): CSSObject {
  const { focusElCls, focus, borderElCls } = options;
  const childCombinator = borderElCls ? '> *' : '';
  const hoverEffects = ['hover', focus ? 'focus' : null, 'active']
    .filter(Boolean)
    .map((n) => `&:${n} ${childCombinator}`)
    .join(',');
  return {
    [`&-item:not(${parentCls}-last-item)`]: {
      marginInlineEnd: -token.lineWidth,
    },

    '&-item': {
      [hoverEffects]: {
        zIndex: 2,
      },

      ...(focusElCls
        ? {
            [`&${focusElCls}`]: {
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
function compactItemBorderRadius(
  prefixCls: string,
  parentCls: string,
  options: CompactItemOptions,
): CSSObject {
  const { borderElCls } = options;
  const childCombinator = borderElCls ? `> ${borderElCls}` : '';

  return {
    [`&-item:not(${parentCls}-first-item):not(${parentCls}-last-item) ${childCombinator}`]: {
      borderRadius: 0,
    },

    [`&-item:not(${parentCls}-last-item)${parentCls}-first-item`]: {
      [`& ${childCombinator}, &${prefixCls}-sm ${childCombinator}, &${prefixCls}-lg ${childCombinator}`]:
        {
          borderStartEndRadius: 0,
          borderEndEndRadius: 0,
        },
    },

    [`&-item:not(${parentCls}-first-item)${parentCls}-last-item`]: {
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
  const { componentCls } = token;

  const compactCls = `${componentCls}-compact`;

  return {
    [compactCls]: {
      ...compactItemBorder(token, compactCls, options),
      ...compactItemBorderRadius(componentCls, compactCls, options),
    },
  };
}
