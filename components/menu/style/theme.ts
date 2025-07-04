import { unit } from '@ant-design/cssinjs';
import type { CSSInterpolation } from '@ant-design/cssinjs';

import type { MenuToken } from '.';
import { genFocusOutline } from '../../style';

const accessibilityFocus = (token: MenuToken) => ({
  ...genFocusOutline(token),
});

const getThemeStyle = (token: MenuToken, themeSuffix: string): CSSInterpolation => {
  const {
    componentCls,
    itemColor,
    itemSelectedColor,
    subMenuItemSelectedColor,
    groupTitleColor,
    itemBg,
    subMenuItemBg,
    itemSelectedBg,
    activeBarHeight,
    activeBarWidth,
    activeBarBorderWidth,
    motionDurationSlow,
    motionEaseInOut,
    motionEaseOut,
    itemPaddingInline,
    motionDurationMid,
    itemHoverColor,
    lineType,
    colorSplit,

    // Disabled
    itemDisabledColor,

    // Danger
    dangerItemColor,
    dangerItemHoverColor,
    dangerItemSelectedColor,
    dangerItemActiveBg,
    dangerItemSelectedBg,
    // Bg
    popupBg,
    itemHoverBg,
    itemActiveBg,
    menuSubMenuBg,

    // Horizontal
    horizontalItemSelectedColor,
    horizontalItemSelectedBg,
    horizontalItemBorderRadius,
    horizontalItemHoverBg,
  } = token;

  return {
    [`${componentCls}-${themeSuffix}, ${componentCls}-${themeSuffix} > ${componentCls}`]: {
      color: itemColor,
      background: itemBg,

      [`&${componentCls}-root:focus-visible`]: {
        ...accessibilityFocus(token),
      },

      // ======================== Item ========================
      [`${componentCls}-item`]: {
        '&-group-title, &-extra': {
          color: groupTitleColor,
        },
      },

      [`${componentCls}-submenu-selected > ${componentCls}-submenu-title`]: {
        color: subMenuItemSelectedColor,
      },

      [`${componentCls}-item, ${componentCls}-submenu-title`]: {
        color: itemColor,
        [`&:not(${componentCls}-item-disabled):focus-visible`]: {
          ...accessibilityFocus(token),
        },
      },

      // Disabled
      [`${componentCls}-item-disabled, ${componentCls}-submenu-disabled`]: {
        color: `${itemDisabledColor} !important`,
      },

      // Hover
      [`${componentCls}-item:not(${componentCls}-item-selected):not(${componentCls}-submenu-selected)`]:
        {
          [`&:hover, > ${componentCls}-submenu-title:hover`]: {
            color: itemHoverColor,
          },
        },

      [`&:not(${componentCls}-horizontal)`]: {
        [`${componentCls}-item:not(${componentCls}-item-selected)`]: {
          '&:hover': {
            backgroundColor: itemHoverBg,
          },

          '&:active': {
            backgroundColor: itemActiveBg,
          },
        },

        [`${componentCls}-submenu-title`]: {
          '&:hover': {
            backgroundColor: itemHoverBg,
          },

          '&:active': {
            backgroundColor: itemActiveBg,
          },
        },
      },

      // Danger - only Item has
      [`${componentCls}-item-danger`]: {
        color: dangerItemColor,

        [`&${componentCls}-item:hover`]: {
          [`&:not(${componentCls}-item-selected):not(${componentCls}-submenu-selected)`]: {
            color: dangerItemHoverColor,
          },
        },

        [`&${componentCls}-item:active`]: {
          background: dangerItemActiveBg,
        },
      },

      [`${componentCls}-item a`]: {
        '&, &:hover': {
          color: 'inherit',
        },
      },

      [`${componentCls}-item-selected`]: {
        color: itemSelectedColor,

        // Danger
        [`&${componentCls}-item-danger`]: {
          color: dangerItemSelectedColor,
        },

        'a, a:hover': {
          color: 'inherit',
        },
      },

      [`& ${componentCls}-item-selected`]: {
        backgroundColor: itemSelectedBg,

        // Danger
        [`&${componentCls}-item-danger`]: {
          backgroundColor: dangerItemSelectedBg,
        },
      },

      [`&${componentCls}-submenu > ${componentCls}`]: {
        backgroundColor: menuSubMenuBg,
      },

      // ===== 设置浮层的颜色 =======
      // ！dark 模式会被popupBg 会被rest 为 darkPopupBg
      [`&${componentCls}-popup > ${componentCls}`]: {
        backgroundColor: popupBg,
      },

      [`&${componentCls}-submenu-popup > ${componentCls}`]: {
        backgroundColor: popupBg,
      },
      // ===== 设置浮层的颜色 end =======

      // ====================== Horizontal ======================
      [`&${componentCls}-horizontal`]: {
        ...(themeSuffix === 'dark'
          ? {
              borderBottom: 0,
            }
          : {}),

        [`> ${componentCls}-item, > ${componentCls}-submenu`]: {
          top: activeBarBorderWidth,
          marginTop: token.calc(activeBarBorderWidth).mul(-1).equal(),
          marginBottom: 0,
          borderRadius: horizontalItemBorderRadius,

          '&::after': {
            position: 'absolute',
            insetInline: itemPaddingInline,
            bottom: 0,
            borderBottom: `${unit(activeBarHeight)} solid transparent`,
            transition: `border-color ${motionDurationSlow} ${motionEaseInOut}`,
            content: '""',
          },

          '&:hover, &-active, &-open': {
            background: horizontalItemHoverBg,
            '&::after': {
              borderBottomWidth: activeBarHeight,
              borderBottomColor: horizontalItemSelectedColor,
            },
          },
          '&-selected': {
            color: horizontalItemSelectedColor,
            backgroundColor: horizontalItemSelectedBg,
            '&:hover': {
              backgroundColor: horizontalItemSelectedBg,
            },
            '&::after': {
              borderBottomWidth: activeBarHeight,
              borderBottomColor: horizontalItemSelectedColor,
            },
          },
        },
      },

      // ================== Inline & Vertical ===================
      //
      [`&${componentCls}-root`]: {
        [`&${componentCls}-inline, &${componentCls}-vertical`]: {
          borderInlineEnd: `${unit(activeBarBorderWidth)} ${lineType} ${colorSplit}`,
        },
      },

      // ======================== Inline ========================
      [`&${componentCls}-inline`]: {
        // Sub
        [`${componentCls}-sub${componentCls}-inline`]: {
          background: subMenuItemBg,
        },

        [`${componentCls}-item`]: {
          position: 'relative',

          '&::after': {
            position: 'absolute',
            insetBlock: 0,
            insetInlineEnd: 0,
            borderInlineEnd: `${unit(activeBarWidth)} solid ${itemSelectedColor}`,
            transform: 'scaleY(0.0001)',
            opacity: 0,
            transition: [
              `transform ${motionDurationMid} ${motionEaseOut}`,
              `opacity ${motionDurationMid} ${motionEaseOut}`,
            ].join(','),
            content: '""',
          },

          // Danger
          [`&${componentCls}-item-danger`]: {
            '&::after': {
              borderInlineEndColor: dangerItemSelectedColor,
            },
          },
        },

        [`${componentCls}-selected, ${componentCls}-item-selected`]: {
          '&::after': {
            transform: 'scaleY(1)',
            opacity: 1,
            transition: [
              `transform ${motionDurationMid} ${motionEaseInOut}`,
              `opacity ${motionDurationMid} ${motionEaseInOut}`,
            ].join(','),
          },
        },
      },
    },
  };
};

export default getThemeStyle;
