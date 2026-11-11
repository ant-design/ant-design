import type { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';

import type { AliasToken, CSSUtil, FullToken, OverrideComponent } from '../theme/internal';

interface CompactItemOptions {
  componentCls?: string;

  focus?: boolean;
  /**
   * Some components have special `focus` className especially with popovers
   * like `Select` and `DatePicker`
   */
  focusElCls?: string;
}

// handle border collapse
function compactItemBorder(
  token: AliasToken & CSSUtil,
  parentCls: string,
  options: CompactItemOptions,
  prefixCls: string,
): CSSObject {
  const { focusElCls, focus } = options;
  const genEffects = (effects: (string | null)[]) =>
    effects
      .filter(Boolean)
      .map((n) => `&:${n}`)
      .join(',');
  const hoverEffects = genEffects(['hover', focusElCls ? `hover${focusElCls}` : null]);
  const focusEffects = genEffects([focus ? 'focus' : null, 'active']);

  return {
    [`&-item:not(${parentCls}-last-item)`]: {
      marginInlineEnd: token.calc(token.lineWidth).mul(-1).equal(),
    },

    [`&-item:not(${prefixCls}-status-success)`]: {
      zIndex: 2,
    },

    '&-item': {
      [focusEffects]: {
        zIndex: 3,
      },

      [hoverEffects]: {
        zIndex: 4,
      },

      ...(focusElCls
        ? {
            [`&${focusElCls}`]: {
              zIndex: 3,
            },
          }
        : {}),

      '&[disabled]': {
        zIndex: 0,
      },
    },
  };
}

// handle border-radius
function compactItemBorderRadius(prefixCls: string, parentCls: string): CSSObject {
  return {
    [`&-item:not(${parentCls}-first-item):not(${parentCls}-last-item)`]: {
      borderRadius: 0,
    },

    [`&-item:not(${parentCls}-last-item)${parentCls}-first-item`]: {
      [`&, &${prefixCls}-sm, &${prefixCls}-lg`]: {
        borderStartEndRadius: 0,
        borderEndEndRadius: 0,
      },
    },

    [`&-item:not(${parentCls}-first-item)${parentCls}-last-item`]: {
      [`&, &${prefixCls}-sm, &${prefixCls}-lg`]: {
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
  const { componentCls: customizePrefixCls } = options;

  const mergedComponentCls = customizePrefixCls || componentCls;

  const compactCls = `${mergedComponentCls}-compact`;

  return {
    [compactCls]: {
      ...compactItemBorder(token, compactCls, options, mergedComponentCls),
      ...compactItemBorderRadius(mergedComponentCls, compactCls),
    },
  };
}
