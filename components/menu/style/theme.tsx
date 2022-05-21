import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { MenuToken, MenuThemeToken } from '.';

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
    themeColorTextHighlight,
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
  } = token;

  return {
    [`${componentCls}-${themeSuffix}`]: {
      color: themeColorText,
      background: themeColorBg,

      [`&-root:focus-visible`]: {
        ...accessibilityFocus(token),
      },

      // ======================== Item ========================
      [`${componentCls}-item-group-title`]: {
        color: themeColorTextSecondary,
      },

      [`${componentCls}-submenu-selected`]: {
        [`${componentCls}-submenu-title`]: {
          color: themeColorTextHighlight,
        },
      },

      // Hover
      [`${componentCls}-item:hover, ${componentCls}-submenu-title:hover`]: {
        color: themeColorTextHover,
      },

      // Active
      [`${componentCls}-item:active, ${componentCls}-submenu-title:active`]: {
        background: themeColorBgActive,
      },

      [`${componentCls}-item a`]: {
        '&, &:hover': {
          color: 'inherit',
        },
      },

      [`${componentCls}-item-selected`]: {
        color: themeColorTextHighlight,

        [`a, a:hover`]: {
          color: 'inherit',
        },
      },

      [`&:not(${componentCls}-horizontal) ${componentCls}-item-selected`]: {
        backgroundColor: themeColorBgSelect,
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

      //    > .@{menu-prefix-cls}-item {
      //      a {
      //        color: @menu-item-color;
      //
      //        &:hover {
      //          color: @menu-highlight-color;
      //        }
      //
      //        &::before {
      //          bottom: -2px;
      //        }
      //      }
      //
      //      &-selected a {
      //        color: @menu-highlight-color;
      //      }
      //    }

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
            color: themeColorTextHighlight,

            '&::after': {
              borderBottomColor: themeColorTextHighlight,
            },
          },
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
            borderInlineEnd: `${themeInkBarWidth}px solid ${themeColorTextHighlight}`,
            transform: 'scaleY(0.0001)',
            opacity: 0,
            transition: [
              `transform ${motionDurationFast} ${motionEaseOut}`,
              `opacity ${motionDurationFast} ${motionEaseOut}`,
            ].join(','),
            content: '""',
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
