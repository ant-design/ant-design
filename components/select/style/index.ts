import type { CSSObject } from '@ant-design/cssinjs';

import { resetComponent, textEllipsis } from '../../style';
import { genCompactItemStyle } from '../../style/compact-item';
import type { GenerateStyle } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import genDropdownStyle from './dropdown';
import genSelectInputStyle from './select-input';
import type { ComponentToken, SelectToken } from './token';
import { prepareComponentToken } from './token';

export type { ComponentToken };

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<SelectToken> = (token) => {
  const { antCls, componentCls, inputPaddingHorizontalBase } = token;

  const hoverShowClearStyle: CSSObject = {
    [`${componentCls}-clear`]: {
      opacity: 1,
      background: token.colorBgBase,
      borderRadius: '50%',
    },
  };

  return {
    [componentCls]: {
      ...resetComponent(token),

      // ======================== Selection ========================
      [`${componentCls}-selection-item`]: {
        flex: 1,
        fontWeight: 'normal',
        position: 'relative',
        userSelect: 'none',
        ...textEllipsis,

        // https://github.com/ant-design/ant-design/issues/40421
        [`> ${antCls}-typography`]: {
          display: 'inline',
        },
      },

      // ========================= Prefix ==========================
      [`${componentCls}-prefix`]: {
        flex: 'none',
        marginInlineEnd: token.selectAffixPadding,
      },

      // ========================== Clear ==========================
      [`${componentCls}-clear`]: {
        position: 'absolute',
        top: '50%',
        insetInlineStart: 'auto',
        insetInlineEnd: inputPaddingHorizontalBase,
        zIndex: 1,
        display: 'inline-block',
        width: token.fontSizeIcon,
        height: token.fontSizeIcon,
        marginTop: token.calc(token.fontSizeIcon).mul(-1).div(2).equal(),
        color: token.colorTextQuaternary,
        fontSize: token.fontSizeIcon,
        fontStyle: 'normal',
        lineHeight: 1,
        textAlign: 'center',
        textTransform: 'none',
        cursor: 'pointer',
        opacity: 0,
        transition: `color ${token.motionDurationMid} ease, opacity ${token.motionDurationSlow} ease`,
        textRendering: 'auto',
        // https://github.com/ant-design/ant-design/issues/54205
        // Force GPU compositing on Safari to prevent flickering on opacity/transform transitions
        transform: 'translateZ(0)',

        '&:before': {
          display: 'block',
        },

        '&:hover': {
          color: token.colorIcon,
        },
      },

      '@media(hover:none)': hoverShowClearStyle,
      '&:hover': hoverShowClearStyle,
    },

    // ========================= Feedback ==========================
    [`${componentCls}-status`]: {
      '&-error, &-warning, &-success, &-validating': {
        [`&${componentCls}-has-feedback`]: {
          [`${componentCls}-clear`]: {
            insetInlineEnd: token
              .calc(inputPaddingHorizontalBase)
              .add(token.fontSize)
              .add(token.paddingXS)
              .equal(),
          },
        },
      },
    },
  };
};

// ============================== Styles ==============================
const genSelectStyle: GenerateStyle<SelectToken> = (token) => {
  const { componentCls } = token;

  return [
    {
      [componentCls]: {
        // ==================== In Form ====================
        [`&${componentCls}-in-form-item`]: {
          width: '100%',
        },
      },
    },

    // =====================================================
    // ==                       LTR                       ==
    // =====================================================
    // Base
    genBaseStyle(token),

    // Dropdown
    genDropdownStyle(token),

    // =====================================================
    // ==                       RTL                       ==
    // =====================================================
    {
      [`${componentCls}-rtl`]: {
        direction: 'rtl',
      },
    },

    // =====================================================
    // ==             Space Compact                       ==
    // =====================================================
    genCompactItemStyle(token, {
      focusElCls: `${componentCls}-focused`,
    }),
  ];
};

// ============================== Export ==============================
export default genStyleHooks(
  'Select',
  (token, { rootPrefixCls }) => {
    const selectToken: SelectToken = mergeToken<SelectToken>(token, {
      rootPrefixCls,
      inputPaddingHorizontalBase: token.calc(token.paddingSM).sub(token.lineWidth).equal(),
      multipleSelectItemHeight: token.multipleItemHeight,
      selectHeight: token.controlHeight,
      colorTextPlaceholder: `rgba(${token.colorTextPlaceholder}, 0.5)`,
    });

    return [genSelectStyle(selectToken), genSelectInputStyle(selectToken)];
  },
  prepareComponentToken,
  {
    unitless: {
      optionLineHeight: true,
      optionSelectedFontWeight: true,
    },
  },
);
