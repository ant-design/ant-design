import type { CSSInterpolation } from '@ant-design/cssinjs';
import { genFocusOutline } from '../../style';
import type { MenuToken } from '.';

const accessibilityFocus = (token: MenuToken) => ({
  ...genFocusOutline(token),
});

const getThemeStyle = (token: MenuToken, themeSuffix: string): CSSInterpolation => {
  const {
    componentCls,
    colorItemText,
    colorItemTextSelected,
    colorItemTextSelectedHorizontal,
    colorGroupTitle,
    colorItemBg,
    colorSubItemBg,
    colorItemBgSelectedHorizontal,
    colorItemBgSelected,
    colorActiveBarHeight,
    colorActiveBarWidth,
    colorActiveBarBorderSize,
    motionDurationSlow,
    motionEaseInOut,
    motionEaseOut,
    menuItemPaddingInline,
    itemMarginInline,
    motionDurationFast,
    colorItemTextHover,
    lineType,
    colorSplit,
    colorItemBgActive,

    // Disabled
    colorItemTextDisabled,

    // Danger
    colorDangerItemText,
    colorDangerItemTextHover,
    colorDangerItemTextSelected,
    colorDangerItemBgActive,
    colorDangerItemBgSelected,

    radiusItem,

    colorItemBgHover,
  } = token;

  return {
    [`${componentCls}-${themeSuffix}`]: {
      color: colorItemText,
      background: colorItemBg,

      [`&${componentCls}-root:focus-visible`]: {
        ...accessibilityFocus(token),
      },

      // ======================== Item ========================
      [`${componentCls}-item-group-title`]: {
        color: colorGroupTitle,
      },

      [`${componentCls}-submenu-selected`]: {
        [`> ${componentCls}-submenu-title`]: {
          color: colorItemTextSelected,
        },
      },

      // Disabled
      [`${componentCls}-item-disabled, ${componentCls}-submenu-disabled`]: {
        color: `${colorItemTextDisabled} !important`,
      },

      // Hover
      [`${componentCls}-item:hover, ${componentCls}-submenu-title:hover`]: {
        [`&:not(${componentCls}-item-selected):not(${componentCls}-submenu-selected)`]: {
          color: colorItemTextHover,
        },
      },

      [`&:not(${componentCls}-horizontal)`]: {
        [`${componentCls}-item:not(${componentCls}-item-selected)`]: {
          '&:hover': {
            backgroundColor: colorItemBgHover,
          },

          '&:active::before': {
            content: '""',
            position: 'absolute',
            insetInlineStart: 0,
            top: 0,
            width: `100%`,
            height: '100%',
            flex: 1,
            borderRadius: radiusItem,
            backgroundColor: colorItemBgActive,
            transition: `background-color ${motionDurationFast}`,
          },
        },
        [`${componentCls}-submenu-title`]: {
          '&::before': {
            content: '""',
            position: 'absolute',
            insetInlineStart: itemMarginInline,
            top: 0,
            width: `calc(100% - ${itemMarginInline * 2}px)`,
            height: '100%',
            borderRadius: radiusItem,
            backgroundColor: 'transparent',
            transition: `background-color ${motionDurationFast}`,
          },

          '&:hover::before': {
            backgroundColor: colorItemBgHover,
          },

          '&:active::after': {
            content: '""',
            position: 'absolute',
            insetInlineStart: itemMarginInline,
            top: 0,
            width: `calc(100% - ${itemMarginInline * 2}px)`,
            height: '100%',
            borderRadius: radiusItem,
            backgroundColor: colorItemBgActive,
            transition: `background-color ${motionDurationFast}`,
          },
        },
      },

      // Danger - only Item has
      [`${componentCls}-item-danger`]: {
        color: colorDangerItemText,

        [`&${componentCls}-item:hover`]: {
          [`&:not(${componentCls}-item-selected):not(${componentCls}-submenu-selected)`]: {
            color: colorDangerItemTextHover,
          },
        },

        [`&${componentCls}-item:active`]: {
          background: colorDangerItemBgActive,
        },
      },

      [`${componentCls}-item a`]: {
        '&, &:hover': {
          color: 'inherit',
        },
      },

      [`${componentCls}-item-selected`]: {
        color: colorItemTextSelected,

        // Danger
        [`&${componentCls}-item-danger`]: {
          color: colorDangerItemTextSelected,
        },

        [`a, a:hover`]: {
          color: 'inherit',
        },
      },

      [`&:not(${componentCls}-horizontal) ${componentCls}-item-selected`]: {
        backgroundColor: colorItemBgSelected,

        // Danger
        [`&${componentCls}-item-danger`]: {
          backgroundColor: colorDangerItemBgSelected,
        },
      },

      [`${componentCls}-item, ${componentCls}-submenu-title`]: {
        [`&:not(${componentCls}-item-disabled):focus-visible`]: {
          ...accessibilityFocus(token),
        },
      },

      [`&${componentCls}-submenu > ${componentCls}`]: {
        backgroundColor: colorItemBg,
      },

      [`&${componentCls}-popup > ${componentCls}`]: {
        backgroundColor: colorItemBg,
      },

      // ====================== Horizontal ======================
      [`&${componentCls}-horizontal`]: {
        [`> ${componentCls}-item, > ${componentCls}-submenu`]: {
          top: colorActiveBarBorderSize,
          marginTop: -colorActiveBarBorderSize,
          marginBottom: 0,
          borderRadius: token.radiusItem,

          '&::after': {
            position: 'absolute',
            insetInline: menuItemPaddingInline,
            bottom: 0,
            borderBottom: `${colorActiveBarHeight}px solid transparent`,
            transition: `border-color ${motionDurationSlow} ${motionEaseInOut}`,
            content: '""',
          },

          [`&:hover, &-active, &-open`]: {
            color: colorItemTextSelectedHorizontal,
            '&::after': {
              borderWidth: `${colorActiveBarHeight}px`,
              borderBottomColor: colorItemTextSelectedHorizontal,
            },
          },
          [`&-selected`]: {
            color: colorItemTextSelectedHorizontal,
            backgroundColor: colorItemBgSelectedHorizontal,
            '&::after': {
              borderWidth: `${colorActiveBarHeight}px`,
              borderBottomColor: colorItemTextSelectedHorizontal,
            },
          },
        },
      },

      // ================== Inline & Vertical ===================
      //
      [`&${componentCls}-root`]: {
        [`&${componentCls}-inline, &${componentCls}-vertical`]: {
          borderInlineEnd: `${colorActiveBarBorderSize}px ${lineType} ${colorSplit}`,
        },
      },

      // ======================== Inline ========================
      [`&${componentCls}-inline`]: {
        // Sub
        [`${componentCls}-sub${componentCls}-inline`]: {
          background: colorSubItemBg,
        },

        // Item
        [`${componentCls}-item, ${componentCls}-submenu-title`]:
          colorActiveBarBorderSize && colorActiveBarWidth
            ? {
                width: `calc(100% + ${colorActiveBarBorderSize}px)`,
              }
            : {},

        [`${componentCls}-item`]: {
          position: 'relative',

          '&::after': {
            position: 'absolute',
            insetBlock: 0,
            insetInlineEnd: 0,
            borderInlineEnd: `${colorActiveBarWidth}px solid ${colorItemTextSelected}`,
            transform: 'scaleY(0.0001)',
            opacity: 0,
            transition: [
              `transform ${motionDurationFast} ${motionEaseOut}`,
              `opacity ${motionDurationFast} ${motionEaseOut}`,
            ].join(','),
            content: '""',
          },

          // Danger
          [`&${componentCls}-item-danger`]: {
            '&::after': {
              borderInlineEndColor: colorDangerItemTextSelected,
            },
          },
        },

        [`${componentCls}-selected, ${componentCls}-item-selected`]: {
          '&::after': {
            transform: 'scaleY(1)',
            opacity: 1,
            transition: [
              `transform ${motionDurationFast} ${motionEaseInOut}`,
              `opacity ${motionDurationFast} ${motionEaseInOut}`,
            ].join(','),
          },
        },
      },
    },
  };
};

export default getThemeStyle;
