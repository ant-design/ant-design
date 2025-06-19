import { unit, type CSSObject } from '@ant-design/cssinjs';

import type { FloatButtonToken } from '.';
import type { GenerateStyle } from '../../theme/interface';
import { genCssVar } from '../../theme/util/genStyleUtils';

const genFloatButtonStyle: GenerateStyle<FloatButtonToken, CSSObject> = (token) => {
  const { componentCls, floatButtonSize, iconCls, antCls, floatButtonIconSize } = token;

  // Default: '--ant-float-btn-'
  const getCssVar = genCssVar(antCls, 'float-btn');

  return {
    [componentCls]: [
      // ==============================================================
      // ==                         Variable                         ==
      // ==============================================================
      {
        [getCssVar('size')]: unit(floatButtonSize),
      },

      // ==============================================================
      // ==                         Template                         ==
      // ==============================================================
      {
        flexDirection: 'column',
        margin: 0,
        padding: `${unit(token.paddingXXS)} 0`,

        width: `var(${getCssVar('size')})`,
        minHeight: `var(${getCssVar('size')})`,
        height: 'auto',
        wordBreak: 'break-word',
        whiteSpace: 'normal',
        gap: token.calc(token.paddingXXS).div(2).equal(),

        // ======================== Individual ========================
        // Not in group
        [`&${componentCls}-individual`]: {
          position: 'fixed',
          zIndex: token.zIndexPopupBase,
          insetInlineEnd: token.floatButtonInsetInlineEnd,
          bottom: token.floatButtonInsetBlockEnd,
          boxShadow: token.boxShadowSecondary,
        },

        // =========================== Type ===========================

        // =========================== Pure ===========================
        '&-pure': {
          position: 'relative',
          inset: 'auto',
        },

        // ========================== Empty ===========================
        '&:empty': {
          display: 'none',
        },

        // =========================== Icon ===========================
        [`${componentCls}-icon`]: {
          lineHeight: 1,
        },

        // Icon Only will has large icon Size
        [`&${componentCls}-icon-only`]: {
          [iconCls]: {
            fontSize: floatButtonIconSize,
          },
        },

        // =========================== Desc ===========================
        [`${componentCls}-content`]: {
          fontSize: token.fontSizeSM,
        },
      },
    ],
  };
};

export default genFloatButtonStyle;
