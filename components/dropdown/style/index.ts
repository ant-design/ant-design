import type { CSSProperties } from 'react';
import { unit } from '@ant-design/cssinjs';

import { genFocusStyle, resetComponent } from '../../style';
import {
  initMoveMotion,
  initSlideMotion,
  initZoomMotion,
  slideDownIn,
  slideDownOut,
  slideUpIn,
  slideUpOut,
} from '../../style/motion';
import type { ArrowOffsetToken } from '../../style/placementArrow';
import getArrowStyle, { getArrowOffsetToken } from '../../style/placementArrow';
import type { ArrowToken } from '../../style/roundedArrow';
import { getArrowToken } from '../../style/roundedArrow';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';
import genStatusStyle from './status';

export interface ComponentToken extends ArrowToken, ArrowOffsetToken {
  /**
   * @desc 下拉菜单 z-index
   * @descEN z-index of dropdown
   */
  zIndexPopup: number;
  /**
   * @desc 下拉菜单纵向内边距
   * @descEN Vertical padding of dropdown
   */
  paddingBlock: CSSProperties['paddingBlock'];
}

/**
 * @desc Dropdown 组件的 Token
 * @descEN Token for Dropdown component
 */
export interface DropdownToken extends FullToken<'Dropdown'> {
  /**
   * @desc 下拉箭头距离
   * @descEN Distance of dropdown arrow
   */
  dropdownArrowDistance: number | string;
  /**
   * @desc 下拉菜单边缘子项内边距
   * @descEN Padding of edge child in dropdown menu
   */
  dropdownEdgeChildPadding: number;
  /**
   * @desc 菜单类名
   * @descEN Menu class name
   */
  menuCls: string;
}

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<DropdownToken> = (token) => {
  const {
    componentCls,
    menuCls,
    zIndexPopup,
    dropdownArrowDistance,
    sizePopupArrow,
    antCls,
    iconCls,
    motionDurationMid,
    paddingBlock,
    fontSize,
    dropdownEdgeChildPadding,
    colorTextDisabled,
    fontSizeIcon,
    controlPaddingHorizontal,
    colorBgElevated,
  } = token;

  return [
    {
      [componentCls]: {
        position: 'absolute',
        top: -9999,
        left: {
          _skip_check_: true,
          value: -9999,
        },
        zIndex: zIndexPopup,
        display: 'block',

        // A placeholder out of dropdown visible range to avoid close when user moving
        '&::before': {
          position: 'absolute',
          insetBlock: token.calc(sizePopupArrow).div(2).sub(dropdownArrowDistance).equal(),
          // insetInlineStart: -7, // FIXME: Seems not work for hidden element
          zIndex: -9999,
          opacity: 0.0001,
          content: '""',
        },

        // Makes vertical dropdowns have a scrollbar once they become taller than the viewport.
        '&-menu-vertical': {
          maxHeight: '100vh',
          overflowY: 'auto',
        },

        [`&-trigger${antCls}-btn`]: {
          [`& > ${iconCls}-down, & > ${antCls}-btn-icon > ${iconCls}-down`]: {
            fontSize: fontSizeIcon,
          },
        },

        [`${componentCls}-wrap`]: {
          position: 'relative',

          [`${antCls}-btn > ${iconCls}-down`]: {
            fontSize: fontSizeIcon,
          },

          [`${iconCls}-down::before`]: {
            transition: `transform ${motionDurationMid}`,
          },
        },

        [`${componentCls}-wrap-open`]: {
          [`${iconCls}-down::before`]: {
            transform: `rotate(180deg)`,
          },
        },

        [`
        &-hidden,
        &-menu-hidden,
        &-menu-submenu-hidden
      `]: {
          display: 'none',
        },

        // =============================================================
        // ==                         Motion                          ==
        // =============================================================
        // When position is not enough for dropdown, the placement will revert.
        // We will handle this with revert motion name.
        [`&${antCls}-slide-down-enter${antCls}-slide-down-enter-active${componentCls}-placement-bottomLeft,
          &${antCls}-slide-down-appear${antCls}-slide-down-appear-active${componentCls}-placement-bottomLeft,
          &${antCls}-slide-down-enter${antCls}-slide-down-enter-active${componentCls}-placement-bottom,
          &${antCls}-slide-down-appear${antCls}-slide-down-appear-active${componentCls}-placement-bottom,
          &${antCls}-slide-down-enter${antCls}-slide-down-enter-active${componentCls}-placement-bottomRight,
          &${antCls}-slide-down-appear${antCls}-slide-down-appear-active${componentCls}-placement-bottomRight`]:
          {
            animationName: slideUpIn,
          },

        [`&${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-placement-topLeft,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-placement-topLeft,
          &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-placement-top,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-placement-top,
          &${antCls}-slide-up-enter${antCls}-slide-up-enter-active${componentCls}-placement-topRight,
          &${antCls}-slide-up-appear${antCls}-slide-up-appear-active${componentCls}-placement-topRight`]:
          {
            animationName: slideDownIn,
          },

        [`&${antCls}-slide-down-leave${antCls}-slide-down-leave-active${componentCls}-placement-bottomLeft,
          &${antCls}-slide-down-leave${antCls}-slide-down-leave-active${componentCls}-placement-bottom,
          &${antCls}-slide-down-leave${antCls}-slide-down-leave-active${componentCls}-placement-bottomRight`]:
          {
            animationName: slideUpOut,
          },

        [`&${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-placement-topLeft,
          &${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-placement-top,
          &${antCls}-slide-up-leave${antCls}-slide-up-leave-active${componentCls}-placement-topRight`]:
          {
            animationName: slideDownOut,
          },
      },
    },

    // =============================================================
    // ==                        Arrow style                      ==
    // =============================================================
    getArrowStyle<DropdownToken>(token, colorBgElevated, {
      arrowPlacement: { top: true, bottom: true },
    }),

    {
      // =============================================================
      // ==                          Menu                           ==
      // =============================================================
      [`${componentCls} ${menuCls}`]: {
        position: 'relative',
        margin: 0,
      },

      [`${menuCls}-submenu-popup`]: {
        position: 'absolute',
        zIndex: zIndexPopup,
        background: 'transparent',
        boxShadow: 'none',
        transformOrigin: '0 0',

        'ul, li': {
          listStyle: 'none',
          margin: 0,
        },
      },

      [`${componentCls}, ${componentCls}-menu-submenu`]: {
        ...resetComponent(token),

        [menuCls]: {
          padding: dropdownEdgeChildPadding,
          listStyleType: 'none',
          backgroundColor: colorBgElevated,
          backgroundClip: 'padding-box',
          borderRadius: token.borderRadiusLG,
          outline: 'none',
          boxShadow: token.boxShadowSecondary,
          ...genFocusStyle(token),

          '&:empty': {
            padding: 0,
            boxShadow: 'none',
          },

          [`${menuCls}-item-group-title`]: {
            padding: `${unit(paddingBlock!)} ${unit(controlPaddingHorizontal)}`,
            color: token.colorTextDescription,
            transition: `all ${motionDurationMid}`,
          },

          // ======================= Item Content =======================
          [`${menuCls}-item`]: {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          },

          [`${menuCls}-item-icon`]: {
            minWidth: fontSize,
            marginInlineEnd: token.marginXS,
            fontSize: token.fontSizeSM,
          },

          [`${menuCls}-title-content`]: {
            flex: 'auto',

            '&-with-extra': {
              display: 'inline-flex',
              alignItems: 'center',
              width: '100%',
            },

            '> a': {
              color: 'inherit',
              transition: `all ${motionDurationMid}`,

              '&:hover': {
                color: 'inherit',
              },

              '&::after': {
                position: 'absolute',
                inset: 0,
                content: '""',
              },
            },

            [`${menuCls}-item-extra`]: {
              paddingInlineStart: token.padding,
              marginInlineStart: 'auto',
              fontSize: token.fontSizeSM,
              color: token.colorTextDescription,
            },
          },

          // =========================== Item ===========================
          [`${menuCls}-item, ${menuCls}-submenu-title`]: {
            display: 'flex',
            margin: 0,
            padding: `${unit(paddingBlock!)} ${unit(controlPaddingHorizontal)}`,
            color: token.colorText,
            fontWeight: 'normal',
            fontSize,
            lineHeight: token.lineHeight,
            cursor: 'pointer',
            transition: `all ${motionDurationMid}`,
            borderRadius: token.borderRadiusSM,

            '&:hover, &-active': {
              backgroundColor: token.controlItemBgHover,
            },

            ...genFocusStyle(token),

            '&-selected': {
              color: token.colorPrimary,
              backgroundColor: token.controlItemBgActive,
              '&:hover, &-active': {
                backgroundColor: token.controlItemBgActiveHover,
              },
            },

            '&-disabled': {
              color: colorTextDisabled,
              cursor: 'not-allowed',

              '&:hover': {
                color: colorTextDisabled,
                backgroundColor: colorBgElevated,
                cursor: 'not-allowed',
              },

              a: {
                pointerEvents: 'none',
              },
            },

            '&-divider': {
              height: 1, // By design
              margin: `${unit(token.marginXXS)} 0`,
              overflow: 'hidden',
              lineHeight: 0,
              backgroundColor: token.colorSplit,
            },

            [`${componentCls}-menu-submenu-expand-icon`]: {
              position: 'absolute',
              insetInlineEnd: token.paddingXS,

              [`${componentCls}-menu-submenu-arrow-icon`]: {
                marginInlineEnd: '0 !important',
                color: token.colorTextDescription,
                fontSize: fontSizeIcon,
                fontStyle: 'normal',
              },
            },
          },

          [`${menuCls}-item-group-list`]: {
            margin: `0 ${unit(token.marginXS)}`,
            padding: 0,
            listStyle: 'none',
          },

          [`${menuCls}-submenu-title`]: {
            paddingInlineEnd: token.calc(controlPaddingHorizontal).add(token.fontSizeSM).equal(),
          },

          [`${menuCls}-submenu-vertical`]: {
            position: 'relative',
          },

          [`${menuCls}-submenu${menuCls}-submenu-disabled ${componentCls}-menu-submenu-title`]: {
            [`&, ${componentCls}-menu-submenu-arrow-icon`]: {
              color: colorTextDisabled,
              backgroundColor: colorBgElevated,
              cursor: 'not-allowed',
            },
          },

          // https://github.com/ant-design/ant-design/issues/19264
          [`${menuCls}-submenu-selected ${componentCls}-menu-submenu-title`]: {
            color: token.colorPrimary,
          },
        },
      },
    },

    // Follow code may reuse in other components
    [
      initSlideMotion(token, 'slide-up'),
      initSlideMotion(token, 'slide-down'),
      initMoveMotion(token, 'move-up'),
      initMoveMotion(token, 'move-down'),
      initZoomMotion(token, 'zoom-big'),
    ],
  ];
};

// ============================== Export ==============================
export const prepareComponentToken: GetDefaultToken<'Dropdown'> = (token) => ({
  zIndexPopup: token.zIndexPopupBase + 50,
  paddingBlock: (token.controlHeight - token.fontSize * token.lineHeight) / 2,
  ...getArrowOffsetToken({
    contentRadius: token.borderRadiusLG,
    limitVerticalRadius: true,
  }),
  ...getArrowToken(token),
});

export default genStyleHooks(
  'Dropdown',
  (token) => {
    const { marginXXS, sizePopupArrow, paddingXXS, componentCls } = token;

    const dropdownToken = mergeToken<DropdownToken>(token, {
      menuCls: `${componentCls}-menu`,
      dropdownArrowDistance: token.calc(sizePopupArrow).div(2).add(marginXXS).equal(),
      dropdownEdgeChildPadding: paddingXXS,
    });
    return [genBaseStyle(dropdownToken), genStatusStyle(dropdownToken)];
  },
  prepareComponentToken,
  { resetStyle: false },
);
