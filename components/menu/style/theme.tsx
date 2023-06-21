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
    menuItemPaddingInline,
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

    itemHoverBg,
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
      [`${componentCls}-item-group-title`]: {
        color: groupTitleColor,
      },

      [`${componentCls}-submenu-selected`]: {
        [`> ${componentCls}-submenu-title`]: {
          color: itemSelectedColor,
        },
      },

      // Disabled
      [`${componentCls}-item-disabled, ${componentCls}-submenu-disabled`]: {
        color: `${itemDisabledColor} !important`,
      },

      // Hover
      [`${componentCls}-item:hover, ${componentCls}-submenu-title:hover`]: {
        [`&:not(${componentCls}-item-selected):not(${componentCls}-submenu-selected)`]: {
          color: itemHoverColor,
        },
      },

      [`&:not(${componentCls}-horizontal)`]: {
        [`${componentCls}-item:not(${componentCls}-item-selected)`]: {
          '&:hover': {
            backgroundColor: itemHoverBg,
          },

          '&:active': {
            backgroundColor: itemSelectedBg,
          },
        },

        [`${componentCls}-submenu-title`]: {
          '&:hover': {
            backgroundColor: itemHoverBg,
          },

          '&:active': {
            backgroundColor: itemSelectedBg,
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

        [`a, a:hover`]: {
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

      [`${componentCls}-item, ${componentCls}-submenu-title`]: {
        [`&:not(${componentCls}-item-disabled):focus-visible`]: {
          ...accessibilityFocus(token),
        },
      },

      [`&${componentCls}-submenu > ${componentCls}`]: {
        backgroundColor: menuSubMenuBg,
      },

      [`&${componentCls}-popup > ${componentCls}`]: {
        backgroundColor: itemBg,
      },

      // ====================== Horizontal ======================
      [`&${componentCls}-horizontal`]: {
        ...(themeSuffix === 'dark'
          ? {
              borderBottom: 0,
            }
          : {}),

        [`> ${componentCls}-item, > ${componentCls}-submenu`]: {
          top: activeBarBorderWidth,
          marginTop: -activeBarBorderWidth,
          marginBottom: 0,
          borderRadius: horizontalItemBorderRadius,

          '&::after': {
            position: 'absolute',
            insetInline: menuItemPaddingInline,
            bottom: 0,
            borderBottom: `${activeBarHeight}px solid transparent`,
            transition: `border-color ${motionDurationSlow} ${motionEaseInOut}`,
            content: '""',
          },

          [`&:hover, &-active, &-open`]: {
            background: horizontalItemHoverBg,
            '&::after': {
              borderBottomWidth: activeBarHeight,
              borderBottomColor: horizontalItemSelectedColor,
            },
          },
          [`&-selected`]: {
            color: horizontalItemSelectedColor,
            backgroundColor: horizontalItemSelectedBg,
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
          borderInlineEnd: `${activeBarBorderWidth}px ${lineType} ${colorSplit}`,
        },
      },

      // ======================== Inline ========================
      [`&${componentCls}-inline`]: {
        // Sub
        [`${componentCls}-sub${componentCls}-inline`]: {
          background: subMenuItemBg,
        },

        // Item
        [`${componentCls}-item, ${componentCls}-submenu-title`]:
          activeBarBorderWidth && activeBarWidth
            ? {
                width: `calc(100% + ${activeBarBorderWidth}px)`,
              }
            : {},

        [`${componentCls}-item`]: {
          position: 'relative',

          '&::after': {
            position: 'absolute',
            insetBlock: 0,
            insetInlineEnd: 0,
            borderInlineEnd: `${activeBarWidth}px solid ${itemSelectedColor}`,
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
