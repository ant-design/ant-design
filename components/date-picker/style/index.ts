import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import { genPlaceholderStyle, initInputToken } from '../../input/style';
import { resetComponent, textEllipsis } from '../../style';
import { genCompactItemStyle } from '../../style/compact-item';
import {
  initMoveMotion,
  initSlideMotion,
  slideDownIn,
  slideDownOut,
  slideUpIn,
  slideUpOut,
} from '../../style/motion';
import { genRoundedArrow } from '../../style/roundedArrow';
import type { GenerateStyle } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import genPickerMultipleStyle from './multiple';
import genPickerPanelStyle, { genPanelStyle } from './panel';
import type { ComponentToken, PanelComponentToken, PickerPanelToken, PickerToken } from './token';
import { initPanelComponentToken, initPickerPanelToken, prepareComponentToken } from './token';
import genVariantsStyle from './variants';

export type { ComponentToken, PanelComponentToken, PickerPanelToken };
export { initPickerPanelToken, initPanelComponentToken, genPanelStyle };

const genPickerPadding = (
  token: PickerToken,
  inputHeight: number,
  fontHeight: number,
  paddingHorizontal: number,
): CSSObject => {
  const height = token.calc(fontHeight).add(2).equal();
  const paddingTop = token.max(token.calc(inputHeight).sub(height).div(2).equal(), 0);
  const paddingBottom = token.max(token.calc(inputHeight).sub(height).sub(paddingTop).equal(), 0);

  return {
    padding: `${unit(paddingTop)} ${unit(paddingHorizontal)} ${unit(paddingBottom)}`,
  };
};

const genPickerStatusStyle: GenerateStyle<PickerToken> = (token) => {
  const { componentCls, colorError, colorWarning } = token;

  return {
    [`${componentCls}:not(${componentCls}-disabled):not([disabled])`]: {
      [`&${componentCls}-status-error`]: {
        [`${componentCls}-active-bar`]: {
          background: colorError,
        },
      },

      [`&${componentCls}-status-warning`]: {
        [`${componentCls}-active-bar`]: {
          background: colorWarning,
        },
      },
    },
  };
};

