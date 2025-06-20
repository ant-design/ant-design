import { unit } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import type { FloatButtonToken } from '.';
import { resetComponent } from '../../style';
import type { GenerateStyle } from '../../theme/interface';
import { genCssVar } from '../../theme/util/genStyleUtils';

const genGroupStyle: GenerateStyle<FloatButtonToken, CSSObject> = (token) => {
  const { componentCls, antCls, floatButtonSize, padding } = token;

  const groupCls = `${componentCls}-group`;
  const listCls = `${groupCls}-list`;

  // Default: '--ant-float-btn-'
  const getCssVar = genCssVar(antCls, 'float-btn');

  return {
    [groupCls]: [
      // ==============================================================
      // ==                         Variable                         ==
      // ==============================================================
      {
        [getCssVar('list-transform-start')]: `translate(0,${unit(floatButtonSize)})`,
        [getCssVar('list-trigger-offset')]: `calc(${unit(floatButtonSize)} + ${unit(padding)})`,
      },

      // ==============================================================
      // ==                         Template                         ==
      // ==============================================================
      {
        ...resetComponent(token),
        position: 'fixed',
        zIndex: token.zIndexPopupBase,
        insetInlineEnd: token.floatButtonInsetInlineEnd,
        bottom: token.floatButtonInsetBlockEnd,
        gap: padding,

        '&-rtl': {
          direction: 'rtl',
        },

        // =========================== Pure ===========================
        [`&${componentCls}-pure`]: {
          position: 'relative',
          inset: 'auto',
        },

        // ========================== Button ==========================
        [componentCls]: {
          position: 'relative',
          inset: 'auto',
        },
      },

      // ==============================================================
      // ==                           List                           ==
      // ==============================================================
      {
        // ======================== Individual ========================
        // Not in group
        [`&:not(${groupCls}-individual) ${listCls}`]: {
          boxShadow: token.boxShadowSecondary,
        },

        [`&${groupCls}-individual ${listCls}`]: {
          gap: padding,
        },

        // =========================== Menu ===========================
        [`&-menu-mode ${listCls}`]: {
          position: 'absolute',
        },

        // ========================== Motion ==========================
        [listCls]: {
          borderRadius: token.borderRadiusLG,

          '&-motion': {
            transition: `all ${token.motionDurationSlow}`,

            '&-enter, &-appear': {
              opacity: 0,
              transform: getCssVar('list-transform-start', true),

              '&-active': {
                opacity: 1,
                transform: `translate(0, 0)`,
              },
            },

            '&-leave': {
              '&-active': {
                opacity: 0,
                transform: getCssVar('list-transform-start', true),
              },
            },
          },
        },

        // ======================== Placements ========================
        '&-top': {
          [listCls]: {
            bottom: getCssVar('list-trigger-offset', true),
          },
        },

        '&-bottom': {
          [listCls]: {
            [getCssVar('list-transform-start')]:
              `translate(0, calc(${unit(floatButtonSize)} * -1))`,
            top: getCssVar('list-trigger-offset', true),
          },
        },

        '&-left': {
          [listCls]: {
            [getCssVar('list-transform-start')]: `translate(${unit(floatButtonSize)}, 0)`,
            right: getCssVar('list-trigger-offset', true),
          },
        },

        '&-right': {
          [listCls]: {
            [getCssVar('list-transform-start')]:
              `translate(calc(${unit(floatButtonSize)} * -1), 0)`,
            left: getCssVar('list-trigger-offset', true),
          },
        },
      },
    ],
  };
};

export default genGroupStyle;
