import type { CSSObject } from '@ant-design/cssinjs';

import { resetComponent, textEllipsis } from '../../style';
import {
  initMoveMotion,
  initSlideMotion,
  slideDownIn,
  slideDownOut,
  slideUpIn,
  slideUpOut,
} from '../../style/motion';
import type { GenerateStyle } from '../../theme/internal';
import type { SelectToken } from './token';

const genItemStyle: GenerateStyle<SelectToken, CSSObject> = (token) => {
  const { optionHeight, optionFontSize, optionLineHeight, optionPadding } = token;

  return {
    position: 'relative',
    display: 'block',
    minHeight: optionHeight,
    padding: optionPadding,
    color: token.colorText,
    fontWeight: 'normal',
    fontSize: optionFontSize,
    lineHeight: optionLineHeight,
    boxSizing: 'border-box',
  };
};

const genSingleStyle: GenerateStyle<SelectToken> = (token) => {
  const { antCls, componentCls } = token;

  const selectItemCls = `${componentCls}-item`;

  const slideUpEnterActive = `&${antCls}-slide-up-enter${antCls}-slide-up-enter-active`;
  const slideUpAppearActive = `&${antCls}-slide-up-appear${antCls}-slide-up-appear-active`;
  const slideUpLeaveActive = `&${antCls}-slide-up-leave${antCls}-slide-up-leave-active`;

  const dropdownPlacementCls = `${componentCls}-dropdown-placement-`;
  const selectedItemCls = `${selectItemCls}-option-selected`;

  return [
    {
      [`${componentCls}-dropdown`]: {
        // ========================== Popup ==========================
        ...resetComponent(token),

        position: 'absolute',
        top: -9999,
        zIndex: token.zIndexPopup,
        boxSizing: 'border-box',
        padding: token.paddingXXS,
        overflow: 'hidden',
        fontSize: token.fontSize,
        // Fix select render lag of long text in chrome
        // https://github.com/ant-design/ant-design/issues/11456
        // https://github.com/ant-design/ant-design/issues/11843
        fontVariant: 'initial',
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        outline: 'none',
        boxShadow: token.boxShadowSecondary,

        [`
          ${slideUpEnterActive}${dropdownPlacementCls}bottomLeft,
          ${slideUpAppearActive}${dropdownPlacementCls}bottomLeft
        `]: {
          animationName: slideUpIn,
        },

        [`
          ${slideUpEnterActive}${dropdownPlacementCls}topLeft,
          ${slideUpAppearActive}${dropdownPlacementCls}topLeft,
          ${slideUpEnterActive}${dropdownPlacementCls}topRight,
          ${slideUpAppearActive}${dropdownPlacementCls}topRight
        `]: {
          animationName: slideDownIn,
        },

        [`${slideUpLeaveActive}${dropdownPlacementCls}bottomLeft`]: {
          animationName: slideUpOut,
        },

        [`
          ${slideUpLeaveActive}${dropdownPlacementCls}topLeft,
          ${slideUpLeaveActive}${dropdownPlacementCls}topRight
        `]: {
          animationName: slideDownOut,
        },

        '&-hidden': {
          display: 'none',
        },

        [selectItemCls]: {
          ...genItemStyle(token),
          cursor: 'pointer',
          transition: `background ${token.motionDurationSlow} ease`,
          borderRadius: token.borderRadiusSM,

          // =========== Group ============
          '&-group': {
            color: token.colorTextDescription,
            fontSize: token.fontSizeSM,
            cursor: 'default',
          },

          // =========== Option ===========
          '&-option': {
            display: 'flex',

            '&-content': {
              flex: 'auto',
              ...textEllipsis,
            },

            '&-state': {
              flex: 'none',
              display: 'flex',
              alignItems: 'center',
            },

            [`&-active:not(${selectItemCls}-option-disabled)`]: {
              backgroundColor: token.optionActiveBg,
            },

            [`&-selected:not(${selectItemCls}-option-disabled)`]: {
              color: token.optionSelectedColor,
              fontWeight: token.optionSelectedFontWeight,
              backgroundColor: token.optionSelectedBg,

              [`${selectItemCls}-option-state`]: {
                color: token.colorPrimary,
              },
            },

            '&-disabled': {
              [`&${selectItemCls}-option-selected`]: {
                backgroundColor: token.colorBgContainerDisabled,
              },

              color: token.colorTextDisabled,
              cursor: 'not-allowed',
            },

            '&-grouped': {
              paddingInlineStart: token.calc(token.controlPaddingHorizontal).mul(2).equal(),
            },
          },

          '&-empty': {
            ...genItemStyle(token),
            color: token.colorTextDisabled,
          },
        },

        // https://github.com/ant-design/ant-design/pull/46646
        [`${selectedItemCls}:has(+ ${selectedItemCls})`]: {
          borderEndStartRadius: 0,
          borderEndEndRadius: 0,

          [`& + ${selectedItemCls}`]: {
            borderStartStartRadius: 0,
            borderStartEndRadius: 0,
          },
        },

        // =========================== RTL ===========================
        '&-rtl': {
          direction: 'rtl',
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

export default genSingleStyle;