const genPickerStyle: GenerateStyle<PickerToken> = (token) => {
  const {
    componentCls,
    antCls,
    controlHeight,
    paddingInline,
    lineWidth,
    lineType,
    colorBorder,
    borderRadius,
    motionDurationMid,
    colorTextDisabled,
    colorTextPlaceholder,
    controlHeightLG,
    fontSizeLG,
    controlHeightSM,
    paddingInlineSM,
    paddingXS,
    marginXS,
    colorTextDescription,
    lineWidthBold,
    colorPrimary,
    motionDurationSlow,
    zIndexPopup,
    paddingXXS,
    sizePopupArrow,
    colorBgElevated,
    borderRadiusLG,
    boxShadowSecondary,
    borderRadiusSM,
    colorSplit,
    cellHoverBg,
    presetsWidth,
    presetsMaxWidth,
    boxShadowPopoverArrow,
    fontHeight,
    fontHeightLG,
    lineHeightLG,
  } = token;

  return [
    {
      [componentCls]: {
        ...resetComponent(token),
        ...genPickerPadding(token, controlHeight, fontHeight, paddingInline),
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        lineHeight: 1,
        borderRadius,
        transition: `border ${motionDurationMid}, box-shadow ${motionDurationMid}, background ${motionDurationMid}`,

        [`${componentCls}-prefix`]: {
          flex: '0 0 auto',
          marginInlineEnd: token.inputAffixPadding,
        },

        // ======================== Input =========================
        [`${componentCls}-input`]: {
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          width: '100%',

          '> input': {
            position: 'relative',
            display: 'inline-block',
            width: '100%',
            color: 'inherit',
            fontSize: token.fontSize,
            lineHeight: token.lineHeight,
            transition: `all ${motionDurationMid}`,
            ...genPlaceholderStyle(colorTextPlaceholder),
            flex: 'auto',

            // Fix Firefox flex not correct:
            // https://github.com/ant-design/ant-design/pull/20023#issuecomment-564389553
            minWidth: 1,
            height: 'auto',
            padding: 0,
            background: 'transparent',
            border: 0,
            fontFamily: 'inherit',

            '&:focus': {
              boxShadow: 'none',
              outline: 0,
            },

            '&[disabled]': {
              background: 'transparent',
              color: colorTextDisabled,
              cursor: 'not-allowed',
            },
          },

          '&-placeholder': {
            '> input': {
              color: colorTextPlaceholder,
            },
          },
        },

        // Size
        '&-large': {
          ...genPickerPadding(token, controlHeightLG, fontHeightLG, paddingInline),

          [`${componentCls}-input > input`]: {
            fontSize: fontSizeLG,
            lineHeight: lineHeightLG,
          },
        },

        '&-small': {
          ...genPickerPadding(token, controlHeightSM, fontHeight, paddingInlineSM),
        },

        [`${componentCls}-suffix`]: {
          display: 'flex',
          flex: 'none',
          alignSelf: 'center',
          marginInlineStart: token.calc(paddingXS).div(2).equal(),
          color: colorTextDisabled,
          lineHeight: 1,
          pointerEvents: 'none',
          transition: `opacity ${motionDurationMid}, color ${motionDurationMid}`,

          '> *': {
            verticalAlign: 'top',

            '&:not(:last-child)': {
              marginInlineEnd: marginXS,
            },
          },
        },

        [`${componentCls}-clear`]: {
          position: 'absolute',
          top: '50%',
          insetInlineEnd: 0,
          color: colorTextDisabled,
          lineHeight: 1,
          transform: 'translateY(-50%)',
          cursor: 'pointer',
          opacity: 0,
          transition: `opacity ${motionDurationMid}, color ${motionDurationMid}`,

          '> *': {
            verticalAlign: 'top',
          },

          '&:hover': {
            color: colorTextDescription,
          },
        },

        '&:hover': {
          [`${componentCls}-clear`]: {
            opacity: 1,
          },
          // Should use the following selector, but since `:has` has poor compatibility,
          // we use `:not(:last-child)` instead, which may cause some problems in some cases.
          // [`${componentCls}-suffix:has(+ ${componentCls}-clear)`]: {
          [`${componentCls}-suffix:not(:last-child)`]: {
            opacity: 0,
          },
        },

        [`${componentCls}-separator`]: {
          position: 'relative',
          display: 'inline-block',
          width: '1em',
          height: fontSizeLG,
          color: colorTextDisabled,
          fontSize: fontSizeLG,
          verticalAlign: 'top',
          cursor: 'default',

          [`${componentCls}-focused &`]: {
            color: colorTextDescription,
          },

          [`${componentCls}-range-separator &`]: {
            [`${componentCls}-disabled &`]: {
              cursor: 'not-allowed',
            },
          },
        },

        // ======================== Range =========================
        '&-range': {
          position: 'relative',
          display: 'inline-flex',

          // Active bar
          [`${componentCls}-active-bar`]: {
            bottom: token.calc(lineWidth).mul(-1).equal(),
            height: lineWidthBold,
            background: colorPrimary,
            opacity: 0,
            transition: `all ${motionDurationSlow} ease-out`,
            pointerEvents: 'none',
          },

          [`&${componentCls}-focused`]: {
            [`${componentCls}-active-bar`]: {
              opacity: 1,
            },
          },

          [`${componentCls}-range-separator`]: {
            alignItems: 'center',
            padding: `0 ${unit(paddingXS)}`,
            lineHeight: 1,
          },
        },

        // ======================== Clear =========================
        '&-range, &-multiple': {
          // Clear
          [`${componentCls}-clear`]: {
            insetInlineEnd: paddingInline,
          },

          [`&${componentCls}-small`]: {
            [`${componentCls}-clear`]: {
              insetInlineEnd: paddingInlineSM,
            },
          },
        },

        // ======================= Dropdown =======================
        '&-dropdown': {
          ...resetComponent(token),
          ...genPanelStyle(token),
          pointerEvents: 'none',
          position: 'absolute',
          // Fix incorrect position of picker popup
          // https://github.com/ant-design/ant-design/issues/35590
          top: -9999,
          left: {
            _skip_check_: true,
            value: -9999,
          },
          zIndex: zIndexPopup,

          [`&${componentCls}-dropdown-hidden`]: {
            display: 'none',
          },

          '&-rtl': {
            direction: 'rtl',
          },

          [`&${componentCls}-dropdown-placement-bottomLeft,
            &${componentCls}-dropdown-placement-bottomRight`]: {
            [`${componentCls}-range-arrow`]: {
              top: 0,
              display: 'block',
              transform: 'translateY(-100%)',
            },
          },

          [`&${componentCls}-dropdown-placement-topLeft,
            &${componentCls}-dropdown-placement-topRight`]: {
            [`${componentCls}-range-arrow`]: {
              bottom: 0,
              display: 'block',
              transform: 'translateY(100%) rotate(180deg)',
            },
          },

          [`&${antCls}-slide-up-appear, &${antCls}-slide-up-enter`]: {
            [`${componentCls}-range-arrow${componentCls}-range-arrow`]: {
              transition: 'none',
            },
          },

          [`&${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-topLeft,
          &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-topRight,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-topLeft,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-topRight`]:
            {
              animationName: slideDownIn,
            },

          [`&${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-bottomLeft,
          &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-bottomRight,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-bottomLeft,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-bottomRight`]:
            {
              animationName: slideUpIn,
            },

          // https://github.com/ant-design/ant-design/issues/48727
          [`&${antCls}-slide-up-leave ${componentCls}-panel-container`]: {
            pointerEvents: 'none',
          },

          [`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-topLeft,
          &${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-topRight`]:
            {
              animationName: slideDownOut,
            },

          [`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-bottomLeft,
          &${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-bottomRight`]:
            {
              animationName: slideUpOut,
            },

          // Time picker with additional style
          [`${componentCls}-panel > ${componentCls}-time-panel`]: {
            paddingTop: paddingXXS,
          },

          // ======================== Ranges ========================

          [`${componentCls}-range-wrapper`]: {
            display: 'flex',
            position: 'relative',
          },

          [`${componentCls}-range-arrow`]: {
            position: 'absolute',
            zIndex: 1,
            display: 'none',
            paddingInline: token.calc(paddingInline).mul(1.5).equal(),
            boxSizing: 'content-box',
            transition: `all ${motionDurationSlow} ease-out`,
            ...genRoundedArrow(token, colorBgElevated, boxShadowPopoverArrow),

            '&:before': {
              insetInlineStart: token.calc(paddingInline).mul(1.5).equal(),
            },
          },

          [`${componentCls}-panel-container`]: {
            overflow: 'hidden',
            verticalAlign: 'top',
            background: colorBgElevated,
            borderRadius: borderRadiusLG,
            boxShadow: boxShadowSecondary,
            transition: `margin ${motionDurationSlow}`,
            display: 'inline-block',
            pointerEvents: 'auto',

            // ======================== Layout ========================
            [`${componentCls}-panel-layout`]: {
              display: 'flex',
              flexWrap: 'nowrap',
              alignItems: 'stretch',
            },

            // ======================== Preset ========================
            [`${componentCls}-presets`]: {
              display: 'flex',
              flexDirection: 'column',
              minWidth: presetsWidth,
              maxWidth: presetsMaxWidth,

              ul: {
                height: 0,
                flex: 'auto',
                listStyle: 'none',
                overflow: 'auto',
                margin: 0,
                padding: paddingXS,
                borderInlineEnd: `${unit(lineWidth)} ${lineType} ${colorSplit}`,

                li: {
                  ...textEllipsis,
                  borderRadius: borderRadiusSM,
                  paddingInline: paddingXS,
                  paddingBlock: token.calc(controlHeightSM).sub(fontHeight).div(2).equal(),
                  cursor: 'pointer',
                  transition: `all ${motionDurationSlow}`,

                  '+ li': {
                    marginTop: marginXS,
                  },

                  '&:hover': {
                    background: cellHoverBg,
                  },
                },
              },
            },

            // ======================== Panels ========================
            [`${componentCls}-panels`]: {
              display: 'inline-flex',
              flexWrap: 'nowrap',

              // [`${componentCls}-panel`]: {
              //   borderWidth: `0 0 ${unit(lineWidth)}`,
              // },

              '&:last-child': {
                [`${componentCls}-panel`]: {
                  borderWidth: 0,
                },
              },
            },

            [`${componentCls}-panel`]: {
              verticalAlign: 'top',
              background: 'transparent',
              borderRadius: 0,
              borderWidth: 0,

              [`${componentCls}-content, table`]: {
                textAlign: 'center',
              },

              '&-focused': {
                borderColor: colorBorder,
              },
            },
          },
        },

        '&-dropdown-range': {
          padding: `${unit(token.calc(sizePopupArrow).mul(2).div(3).equal())} 0`,

          '&-hidden': {
            display: 'none',
          },
        },

        '&-rtl': {
          direction: 'rtl',

          [`${componentCls}-separator`]: {
            transform: 'scale(-1, 1)',
          },

          [`${componentCls}-footer`]: {
            '&-extra': {
              direction: 'rtl',
            },
          },
        },
      },
    },

    // Follow code may reuse in other components
    initSlideMotion(token, 'slide-up'),
    initSlideMotion(token, 'slide-down'),
    initMoveMotion(token, 'move-up'),
    initMoveMotion(token, 'move-down'),
  ];
};

// ============================== Export ==============================
export default genStyleHooks(
  'DatePicker',
  (token) => {
    const pickerToken = mergeToken<PickerToken>(
      initInputToken(token),
      initPickerPanelToken(token),
      {
        inputPaddingHorizontalBase: token.calc(token.paddingSM).sub(1).equal(),
        multipleSelectItemHeight: token.multipleItemHeight,
        selectHeight: token.controlHeight,
      },
    );
    return [
      genPickerPanelStyle(pickerToken),
      genPickerStyle(pickerToken),
      genVariantsStyle(pickerToken),
      genPickerStatusStyle(pickerToken),
      genPickerMultipleStyle(pickerToken),
      // =====================================================
      // ==             Space Compact                       ==
      // =====================================================
      genCompactItemStyle(token, {
        focusElCls: `${token.componentCls}-focused`,
      }),
    ];
  },
  prepareComponentToken,
);
