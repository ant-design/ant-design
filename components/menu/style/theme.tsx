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
    themeColorBgActive,
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

      [`${componentCls}-item:active, ${componentCls}-submenu-title:active`]: {
        background: themeColorBgActive,
      },

      [`${componentCls}-item a`]: {
        color: themeColorText,

        '&:hover': {
          color: themeColorTextHighlight,
        },
      },

      [`${componentCls}-item-selected`]: {
        color: themeColorTextHighlight,

        [`a, a:hover`]: {
          color: themeColorTextHighlight,
        },
      },

      [`&:not(${componentCls}-horizontal) ${componentCls}-item-selected`]: {
        backgroundColor: themeColorBgActive,
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
    },
  };
};

export default getThemeStyle;
