// deps-lint-skip-all
import { TinyColor } from '@ctrl/tinycolor';
import type { FullToken, GenerateStyle, UseComponentStyleResult } from '../../theme';
import {
  clearFix,
  genComponentStyleHook,
  mergeToken,
  resetComponent,
  resetIcon,
} from '../../theme';
import getHorizontalStyle from './horizontal';
import getRTLStyle from './rtl';
import getThemeStyle from './theme';
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
  menuArrowOffset: string;
  menuPanelMaskInset: number;
}

export interface MenuThemeToken extends MenuToken {
  // Group
  themeColorTextSecondary: string;

  // Item Text
  // > Default
  themeColorText: string;
  themeColorTextHover: string;
  themeColorTextSelect: string;

  // > Disabled
  themeColorDisabledText: string;

  // > Danger
  themeColorDangerText: string;
  themeColorDangerTextHover: string;
  themeColorDangerTextSelect: string;

  // Item Bg
  themeColorBg: string;
  themeColorBgSecondary: string;

  // > Default
  themeColorBgActive: string;
  themeColorBgSelect: string;

  // > Danger
  themeColorDangerBgActive: string;
  themeColorDangerBgSelect: string;

  // Ink Bar
  themeInkBarWidth: number;
  themeInkBarHeight: number;
  themeInkBorderSize: number;
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
    menuArrowOffset,
    lineType,
    menuPanelMaskInset,
  } = token;

  return [
    // Misc
    {
      '': {
        [`${componentCls}`]: {
          ...clearFix(),

          // Hidden
          [`&-hidden`]: {
            display: 'none',
          },
        },
      },
      [`${componentCls}-submenu-hidden`]: {
        display: 'none',
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

        // Removed a Badge related style seems it's safe
        // https://github.com/ant-design/ant-design/issues/19809

        // >>>>> Divider
        [`${componentCls}-item-divider`]: {
          overflow: 'hidden',
          lineHeight: 0,
          borderColor: colorBorderSecondary,
          borderStyle: lineType,
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
          background: 'none !important',
          cursor: 'not-allowed',

          '&::after': {
            borderColor: 'transparent !important',
          },

          a: {
            color: 'inherit !important',
            pointerEvents: 'none',
          },

          [`> ${componentCls}-submenu-title`]: {
            color: 'inherit !important',
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
              inset: `${menuPanelMaskInset}px 0 0`,
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
            insetInlineStart: menuPanelMaskInset,
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
              transform: `rotate(45deg) translateY(-${menuArrowOffset})`,
            },

            '&::after': {
              transform: `rotate(-45deg) translateY(${menuArrowOffset})`,
            },
          },
        },

        [`&-inline-collapsed ${componentCls}-submenu-arrow,
        &-inline ${componentCls}-submenu-arrow`]: {
          // ↓
          '&::before': {
            transform: `rotate(-45deg) translateX(${menuArrowOffset})`,
          },

          '&::after': {
            transform: `rotate(45deg) translateX(-${menuArrowOffset})`,
          },
        },

        [`${componentCls}-submenu-open${componentCls}-submenu-inline > ${componentCls}-submenu-title > ${componentCls}-submenu-arrow`]:
          {
            // ↑
            transform: `translateY(-${menuArrowSize * 0.2}px)`,

            '&::after': {
              transform: `rotate(-45deg) translateX(-${menuArrowOffset})`,
            },

            '&::before': {
              transform: `rotate(45deg) translateX(${menuArrowOffset})`,
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
        colorError,
        colorTextDisabled,
        colorErrorHover,
        colorErrorOutline,
        colorText,
        colorTextLightSolid,
        colorTextSecondary,
        colorBgContainer,
        colorBgContainerSecondary,
        controlHeightLG,
        fontSize,
        controlItemBgActive,
        lineWidth,
        lineWidthBold,
      } = token;

      const menuArrowSize = (fontSize / 7) * 5;

      // Menu Token
      const menuToken = mergeToken<MenuToken>(token, {
        menuItemHeight: controlHeightLG,
        menuItemPaddingInline: controlHeightLG / 2,
        menuArrowSize,
        menuHorizontalHeight: controlHeightLG * 1.15,
        menuArrowOffset: `${menuArrowSize * 0.25}px`,
        menuPanelMaskInset: -7, // Still a hardcode here since it's offset by rc-align
      });

      // Theme Token
      const menuLightToken = mergeToken<MenuThemeToken>(menuToken, {
        themeColorText: colorText,
        themeColorTextHover: colorPrimary,
        themeColorTextSecondary: colorTextSecondary,
        themeColorTextSelect: colorPrimary,
        themeColorBg: colorBgContainer,
        themeColorBgSecondary: colorBgContainerSecondary,
        themeColorBgActive: controlItemBgActive,
        themeColorBgSelect: controlItemBgActive,
        themeInkBarWidth: lineWidthBold + lineWidth,
        themeInkBarHeight: lineWidthBold,
        themeInkBorderSize: lineWidth,

        // Disabled
        themeColorDisabledText: colorTextDisabled,

        // Danger
        themeColorDangerText: colorError,
        themeColorDangerTextHover: colorError,
        themeColorDangerTextSelect: colorError,
        themeColorDangerBgActive: colorErrorOutline,
        themeColorDangerBgSelect: colorErrorOutline,
      });

      const menuDarkToken = mergeToken<MenuThemeToken>(menuToken, {
        themeColorText: new TinyColor(colorTextLightSolid).setAlpha(0.65).toRgbString(),
        themeColorTextHover: colorTextLightSolid,
        themeColorTextSecondary: colorTextSecondary,
        themeColorTextSelect: colorTextLightSolid,
        themeColorBg: '#001529',
        themeColorBgSecondary: '#000c17',
        themeColorBgActive: 'transparent',
        themeColorBgSelect: colorPrimary,
        themeInkBarWidth: 0,
        themeInkBarHeight: 0,
        themeInkBorderSize: 0,

        // Disabled
        themeColorDisabledText: new TinyColor(colorTextLightSolid).setAlpha(0.25).toRgbString(),

        // Danger
        themeColorDangerText: colorError,
        themeColorDangerTextHover: colorErrorHover,
        themeColorDangerTextSelect: colorTextLightSolid,
        themeColorDangerBgActive: colorError,
        themeColorDangerBgSelect: colorError,
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
