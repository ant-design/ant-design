import type { CSSObject } from '@ant-design/cssinjs';
import type { SelectToken } from '.';
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

const genItemStyle: GenerateStyle<SelectToken, CSSObject> = (token) => {
  const { controlPaddingHorizontal } = token;

  return {
    position: 'relative',
    display: 'block',
    minHeight: token.controlHeight,
    padding: `${
      (token.controlHeight - token.fontSize * token.lineHeight) / 2
    }px ${controlPaddingHorizontal}px`,
    color: token.colorText,
    fontWeight: 'normal',
    fontSize: token.fontSize,
    lineHeight: token.lineHeight,
    boxSizing: 'border-box',
  };
};

const genSingleStyle: GenerateStyle<SelectToken> = (token) => {
  const { antCls, componentCls } = token;

  const selectItemCls = `${componentCls}-item`;

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
            &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-bottomLeft,
            &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-bottomLeft
          `]: {
          animationName: slideUpIn,
        },

        [`
            &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-dropdown-placement-topLeft,
            &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-dropdown-placement-topLeft
          `]: {
          animationName: slideDownIn,
        },

        [`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-bottomLeft`]:
          {
            animationName: slideUpOut,
          },

        [`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-dropdown-placement-topLeft`]:
          {
            animationName: slideDownOut,
          },

        '&-hidden': {
          display: 'none',
        },

        [`${selectItemCls}`]: {
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
              backgroundColor: token.controlItemBgHover,
            },

            [`&-selected:not(${selectItemCls}-option-disabled)`]: {
              color: token.colorText,
              fontWeight: token.fontWeightStrong,
              backgroundColor: token.controlItemBgActive,

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
              paddingInlineStart: token.controlPaddingHorizontal * 2,
            },
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
