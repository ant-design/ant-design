import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../_util/theme';
import { resetComponent } from '../../_util/theme';
import {
  initSlideMotion,
  slideUpIn,
  slideUpOut,
  slideDownIn,
  slideDownOut,
} from '../../style/motion';
import type { SelectToken } from '.';

const genItemStyle: GenerateStyle<SelectToken, CSSObject> = token => {
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
  };
};

const genSingleStyle: GenerateStyle<SelectToken> = token => {
  const { rootPrefixCls, antCls, componentCls } = token;

  const selectItemCls = `${componentCls}-item`;

  return [
    {
      [`${componentCls}-dropdown`]: {
        // ========================== Popup ==========================
        ...resetComponent(token),

        position: 'absolute',
        top: -9999,
        zIndex: token.zIndexDropdown,
        boxSizing: 'border-box',
        padding: `${token.paddingXXS}px 0`,
        overflow: 'hidden',
        fontSize: token.fontSize,
        // Fix select render lag of long text in chrome
        // https://github.com/ant-design/ant-design/issues/11456
        // https://github.com/ant-design/ant-design/issues/11843
        fontVariant: 'initial',
        backgroundColor: token.colorBgComponent,
        borderRadius: token.controlRadius,
        outline: 'none',
        boxShadow: token.boxShadow,

        [`
            &${antCls}-slide-up-enter${antCls}-slide-up-enter-active&-placement-bottomLeft,
            &${antCls}-slide-up-appear${antCls}-slide-up-appear-active&-placement-bottomLeft
          `]: {
          animationName: slideUpIn,
        },

        [`
            &${antCls}-slide-up-enter${antCls}-slide-up-enter-active&-placement-topLeft,
            &${antCls}-slide-up-appear${antCls}-slide-up-appear-active&-placement-topLeft
          `]: {
          animationName: slideDownIn,
        },

        [`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active&-placement-bottomLeft`]: {
          animationName: slideUpOut,
        },

        [`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active&-placement-topLeft`]: {
          animationName: slideDownOut,
        },

        '&-hidden': {
          display: 'none',
        },

        '&-empty': {
          color: token.colorTextDisabled,
        },

        // ========================= Options =========================
        [`${selectItemCls}-empty`]: {
          ...genItemStyle(token),
          color: token.colorTextDisabled,
        },

        [`${selectItemCls}`]: {
          ...genItemStyle(token),
          cursor: 'pointer',
          transition: `background ${token.motionDurationSlow} ease`,

          // =========== Group ============
          '&-group': {
            color: token.colorTextSecondary,
            fontSize: token.fontSizeSM,
            cursor: 'default',
          },

          // =========== Option ===========
          '&-option': {
            display: 'flex',

            '&-content': {
              flex: 'auto',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            },

            '&-state': {
              flex: 'none',
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
                backgroundColor: token.colorBgComponentDisabled,
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
    initSlideMotion(rootPrefixCls, 'slide-up', slideUpIn, slideUpOut, token),
    initSlideMotion(rootPrefixCls, 'slide-down', slideDownIn, slideDownOut, token),
  ];
};

export default genSingleStyle;
