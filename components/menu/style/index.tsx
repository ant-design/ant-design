// deps-lint-skip-all
import type { CSSInterpolation } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import {
  genComponentStyleHook,
  resetComponent,
  clearFix,
  mergeToken,
  resetIcon,
} from '../../_util/theme';
import type { GenerateStyle, FullToken, UseComponentStyleResult } from '../../_util/theme';
import getThemeStyle from './theme';
import getHorizontalStyle from './horizontal';
import getVerticalStyle from './vertical';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  dropdownWidth: number;
  zIndexPopup: number;
}

export interface MenuToken extends FullToken<'Menu'> {
  menuItemHeight: number;
  menuHorizontalHeight: number;
  menuItemPaddingInline: number;
  menuArrowSize: number;
}

export interface MenuThemeToken extends MenuToken {
  themeColorText: string;
  themeColorTextSecondary: string;
  themeColorTextHighlight: string;
  themeColorBg: string;
  themeColorBgActive: string;
}

// =============================== Base ===============================
const getBaseStyle: GenerateStyle<MenuToken> = token => {
  const {
    antCls,
    componentCls,
    fontSize,
    motionDurationSlow,
    motionDurationMid,
    motionEaseInOut,
    motionEaseOut,
    lineHeight,
    paddingXS,
    padding,
    colorBorderSecondary,
    lineWidth,
    iconCls,
    zIndexPopup,
    radiusBase,
    menuArrowSize,
    controlHeightSM,
    colorTextDisabled,
  } = token;

  const arrowOffset = `${menuArrowSize * 0.25}px`;

  return [
    // Clear Fix
    {
      '': {
        [`${componentCls}`]: {
          ...clearFix(),
        },
      },
    },
    {
      [componentCls]: {
        ...resetComponent(token),

        marginBottom: 0,
        paddingInlineStart: 0, // Override default ul/ol
        fontSize,
        lineHeight: 0, // Fix display inline-block gap
        listStyle: 'none',
        outline: 'none',
        transition: [
          `background ${motionDurationSlow}`,
          // Magic cubic here but smooth transition
          `width ${motionDurationSlow} cubic-bezier(0.2, 0, 0, 1) 0s`,
        ].join(','),

        [`ul, ol`]: {
          margin: 0,
          padding: 0,
          listStyle: 'none',
        },

        // Overflow ellipsis
        [`&-overflow`]: {
          display: 'flex',

          [`${componentCls}-item`]: {
            flex: 'none',
          },
        },

        // Hidden
        [`&-hidden, &-submenu-hidden`]: {
          display: 'none',
        },

        [`${componentCls}-item-group-title`]: {
          padding: `${paddingXS}px ${padding}px`,
          fontSize,
          lineHeight,
          transition: `all ${motionDurationSlow}`,
        },

        [`&-horizontal ${componentCls}-submenu`]: {
          transition: [
            `border-color ${motionDurationSlow} ${motionEaseInOut}`,
            `background ${motionDurationSlow} ${motionEaseInOut}`,
          ].join(','),
        },

        [`${componentCls}-submenu, ${componentCls}-submenu-inline`]: {
          transition: [
            `border-color ${motionDurationSlow} ${motionEaseInOut}`,
            `background ${motionDurationSlow} ${motionEaseInOut}`,
            `padding ${motionDurationMid} ${motionEaseInOut}`,
          ].join(','),
        },

        [`${componentCls}-submenu ${componentCls}-sub`]: {
          cursor: 'initial',
          transition: [
            `background ${motionDurationSlow} ${motionEaseInOut}`,
            `padding ${motionDurationSlow} ${motionEaseInOut}`,
          ],
        },

        [`${componentCls}-title-content`]: {
          transition: `color ${motionDurationSlow}`,
        },

        [`${componentCls}-item a`]: {
          '&::before': {
            position: 'absolute',
            inset: 0,
            backgroundColor: 'transparent',
            content: '""',
          },
        },

        //  // https://github.com/ant-design/ant-design/issues/19809
        //  &-item > .@{ant-prefix}-badge a {
        //    color: @menu-item-color;
        //
        //    &:hover {
        //      color: @menu-highlight-color;
        //    }
        //  }

        // >>>>> Divider
        [`${componentCls}-item-divider`]: {
          overflow: 'hidden',
          lineHeight: 0,
          borderColor: colorBorderSecondary,
          borderStyle: 'solid',
          borderTopWidth: lineWidth,
          marginBlock: lineWidth,
          padding: 0,

          '&-dashed': {
            borderStyle: 'dashed',
          },
        },

        // >>>>> Item
        [`${componentCls}-item, ${componentCls}-submenu-title`]: {
          position: 'relative',
          display: 'block',
          margin: 0,
          // paddingInline: menuItemPaddingInline,
          whiteSpace: 'nowrap',
          cursor: 'pointer',
          transition: [
            `border-color ${motionDurationSlow}`,
            `background ${motionDurationSlow}`,
            `padding ${motionDurationSlow} ${motionEaseInOut}`,
          ].join(','),

          [`${componentCls}-item-icon, ${iconCls}`]: {
            minWidth: fontSize,
            fontSize,
            transition: [
              `font-size ${motionDurationMid} ${motionEaseOut}`,
              `margin ${motionDurationSlow} ${motionEaseInOut}`,
              `color ${motionDurationSlow}`,
            ].join(','),

            '+ span': {
              marginInlineStart: controlHeightSM - fontSize,
              opacity: 1,
              transition: [
                `opacity ${motionDurationSlow} ${motionEaseInOut}`,
                `margin ${motionDurationSlow}`,
                `color ${motionDurationSlow}`,
              ].join(','),
            },
          },

          [`${componentCls}-item-icon`]: {
            ...resetIcon(),
          },

          [`&.${componentCls}-item-only-child`]: {
            [`> ${iconCls}, > ${componentCls}-item-icon`]: {
              marginInlineEnd: 0,
            },
          },
        },

        // Disabled state sets text to gray and nukes hover/tab effects
        [`${componentCls}-item-disabled, ${componentCls}-submenu-disabled`]: {
          color: `${colorTextDisabled} !important`,
          background: 'none',
          cursor: 'not-allowed',

          '&::after': {
            borderColor: 'transparent !important',
          },

          a: {
            color: 'inherit !important',
            pointerEvents: 'none',
          },

          [`> ${componentCls}-submenu-title`]: {
            color: `${colorTextDisabled} !important`,
            cursor: 'not-allowed',
          },
        },

        [`${componentCls}-item-group`]: {
          [`${componentCls}-item-group-list`]: {
            margin: 0,
            padding: 0,

            [`${componentCls}-item, ${componentCls}-submenu-title`]: {
              paddingInline: `${fontSize * 2}px ${padding}px`,
            },
          },
        },

        // ======================= Sub Menu =======================
        '&-submenu': {
          '&-popup': {
            position: 'absolute',
            zIndex: zIndexPopup,
            background: 'transparent',
            borderRadius: radiusBase,
            boxShadow: 'none',
            transformOrigin: '0 0',

            // https://github.com/ant-design/ant-design/issues/13955
            '&::before': {
              position: 'absolute',
              inset: `-7px 0 0`,
              zIndex: -1,
              width: '100%',
              height: '100%',
              opacity: 0,
              content: '""',
            },
          },

          // https://github.com/ant-design/ant-design/issues/13955
          '&-placement-rightTop::before': {
            top: 0,
            insetInlineStart: -7,
          },

          [`> ${componentCls}`]: {
            borderRadius: radiusBase,

            [`${componentCls}-submenu-title::after`]: {
              transition: `transform ${motionDurationSlow} ${motionEaseInOut}`,
            },
          },
        },

        [`${componentCls}-submenu`]: {
          [`&-expand-icon, &-arrow`]: {
            position: 'absolute',
            top: '50%',
            insetInlineEnd: token.margin,
            width: menuArrowSize,
            color: 'currentcolor',
            transform: 'translateY(-50%)',
            transition: `transform ${motionDurationSlow} ${motionEaseInOut}`,
          },

          '&-arrow': {
            // →
            '&::before, &::after': {
              position: 'absolute',
              width: menuArrowSize * 0.6,
              height: menuArrowSize * 0.15,
              backgroundColor: 'currentcolor',
              borderRadius: radiusBase,
              transition: [
                `background ${motionDurationSlow} ${motionEaseInOut}`,
                `transform ${motionDurationSlow} ${motionEaseInOut}`,
                `top ${motionDurationSlow} ${motionEaseInOut}`,
                `color ${motionDurationSlow} ${motionEaseInOut}`,
              ].join(','),
              content: '""',
            },

            '&::before': {
              transform: `rotate(45deg) translateY(-${arrowOffset})`,
            },

            '&::after': {
              transform: `rotate(-45deg) translateY(${arrowOffset})`,
            },
          },
        },

        [`&-inline-collapsed ${componentCls}-submenu-arrow,
        &-inline ${componentCls}-submenu-arrow`]: {
          // ↓
          '&::before': {
            transform: `rotate(-45deg) translateX(${arrowOffset})`,
          },

          '&::after': {
            transform: `rotate(45deg) translateX(-${arrowOffset})`,
          },
        },

        [`${componentCls}-submenu-open${componentCls}-submenu-inline > ${componentCls}-submenu-title > ${componentCls}-submenu-arrow`]:
          {
            // ↑
            transform: `translateY(-${menuArrowSize * 0.2}px)`,

            '&::after': {
              transform: `rotate(-45deg) translateX(-${arrowOffset}px)`,
            },

            '&::before': {
              transform: `rotate(45deg) translateX(${arrowOffset}px)`,
            },
          },
      },
    },

    // Integration with header element so menu items have the same height
    {
      [`${antCls}-layout-header`]: {
        [componentCls]: {
          lineHeight: 'inherit',
        },
      },
    },
  ];
};

