import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { MenuThemeToken, MenuToken } from '.';

const accessibilityFocus = (token: MenuToken) => {
  const { controlOutlineWidth, colorPrimaryHover } = token;

  return {
    boxShadow: `0 0 0 ${controlOutlineWidth}px ${colorPrimaryHover}`,
  };
};

const getThemeStyle = (token: MenuThemeToken, themeSuffix: string): CSSInterpolation => {
  const {
    componentCls,
    themeColorText,
    themeColorTextSelect,
    themeColorTextSecondary,
    themeColorBg,
    themeColorBgSecondary,
    themeColorBgActive,
    themeColorBgSelect,
    themeInkBarHeight,
    themeInkBarWidth,
    themeInkBorderSize,
    motionDurationSlow,
    motionEaseInOut,
    motionEaseOut,
    menuItemPaddingInline,
    motionDurationFast,
    themeColorTextHover,
    lineType,
    colorBorderSecondary,

    // Disabled
    themeColorDisabledText,

    // Danger
    themeColorDangerText,
    themeColorDangerTextHover,
    themeColorDangerTextSelect,
    themeColorDangerBgActive,
    themeColorDangerBgSelect,
  } = token;

  return {
    [`${componentCls}-${themeSuffix}`]: {
      color: themeColorText,
      background: themeColorBg,

      [`&${componentCls}-root:focus-visible`]: {
        ...accessibilityFocus(token),
      },

      // ======================== Item ========================
      [`${componentCls}-item-group-title`]: {
        color: themeColorTextSecondary,
      },

      [`${componentCls}-submenu-selected`]: {
        [`> ${componentCls}-submenu-title`]: {
          color: themeColorTextSelect,
        },
      },

      // Disabled
      [`${componentCls}-item-disabled, ${componentCls}-submenu-disabled`]: {
        color: `${themeColorDisabledText} !important`,
      },

      // Hover
      [`${componentCls}-item:hover, ${componentCls}-submenu-title:hover`]: {
        [`&:not(${componentCls}-item-selected):not(${componentCls}-submenu-selected)`]: {
          color: themeColorTextHover,
        },
      },

      // Active
      [`${componentCls}-item:active, ${componentCls}-submenu-title:active`]: {
        background: themeColorBgActive,
      },

      // Danger - only Item has
      [`${componentCls}-item-danger`]: {
        color: themeColorDangerText,

        [`&${componentCls}-item:hover`]: {
          [`&:not(${componentCls}-item-selected):not(${componentCls}-submenu-selected)`]: {
            color: themeColorDangerTextHover,
          },
        },

        [`&${componentCls}-item:active`]: {
          background: themeColorDangerBgActive,
        },
      },

      [`${componentCls}-item a`]: {
        '&, &:hover': {
          color: 'inherit',
        },
      },

      [`${componentCls}-item-selected`]: {
        color: themeColorTextSelect,

        // Danger
        [`&${componentCls}-item-danger`]: {
          color: themeColorDangerTextSelect,
        },

        [`a, a:hover`]: {
          color: 'inherit',
        },
      },

      [`&:not(${componentCls}-horizontal) ${componentCls}-item-selected`]: {
        backgroundColor: themeColorBgSelect,

        // Danger
        [`&${componentCls}-item-danger`]: {
          backgroundColor: themeColorDangerBgSelect,
        },
      },

      [`${componentCls}-item, ${componentCls}-submenu-title`]: {
        '&:focus-visible': {
          ...accessibilityFocus(token),
        },
      },

      [`&${componentCls}-submenu > ${componentCls}`]: {
        backgroundColor: themeColorBg,
      },

      [`&${componentCls}-popup > ${componentCls}`]: {
        backgroundColor: themeColorBg,
      },

      // ====================== Horizontal ======================
      [`&${componentCls}-horizontal`]: {
        [`> ${componentCls}-item, > ${componentCls}-submenu`]: {
          top: themeInkBorderSize,
          marginTop: -themeInkBorderSize,
          marginBottom: 0,

          '&::after': {
            position: 'absolute',
            insetInline: menuItemPaddingInline,
            bottom: 0,
            borderBottom: `${themeInkBarHeight}px solid transparent`,
            transition: `border-color ${motionDurationSlow} ${motionEaseInOut}`,
            content: '""',
          },

          [`&:hover, &-active, &-open, &-selected`]: {
            color: themeColorTextSelect,

            '&::after': {
              borderBottomColor: themeColorTextSelect,
            },
          },
        },
      },

      // ================== Inline & Vertical ===================
      //
      [`&${componentCls}-root`]: {
        [`${componentCls}-inline, ${componentCls}-vertical`]: {
          borderInlineEnd: `${themeInkBorderSize}px ${lineType} ${colorBorderSecondary}`,
        },
      },

      // ======================== Inline ========================
      [`&${componentCls}-inline`]: {
        // Sub
        [`${componentCls}-sub${componentCls}-inline`]: {
          background: themeColorBgSecondary,
        },

        // Item
        [`${componentCls}-item, ${componentCls}-submenu-title`]: themeInkBorderSize
          ? {
              width: `calc(100% + ${themeInkBorderSize}px)`,
            }
          : {},

        [`${componentCls}-item`]: {
          position: 'relative',

          '&::after': {
            position: 'absolute',
            insetBlock: 0,
            insetInlineEnd: 0,
            borderInlineEnd: `${themeInkBarWidth}px solid ${themeColorTextSelect}`,
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
              borderInlineEndColor: themeColorDangerTextSelect,
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
