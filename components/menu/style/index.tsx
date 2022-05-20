// deps-lint-skip-all
import type { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import {
  genComponentStyleHook,
  resetComponent,
  clearFix,
  mergeToken,
  resetIcon,
} from '../../_util/theme';
import type { GenerateStyle, FullToken, UseComponentStyleResult } from '../../_util/theme';
import genDarkStyle from './dark';

/** Component only token. Which will handle additional calculation of alias token */
export interface ComponentToken {
  dropdownWidth: number;
  zIndexPopup: number;
}

export interface MenuToken extends FullToken<'Menu'> {
  sizeLg: number;
  textColorDark: string;
  menuInlineSubmenuBg: string;
  disabledColor: string;
  darkColor: string;
  darkBg: string;
  colorDark: string;
  darkHighlightColor: string;
  disabledColorDark: string;
  darkInlineSubmenuBg: string;
  itemActiveBg: string;
  boxShadowColor: string;
  highlightDangerColor: string;
  itemActiveDangerBg: string;
  menuItemPaddingInline: number;
}

// =============================== Base ===============================
const accessibilityFocus: GenerateStyle<MenuToken, CSSObject> = (token): CSSObject => ({
  boxShadow: `0 0 0 ${token.controlOutlineWidth}px ${token.colorPrimarySecondary}`,
});

const genStatusStyle: GenerateStyle<MenuToken, CSSObject> = (token: MenuToken): CSSObject => {
  const { componentCls, highlightDangerColor, itemActiveDangerBg, darkHighlightColor, iconCls } =
    token;
  return {
    [`${componentCls}`]: {
      // Danger
      [`${componentCls}-item-danger${componentCls}-item`]: {
        color: highlightDangerColor,

        [`&:hover,${componentCls}-active`]: {
          color: highlightDangerColor,
        },

        '&:active': {
          background: itemActiveDangerBg,
        },

        [`${componentCls}-selected`]: {
          color: highlightDangerColor,

          '> a, > a:hover': {
            color: highlightDangerColor,
          },
        },

        [`${iconCls}:not(${iconCls}-horizontal) ${componentCls}-item-selected`]: {
          backgroundColor: itemActiveDangerBg,
        },

        [`${iconCls}-inline &::after`]: {
          borderInlineEndColor: highlightDangerColor,
        },
      },
    },
  };
};
const genLightStyle = (token: MenuToken): CSSObject => {
  const { componentCls, colorPrimary, colorText } = token;
  return {
    [`${componentCls}-light`]: {
      // light theme
      [`
        ${componentCls}-item:hover,
        ${componentCls}-item-active,
        ${componentCls}:not(${componentCls}-inline) ${componentCls}-submenu-open,
        ${componentCls}-submenu-active,
        ${componentCls}-submenu-title:hover
      `]: {
        color: colorPrimary,
        [`${componentCls}`]: {
          color: colorText,
        },
      },
    },
  };
};

const genBaseStyle: GenerateStyle<MenuToken> = token => {
  const {
    controlHeight,
    controlHeightSM,
    controlHeightLG,
    radiusBase,
    componentCls,
    antCls,
    colorBorderSecondary,
    colorPrimary,
    motionDurationSlow,
    controlLineType,
    motionEaseInOut,
    motionDurationMid,
    motionEaseOut,
    iconCls,
    boxShadow,
    colorBgComponent,
    colorText,
    lineWidth,
    padding,
    marginXXS,
    marginXS,
    sizeLg,
    paddingXXS,
    menuInlineSubmenuBg,
    disabledColor,
    colorTextSecondary,
    fontSize,
    lineHeight,
    paddingXS,
    darkBg,
    colorDark,
    darkInlineSubmenuBg,
    darkColor,
    darkHighlightColor,
    disabledColorDark,
    itemActiveBg,
    dropdownWidth,
    menuItemPaddingInline,
    zIndexPopup,
  } = token;

  return [
    {
      // default theme
      [componentCls]: {
        ...resetComponent(token),

        marginBlockEnd: 0,
        paddingInlineStart: 0, // Override default ul/ol
        color: colorText,
        fontSize,
        lineHeight: 0, // Fix display inline-block gap
        textAlign: 'start',
        listStyle: 'none',
        background: colorBgComponent,
        outline: 'none',
        boxShadow,
        transition: [
          `background ${motionDurationSlow}`,
          // FIXME: hard code in v4 but seems it's nice but not exist in token
          `width ${motionDurationSlow} cubic-bezier(0.2, 0, 0, 1) 0s`,
        ].join(','),
        ...clearFix(),

        // sub-menu
        [`${componentCls}`]: {
          color: colorText,
          ...clearFix(),
        },

        [`&${componentCls}-root:focus-visible`]: accessibilityFocus(token),

        'ul, ol': {
          margin: 0,
          padding: 0,
          listStyle: 'none',
        },

        [`${componentCls}-item-group-title`]: {
          paddingInline: `${padding}px`,
          paddingBlock: `${paddingXS}px`,
          color: colorTextSecondary,
          fontSize,
          lineHeight,
          transition: `all ${motionDurationSlow}`,
        },

        [`${componentCls}-submenu-selected`]: {
          color: colorPrimary,
          [`${componentCls}`]: {
            color: colorText,
            ...clearFix(),
          },
        },

        [`${componentCls}-item:active,${componentCls}-submenu-title:active`]: {
          background: itemActiveBg,
        },

        [`${componentCls}-title-content`]: {
          transition: `color ${motionDurationSlow}`,
        },

        [`${componentCls}-item a`]: {
          color: colorText,

          '&:hover': {
            color: colorPrimary,
          },

          '&::before': {
            position: 'absolute',
            inset: 0,
            backgroundColor: 'transparent',
            content: '""',
          },
        },

        // https://github.com/ant-design/ant-design/issues/19809
        [`${componentCls}-item > ${antCls}-badge a`]: {
          color: colorText,

          '&:hover': {
            color: colorPrimary,
          },
        },

        [`${componentCls}-item-divider`]: {
          overflow: 'hidden',
          lineHeight: 0,
          borderColor: colorBorderSecondary,
          borderStyle: controlLineType,
          borderBlockStartWidth: `${lineWidth}px`,
          borderBlockEndWidth: 0,
          borderInlineWidth: 0,
        },

        [`${componentCls}-item-divider-dashed`]: {
          borderStyle: 'dashed',
        },

        [`${componentCls}-item-selected`]: {
          color: colorPrimary,

          'a,a:hover': {
            color: colorPrimary,
          },
        },

        [`&:not(${componentCls}-horizontal) ${componentCls}-item-selected`]: {
          backgroundColor: itemActiveBg,
        },

        [`${componentCls}-vertical-right`]: {
          borderInlineStart: `${lineWidth}px ${controlLineType} ${colorBorderSecondary}`,
        },

        [`${componentCls}-vertical${componentCls}-sub,${componentCls}-vertical-left${componentCls}-sub,${componentCls}-vertical-right${componentCls}-sub`]:
          {
            minWidth: dropdownWidth,
            maxHeight: `calc(100vh - ${controlHeightLG * 2.5}px)`,
            padding: 0,
            overflow: 'hidden',
            borderInlineEnd: 0,

            // https://github.com/ant-design/ant-design/issues/22244
            // https://github.com/ant-design/ant-design/issues/26812
            [`&:not([class*='-active'])`]: {
              overflowX: 'hidden',
              overflowY: 'auto',
            },

            [`${componentCls}-item`]: {
              insetInlineStart: 0,
              marginInlineStart: 0,
              borderInlineEnd: 0,

              '&::after': {
                borderInlineEnd: 0,
              },
            },
            [`> ${componentCls}-item, > ${componentCls}-submenu`]: {
              transformOrigin: '0 0',
            },
          },

        [`${componentCls}-item,${componentCls}-submenu-title`]: {
          position: 'relative',
          display: 'block',
          margin: 0,
          paddingInline: menuItemPaddingInline,
          paddingBlock: 0,
          whiteSpace: 'nowrap',
          cursor: 'pointer',
          transition: `border-color ${motionDurationSlow}, background ${motionDurationSlow},padding ${motionDurationSlow} ${motionEaseInOut}`,

          [`${componentCls}-item-icon,${iconCls}`]: {
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
              transition: `opacity ${motionDurationSlow} ${motionEaseInOut}, margin ${motionDurationSlow},color ${motionDurationSlow}`,
            },
          },

          [`${componentCls}-item-icon`]: {
            ...resetIcon(),
          },

          [`&${componentCls}-item-only-child`]: {
            [`> ${iconCls},> ${componentCls}-item-icon`]: {
              marginInlineEnd: 0,
            },
          },

          '&:focus-visible': {
            ...accessibilityFocus(token),
          },
        },

        [`& > ${componentCls}-item-divider`]: {
          margin: `${lineWidth}px 0`,
          padding: 0,
        },

        [`&${componentCls}-inline-collapsed`]: {
          width: '80px',

          [`
          > ${componentCls}-item,
          > ${componentCls}-item-group
          > ${componentCls}-item-group-list
          > ${componentCls}-item,
          > ${componentCls}-item-group
          > ${componentCls}-item-group-list
          > ${componentCls}-submenu
          > ${componentCls}-submenu-title,
          > ${componentCls}-submenu > ${componentCls}-submenu-title
        `]: {
            insetInlineStart: 0,
            paddingInline: `calc(50% - 8px)`, // FIXME: hard code in v4
            paddingBlock: 0,
            textOverflow: 'clip',

            [`${componentCls}-submenu-arrow`]: {
              opacity: 0,
            },

            [`${componentCls}-item-icon,${iconCls}`]: {
              margin: 0,
              fontSize: sizeLg,
              lineHeight: `${controlHeightLG}px`,

              '+ span': {
                display: 'inline-block',
                opacity: 0,
              },
            },
          },

          [`${componentCls}-item-icon,${iconCls}`]: {
            display: 'inline-block',
          },

          [`${componentCls}-tooltip`]: {
            pointerEvents: 'none',

            [`${componentCls}-item-icon,${iconCls}`]: {
              display: 'none',
            },

            a: {
              color: colorDark,
            },
          },

          [`${componentCls}-item-group-title`]: {
            borderInline: `${paddingXXS}px`,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          },
        },

        [`${componentCls}-item-group-list`]: {
          margin: 0,
          padding: 0,
          [`${componentCls}-item,${componentCls}-submenu-title`]: {
            paddingBlock: 0,
            paddingInlineStart: '28px', // FIXME: hard code in v4
            paddingInlineEnd: '16px', // FIXME: hard code in v4
          },
        },
        [`${componentCls}-sub${componentCls}-inline`]: {
          padding: 0,
          background: menuInlineSubmenuBg,
          border: 0,
          borderRadius: 0,
          boxShadow: 'none',
          [`& > ${componentCls}-item,& > ${componentCls}-submenu > ${componentCls}-submenu-title`]:
            {
              height: controlHeightLG,
              lineHeight: `${controlHeightLG}px`,
              listStylePosition: 'inside',
              listStyleType: 'disc',
            },

          [`${componentCls}-item-group-title`]: {
            paddingInlineStart: `${controlHeight}px`,
          },
        },
        // Disabled state sets text to gray and nukes hover/tab effects
        [`${componentCls}-item-disabled, ${componentCls}-submenu-disabled`]: {
          color: `${disabledColor} !important`,
          background: 'none',
          cursor: 'not-allowed',

          '&::after': {
            borderColor: 'transparent !important',
          },

          a: {
            color: `${disabledColor} !important`,
            pointerEvents: 'none',
          },
          [`> ${componentCls}-submenu-title`]: {
            color: `${disabledColor} !important`,
            cursor: 'not-allowed',
            [`> ${componentCls}-submenu-arrow`]: {
              [`&::before, &::after`]: {
                background: `${disabledColor} !important`,
              },
            },
          },
        },

        [`${componentCls}-submenu-arrow`]: {
          '&::before,&::after': {
            position: 'absolute',
            width: '6px', // FIXME: hard code in v4
            height: '1.5px', // FIXME: hard code in v4
            backgroundColor: 'currentcolor',
            borderRadius: radiusBase,
            transition: `background ${motionDurationSlow} ${motionEaseInOut},transform ${motionDurationSlow} ${motionEaseInOut}, top ${motionDurationSlow} ${motionEaseInOut},color ${motionDurationSlow} ${motionEaseInOut}`,
            content: '""',
          },

          '&::before': {
            transform: `rotate(45deg) translateY(-2.5px)`, // FIXME: hard code in v4
          },

          '&::after': {
            transform: `rotate(-45deg) translateY(2.5px)`, // FIXME: hard code in v4
          },
        },

        [`${componentCls}-submenu-horizontal ${componentCls}-submenu-arrow`]: {
          display: 'none',
        },

        [`${componentCls}-inline-collapsed ${componentCls}-submenu-arrow, ${componentCls}-submenu-inline ${componentCls}-submenu-arrow`]:
          {
            // ↓
            '&::before': {
              transform: `rotate(-45deg) translateX(2.5px)`, // FIXME: hard code in v4
            },

            '&::after': {
              transform: `rotate(45deg) translateX(-2.5px)`, // FIXME: hard code in v4
            },
          },
        [`${componentCls}-submenu-open${componentCls}-submenu-inline > ${componentCls}-submenu-title > ${componentCls}-submenu-arrow`]:
          {
            // ↑
            transform: `translateY(-2px)`, // FIXME: hard code in v4
            '&::after': {
              transform: 'rotate(-45deg) translateX(-2.5px)', // FIXME: hard code in v4
            },
            '&::before': {
              transform: `rotate(45deg) translateX(2.5px)`, // FIXME: hard code in v4
            },
          },
        [`${componentCls}-submenu-expand-icon,${componentCls}-submenu-arrow`]: {
          position: 'absolute',
          insetBlockStart: '50%',
          insetInlineEnd: '16px', // FIXME: hard code in v4
          width: '10px', // FIXME: hard code in v4
          color: colorText,
          transform: 'translateY(-50%)',
          transition: `transform ${motionDurationSlow} ${motionEaseInOut}`,
        },
        [`
          ${componentCls}-submenu:hover > ${componentCls}-submenu-title > ${componentCls}-submenu-expand-icon,
          ${componentCls}-submenu:hover > ${componentCls}-submenu-title > ${componentCls}-submenu-arrow
        `]: {
          color: colorPrimary,
        },

        [`${componentCls}-vertical ${componentCls}-item`]: {
          height: controlHeightLG,
          marginBlock: marginXXS,
          paddingBlock: 0,
          paddingInline: `${padding}px`,
          overflow: 'hidden',
          lineHeight: `${controlHeightLG}px`,
          textOverflow: 'ellipsis',
        },
        [`${componentCls}-hidden`]: {
          display: 'none',
        },
      },

      [`${componentCls}-submenu-hidden`]: {
        display: 'none',
      },
      // ========================= root  ============================
      [`${componentCls}-root${componentCls}-vertical,
      ${componentCls}-root${componentCls}-vertical-left,
      ${componentCls}-root${componentCls}-vertical-right,
      ${componentCls}-root${componentCls}-inline`]: {
        boxShadow: 'none',
      },
      [`${componentCls}-root${componentCls}-inline-collapsed`]: {
        [`${componentCls}-item,${componentCls}-submenu ${componentCls}-submenu-title`]: {
          [`> ${componentCls}-inline-collapsed-noicon`]: {
            fontSize: sizeLg,
            textAlign: 'center',
          },
        },
      },

      // ========================= dark  ============================
      [`${componentCls}-dark ${componentCls}-inline${componentCls}-sub`]: {
        background: darkInlineSubmenuBg,
      },

      [`
      ${componentCls}-dark ${componentCls}-item,${componentCls}-dark ${componentCls}-item-group-title,
      ${componentCls}-dark ${componentCls}-item > a,${componentCls}-dark ${componentCls}-item > span > a
    `]: {
        color: darkColor,
      },

      [`
      ${componentCls}-dark${componentCls}-inline,${componentCls}-dark${componentCls}-vertical,
      ${componentCls}-dark${componentCls}-vertical-left,${componentCls}-dark${componentCls}-vertical-right
    `]: {
        borderInlineEnd: 0,
      },

      [`
      ${componentCls}-dark${componentCls}-inline ${componentCls}-item,
      ${componentCls}-dark${componentCls}-vertical ${componentCls}-item,
      ${componentCls}-dark${componentCls}-vertical-left ${componentCls}-item,
      ${componentCls}-dark${componentCls}-vertical-right ${componentCls}-item
    `]: {
        insetInlineStart: 0,
        marginInlineStart: 0,
        borderInlineEnd: 0,

        '&::after': {
          borderInlineEnd: 0,
        },
      },

      [`
      ${componentCls}-dark${componentCls}-inline ${componentCls}-item,
      ${componentCls}-dark${componentCls}-inline ${componentCls}-submenu-title
    `]: {
        width: '100%',
      },

      [`
      ${componentCls}-dark ${componentCls}-item:hover,
      ${componentCls}-dark ${componentCls}-item-active,
      ${componentCls}-dark ${componentCls}-submenu-active,
      ${componentCls}-dark ${componentCls}-submenu-open,
      ${componentCls}-dark ${componentCls}-submenu-selected,
      ${componentCls}-dark ${componentCls}-submenu-title:hover
    `]: {
        color: darkHighlightColor,
        backgroundColor: 'transparent',
        '> a, > span > a': {
          color: darkHighlightColor,
        },
        [`> ${componentCls}-submenu-title`]: {
          [`> ${componentCls}-submenu-arrow`]: {
            opacity: 1,

            '&::after, &::before': {
              background: darkHighlightColor,
            },
          },
        },
      },

      [`${componentCls}-dark ${componentCls}-item:hover`]: {
        backgroundColor: 'transparent',
      },

      [`${componentCls}-dark${componentCls}-dark:not(${componentCls}-horizontal) ${componentCls}-item-selected`]:
        {
          backgroundColor: colorPrimary,
        },

      [`${componentCls}-dark ${componentCls}-item-selected`]: {
        color: darkHighlightColor,
        borderInlineEnd: 0,

        '&::after': {
          borderInlineEnd: 0,
        },

        '> a, > span > a, > a:hover,> span > a:hover': {
          color: darkHighlightColor,
        },

        [`${componentCls}-item-icon, ${iconCls}`]: {
          color: darkHighlightColor,

          '+ span': {
            color: darkHighlightColor,
          },
        },
      },

      [`${componentCls}${componentCls}-dark ${componentCls}-item-selected,${componentCls}-submenu-popup${componentCls}-dark ${componentCls}-item-selected`]:
        {
          backgroundColor: colorPrimary,
        },

      // Disabled state sets text to dark gray and nukes hover/tab effects
      [`${componentCls}-dark ${componentCls}-item-disabled,${componentCls}-dark ${componentCls}-submenu-disabled`]:
        {
          '&, > a, > span > a': {
            color: `${disabledColorDark} !important`,
            opacity: 0.8,
          },
          [`> ${componentCls}-submenu-title`]: {
            color: `${disabledColorDark} !important`,
            [`> ${componentCls}-submenu-arrow`]: {
              [`&::before, &::after`]: {
                background: `${disabledColorDark} !important`,
              },
            },
          },
        },

      // ========================= inline  ============================
      [`${componentCls}${componentCls}-inline`]: {
        width: '100%',
        [`${componentCls}-selected,${componentCls}-item-selected`]: {
          '&::after': {
            transform: 'scaleY(1)',
            opacity: 1,
            transition: [
              `transform ${motionDurationMid} ${motionEaseInOut}`,
              `opacity ${motionDurationMid} ${motionEaseInOut}`,
            ].join(','),
          },
        },

        [`${componentCls}-item,${componentCls}-submenu-title`]: {
          width: 'calc(100% + 1px)', // FIXME: hard code in v4
        },

        [`${componentCls}-item-group-list ${componentCls}-submenu-title,${componentCls}-submenu-title`]:
          {
            paddingInlineEnd: '34px', // FIXME: hard code in v4
          },
      },
      // Motion enhance for first level
      [`${componentCls}-inline${componentCls}-root`]: {
        [`${componentCls}-item,${componentCls}-submenu-title`]: {
          display: 'flex',
          alignItems: 'center',
          transition: [
            `border-color ${motionDurationSlow}`,
            `background ${motionDurationSlow}`,
            `padding 0.1s ${motionEaseOut}`,
          ].join(','),

          [`> ${componentCls}-title-content`]: {
            flex: 'auto',
            minWidth: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },

          [`> *`]: {
            flex: 'none',
          },
        },
      },
      [`${componentCls}-submenu,${componentCls}-submenu-inline`]: {
        transition: [
          `border-color ${motionDurationSlow} ${motionEaseInOut}`,
          `background ${motionDurationSlow} ${motionEaseInOut}`,
          `padding ${motionDurationMid} ${motionEaseInOut}`,
        ].join(','),
      },
      [`${componentCls}-inline,${componentCls}-vertical,${componentCls}-vertical-left`]: {
        borderInlineEnd: `${lineWidth}px ${controlLineType} ${colorBorderSecondary}`,
      },

      // ========================= horizontal  ============================
      [`${componentCls}-horizontal`]: {
        lineHeight: '46px', // FIXME: hard code in v4
        border: 0,
        borderBlockEnd: `${lineWidth}px ${controlLineType} ${colorBorderSecondary}`,
        boxShadow: 'none',

        [`&:not(${componentCls}-dark)`]: {
          [`> ${componentCls}-item, > ${componentCls}-submenu`]: {
            marginBlockStart: '-1px', // FIXME: hard code in v4
            marginBlockEnd: 0,
            paddingBlock: 0,
            paddingInline: menuItemPaddingInline,
          },
          [`${componentCls}-item-active,${componentCls}-item-open,${componentCls}-item-selected, ${componentCls}-submenu-active,${componentCls}-submenu-open,${componentCls}-submenu-selected`]:
            {
              color: colorPrimary,

              '&::after': {
                borderBlockEnd: `2px ${controlLineType} ${colorPrimary}`, // FIXME: hard code in v4
              },
            },
        },

        [`> ${componentCls}-item, > ${componentCls}-submenu`]: {
          position: 'relative',
          insetBlockStart: '1px',
          display: 'inline-block',
          verticalAlign: 'bottom',

          '&::after': {
            position: 'absolute',
            insetInline: menuItemPaddingInline,
            insetBlockEnd: 0,
            borderBlockEnd: `2px ${controlLineType} transparent`, // FIXME: hard code in v4
            transition: `border-color ${motionDurationSlow} ${motionEaseInOut}`,
            content: '""',
          },
        },

        [`> ${componentCls}-submenu > ${componentCls}-submenu-title`]: {
          padding: 0,
        },

        [`> ${componentCls}-item`]: {
          a: {
            color: colorText,

            '&:hover': {
              color: colorPrimary,
            },

            '&::before': {
              insetBlockEnd: '-2px', // FIXME: hard code in v4
            },
          },

          [`${componentCls}-item-selected a`]: {
            color: colorPrimary,
          },
        },

        '&::after': {
          display: 'block',
          clear: 'both',
          height: 0,
          content: '"\\20"',
        },
      },

      [`${componentCls}-horizontal ${componentCls}-submenu`]: {
        transition: `border-color ${motionDurationSlow} ${motionEaseInOut},background ${motionDurationSlow} ${motionEaseInOut}`,
      },

      [`${componentCls}-horizontal ${componentCls}-item,${componentCls}-horizontal ${componentCls}-submenu`]:
        {
          marginBlockStart: '-1px', // FIXME: hard code in v4
        },

      [`${componentCls}-horizontal > ${componentCls}-item:hover,${componentCls}-horizontal > ${componentCls}-item-active,${componentCls}-horizontal > ${componentCls}-submenu ${componentCls}-submenu-title:hover`]:
        {
          backgroundColor: 'transparent',
        },

      [`${componentCls}-dark${componentCls}-horizontal`]: {
        borderBlockEnd: 0,
      },

      [`${componentCls}-dark${componentCls}-horizontal > ${componentCls}-item,${componentCls}-dark${componentCls}-horizontal > ${componentCls}-submenu`]:
        {
          insetBlockStart: 0,
          marginBlockStart: 0,
          paddingBlock: 0,
          paddingInline: menuItemPaddingInline,
          borderColor: darkBg,
          borderBlockEnd: 0,
        },

      [`${componentCls}-dark${componentCls}-horizontal > ${componentCls}-item:hover`]: {
        backgroundColor: colorPrimary,
      },

      [`${componentCls}-dark${componentCls}-horizontal > ${componentCls}-item > a::before`]: {
        insetBlockEnd: 0,
      },

      [`${componentCls}-horizontal ${componentCls}-item,${componentCls}-horizontal ${componentCls}-submenu-title`]:
        {
          transition: `border-color ${motionDurationSlow}, background ${motionDurationSlow}`,
        },
      // ========================= vertical  ============================
      [`${componentCls}-vertical ${componentCls}-submenu-selected,${componentCls}-vertical-left ${componentCls}-submenu-selected,${componentCls}-vertical-right ${componentCls}-submenu-selected`]:
        {
          color: colorPrimary,
        },

      [`${componentCls}-vertical`]: {
        [`${componentCls}-item-group-list ${componentCls}-submenu-title,${componentCls}-submenu-title`]:
          {
            borderInlineEnd: '34px', // FIXME: hard code in v4
          },
        [`${componentCls}-item`]: {
          height: controlHeightLG,
          marginBlock: marginXXS,
          paddingBlock: 0,
          paddingInline: `${padding}px`,
          overflow: 'hidden',
          lineHeight: `${controlHeightLG}px`,
          textOverflow: 'ellipsis',
        },
      },

      [`${componentCls}-vertical,${componentCls}-vertical-left,${componentCls}-vertical-right,${componentCls}-inline`]:
        {
          [`${componentCls}-item`]: {
            position: 'relative',

            '&::after': {
              position: 'absolute',
              insetBlockStart: 0,
              insetInlineEnd: 0,
              insetBlockEnd: 0,
              borderInlineEnd: `3px ${controlLineType} ${colorPrimary}`, // FIXME: hard code in v4
              transform: 'scaleY(0.0001)', // FIXME: hard code in v4
              opacity: 0,
              transition: [
                `transform ${motionDurationMid} ${motionEaseOut}`,
                `opacity ${motionDurationMid} ${motionEaseOut}`,
              ].join(','),
              content: '""',
            },
          },

          [`${componentCls}-item,${componentCls}-submenu-title`]: {
            height: controlHeightLG,
            marginBlock: marginXXS,
            paddingBlock: 0,
            paddingInline: `${padding}px`,
            overflow: 'hidden',
            lineHeight: `${controlHeightLG}px`,
            textOverflow: 'ellipsis',
          },

          // disable margin collapsed
          [`${componentCls}-submenu`]: {
            paddingBottom: '0.02px', // FIXME: hard code in v4
          },

          [`${componentCls}-item:not(:last-child)`]: {
            marginBlockEnd: marginXS,
          },

          [`> ${componentCls}-item, > ${componentCls}-submenu > ${componentCls}-submenu-title`]: {
            height: controlHeightLG,
            lineHeight: `${controlHeightLG}px`,
          },
        },
      // ========================= submenu  ============================
      [`${componentCls}-submenu`]: {
        // https://github.com/ant-design/ant-design/issues/13955
        [`${componentCls}-submenu-placement-rightTop::before`]: {
          insetBlockStart: 0,
          insetInlineStart: '-7px', // FIXME: hard code in v4
        },

        [`> ${componentCls}`]: {
          backgroundColor: colorBgComponent,
          borderRadius: radiusBase,

          [`${componentCls}-submenu-title::after`]: {
            transition: `transform ${motionDurationSlow} ${motionEaseInOut}`,
          },
        },

        [`${componentCls}-item a`]: {
          color: colorText,

          '&:hover': {
            color: colorPrimary,
          },

          '&::before': {
            position: 'absolute',
            insetBlockStart: 0,
            insetInlineEnd: 0,
            insetBlockEnd: 0,
            insetInlineStart: 0,
            backgroundColor: 'transparent',
            content: '""',
          },
        },
      },

      [`${componentCls}-submenu-popup > ${componentCls}`]: {
        backgroundColor: colorBgComponent,
      },

      [`${componentCls}-submenu ${componentCls}-sub`]: {
        cursor: 'initial',
        transition: `background ${motionDurationSlow} ${motionEaseInOut},padding ${motionDurationSlow} ${motionEaseInOut}`,
      },
      // ========================= submenu-popup  ============================
      [`${componentCls}-submenu-popup`]: {
        position: 'absolute',
        zIndex: zIndexPopup,
        background: 'transparent',
        borderRadius: radiusBase,
        // boxShadow: 'none',
        boxShadow,
        transformOrigin: '0 0',

        // https://github.com/ant-design/ant-design/issues/13955
        '&::before': {
          position: 'absolute',
          insetBlockStart: '-7px', // FIXME: hard code in v4
          insetInlineEnd: 0,
          insetBlockEnd: 0,
          insetInlineStart: 0,
          zIndex: -1,
          width: '100%',
          height: '100%',
          opacity: 0,
          content: '" "',
        },
        [`${componentCls}-item,${componentCls}-submenu-title`]: {
          height: controlHeightLG,
          marginBlock: marginXXS,
          paddingBlock: 0,
          paddingInline: `${padding}px`,
          overflow: 'hidden',
          lineHeight: `${controlHeightLG}px`,
          textOverflow: 'ellipsis',
        },
      },

      [`${componentCls}-dark${componentCls}-submenu-popup`]: {
        background: 'transparent',
      },

      // ========================= other  ============================
      // Integration with header element so menu items have the same height
      [`${antCls}-layout-header`]: {
        [`${componentCls}`]: {
          lineHeight: 'inherit',
        },
      },

      // https://github.com/ant-design/ant-design/issues/32950
      [`${antCls}-menu-inline-collapsed-tooltip`]: {
        'a,a:hover': {
          color: colorBgComponent,
        },
      },

      // Overflow ellipsis
      [`${componentCls}-overflow`]: {
        display: 'flex',

        [`${componentCls}-item`]: {
          flex: 'none',
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

      const { controlHeightLG } = token;

      const MenuToken = mergeToken<MenuToken>(token, {
        darkBg: '#001529', // FIXME: hard code in v4
        darkInlineSubmenuBg: '#000c17', // FIXME: hard code in v4
        highlightDangerColor: new TinyColor('#f5222d').setAlpha(0.2).toRgbString(), // FIXME: hard code in v4 // color(~`colorPalette('@{red-6}', 5) `)
        itemActiveDangerBg: new TinyColor('#f5222d').setAlpha(0.9).toRgbString(), // FIXME: hard code in v4 // color(~`colorPalette('@{red-6}', 1) `)
        itemActiveBg: '#e6f7ff', // FIXME: hard code in v4,
        textColorDark: new TinyColor('#000').setAlpha(0.85).toRgbString(), // FIXME: hard code in v4
        disabledColor: new TinyColor('#000').setAlpha(0.25).toRgbString(), // FIXME: hard code in v4
        darkColor: new TinyColor('#fff').setAlpha(0.65).toRgbString(), // FIXME: hard code in v4
        colorDark: new TinyColor('#fff').setAlpha(0.85).toRgbString(), // FIXME: hard code in v4
        disabledColorDark: new TinyColor('#fff').setAlpha(0.45).toRgbString(), // FIXME: hard code in v4
        darkHighlightColor: '#fff', // FIXME: hard code in v4
        boxShadowColor: new TinyColor('#1890ff').setAlpha(0.05).toRgbString(), // FIXME: hard code in v4, shade(@primary-color, 5%)
        menuInlineSubmenuBg: new TinyColor({ h: 0, s: 0, v: 98 }).toHexString(), // FIXME: hard code in v4
        menuItemPaddingInline: controlHeightLG / 2,
        sizeLg: 16, // FIXME: hard code in v4
      });

      return [
        genBaseStyle(MenuToken),
        genLightStyle(MenuToken),
        genStatusStyle(MenuToken),
        genDarkStyle(MenuToken),
      ];
    },
    token => ({
      dropdownWidth: 160,
      zIndexPopup: token.zIndexPopupBase + 50,
    }),
  );

  return useOriginHook(prefixCls);
};