// =============================== Base ===============================
const getRTLStyle: GenerateStyle<MenuToken> = ({ componentCls }) => ({
  [`${componentCls}-rtl`]: {
    direction: 'rtl',
  },
});

// ============================== Export ==============================
export default (prefixCls: string, injectStyle: boolean): UseComponentStyleResult => {
  const useOriginHook = genComponentStyleHook(
    'Menu',
    token => {
      // Dropdown will handle menu style self. We do not need to handle this.
      if (injectStyle === false) {
        return [];
      }

      const {
        colorPrimary,
        colorText,
        colorTextLightSolid,
        colorTextSecondary,
        colorBgComponent,
        controlHeightLG,
        fontSize,
        controlItemBgActive,
      } = token;

      // Menu Token
      const menuToken = mergeToken<MenuToken>(token, {
        menuItemHeight: controlHeightLG,
        menuItemPaddingInline: controlHeightLG / 2,
        menuArrowSize: (fontSize / 7) * 5,
        menuHorizontalHeight: controlHeightLG * 1.15,
      });

      // Theme Token
      const menuLightToken = mergeToken<MenuThemeToken>(menuToken, {
        themeColorText: colorText,
        themeColorTextSecondary: colorTextSecondary,
        themeColorTextHighlight: colorPrimary,
        themeColorBg: colorBgComponent,
        themeColorBgActive: controlItemBgActive,
      });

      const menuDarkToken = mergeToken<MenuThemeToken>(menuToken, {
        themeColorText: colorTextLightSolid,
        themeColorTextSecondary: colorTextSecondary,
        themeColorTextHighlight: colorTextLightSolid,
        themeColorBg: '#001529',
        themeColorBgActive: 'red',
      });

      return [
        // Basic
        getBaseStyle(menuToken),

        // Horizontal
        getHorizontalStyle(menuLightToken), // Hard code for some light style

        // Vertical
        getVerticalStyle(menuLightToken), // Hard code for some light style

        // Theme
        getThemeStyle(menuLightToken, 'light'),
        getThemeStyle(menuDarkToken, 'dark'),

        // RTL
        getRTLStyle(menuToken),
      ];
    },
    token => ({
      dropdownWidth: 160,
      zIndexPopup: token.zIndexPopupBase + 50,
    }),
  );

  return useOriginHook(prefixCls);
};
