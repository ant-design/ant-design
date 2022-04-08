// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import {
  DerivativeToken,
  useStyleRegister,
  useToken,
  UseComponentStyleResult,
  GenerateStyle,
  resetComponent,
  clearFix,
} from '../../_util/theme';

interface MenuToken extends DerivativeToken {
  rootPrefixCls: string;
  iconPrefixCls: string;
  menuCls: string;
  componentBackground: string;
  colorTextSecondary: string;
  motionDurationMD: string;
  primaryColor: string;
  borderColorSplit: string;
  itemActiveBackground: string;
  easeOut: string;
  zIndexDrop: number;
  menuOpacity: number;
  sizeLg: number;
  textColorDark: string;
  menuInlineSubmenuBg: string;
  disabledColor: string;
  antPrefix: string;
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
}

// =============================== Base ===============================
const accessibilityFocus: GenerateStyle<MenuToken, CSSObject> = token => ({
  boxShadow: `0 0 0 2px ${token.colorPrimarySecondary}`,
});

const accessibilityFocusDark: GenerateStyle<MenuToken, CSSObject> = token => ({
  boxShadow: `0 0 0 2px ${token.boxShadowColor}`,
});

const genStatusStyle = (token: MenuToken): CSSObject => {
  const { menuCls, highlightDangerColor, itemActiveDangerBg, darkHighlightColor, iconPrefixCls } =
    token;
  return {
    [`${menuCls}`]: {
      // Danger
      [`${menuCls}-item-danger${menuCls}-item`]: {
        color: highlightDangerColor,

        [`&:hover,${menuCls}-active`]: {
          color: highlightDangerColor,
        },

        ['&:active']: {
          background: itemActiveDangerBg,
        },

        [`${menuCls}-selected`]: {
          color: highlightDangerColor,

          ['> a, > a:hover']: {
            color: highlightDangerColor,
          },
        },

        [`${iconPrefixCls}:not(${iconPrefixCls}-horizontal) ${menuCls}-item-selected`]: {
          backgroundColor: itemActiveDangerBg,
        },

        [`${iconPrefixCls}-inline &::after`]: {
          borderRightColor: highlightDangerColor,
        },
      },

      // ==================== Dark ====================
      [`&-dark &-item-danger&-item`]: {
        [`&, &:hover, & > a`]: {
          color: highlightDangerColor,
        },
      },

      [`&-dark&-dark:not(&-horizontal) &-item-danger&-item-selected`]: {
        color: darkHighlightColor,
        backgroundColor: highlightDangerColor,
      },
    },
  };
};
const genLightStyle = (token: MenuToken): CSSObject => {
  const { menuCls, primaryColor } = token;
  return {
    [`${menuCls}-light`]: {
      // light theme
      [`
        ${menuCls}-item:hover,
        ${menuCls}-item-active,
        ${menuCls}:not(${menuCls}-inline) ${menuCls}-submenu-open,
        ${menuCls}-submenu-active,
        ${menuCls}-submenu-title:hover
      `]: {
        color: primaryColor,
        [`${menuCls}`]: {
          color: '#000',
        },
      },
    },
  };
};
const genDarkStyle = (token: MenuToken): CSSObject => {
  const { menuCls, darkColor, darkBg, darkHighlightColor } = token;
  return {
    [`&${menuCls}root:focus-visible`]: {
      ...accessibilityFocusDark(token),
    },

    [`${menuCls}-dark ${menuCls}-item, ${menuCls}-dark ${menuCls}-submenu-title`]: {
      '&:focus-visible': {
        ...accessibilityFocusDark(token),
      },
    },

    // dark theme
    [`&${menuCls}-dark,${menuCls}-dark ${menuCls}-sub,&${menuCls}-dark ${menuCls}-sub`]: {
      color: darkColor,
      background: darkBg,
      [`${menuCls}-submenu-title ${menuCls}-submenu-arrow`]: {
        opacity: 0.45,
        transition: 'all 0.3s',

        '&::after, &::before': {
          background: darkHighlightColor,
        },
      },
    },
  };
};

const genBaseStyle: GenerateStyle<MenuToken> = token => {
  const {
    radiusBase,
    zIndexDrop,
    menuCls,
    antPrefix,
    borderColorSplit,
    primaryColor,
    motionDurationSlow,
    controlLineType,
    motionEaseInOut,
    motionDurationMD,
    easeOut,
    iconPrefixCls,
    boxShadow,
    componentBackground,
    colorText,
    lineWidth,
    padding,
    marginXXS,
    marginXS,
    sizeLg,
    paddingXXS,
    menuInlineSubmenuBg,
    disabledColor,
    controlHeight,
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
    controlHeightLG,
  } = token;

  return {
    // default theme
    [menuCls]: {
      ...resetComponent(token),

      marginBlockEnd: 0,
      paddingInlineStart: 0, // Override default ul/ol
      color: colorText,
      fontSize,
      lineHeight: 0, // Fix display inline-block gap
      textAlign: 'left',
      listStyle: 'none',
      background: componentBackground,
      outline: 'none',
      boxShadow,
      transition: `background ${motionDurationSlow},width ${motionDurationSlow} cubic-bezier(0.2, 0, 0, 1) 0s`,
      ...clearFix(),

      // sub-menu
      [`${menuCls}`]: {
        color: '#000',
        ...clearFix(),
      },

      [`&${menuCls}-root:focus-visible`]: accessibilityFocus(token),

      'ul, ol': {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },

      [`${menuCls}-item-group-title`]: {
        paddingInline: `${padding}px`,
        paddingBlock: `${paddingXS}px`,
        color: colorTextSecondary,
        fontSize,
        lineHeight,
        transition: `all ${motionDurationSlow}`,
      },

      [`${menuCls}-submenu-selected`]: {
        color: primaryColor,
        [`${menuCls}`]: {
          color: '#000',
          ...clearFix(),
        },
      },

      [`${menuCls}-item:active,${menuCls}-submenu-title:active`]: {
        background: itemActiveBg,
      },

      [`${menuCls}-title-content`]: {
        transition: `color ${motionDurationSlow}`,
      },

      [`${menuCls}-item a`]: {
        color: colorText,

        '&:hover': {
          color: primaryColor,
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

      // https://github.com/ant-design/ant-design/issues/19809
      [`${menuCls}-item > ${antPrefix}-badge a`]: {
        color: colorText,

        '&:hover': {
          color: primaryColor,
        },
      },

      [`${menuCls}-item-divider`]: {
        overflow: 'hidden',
        lineHeight: 0,
        borderColor: borderColorSplit,
        borderStyle: controlLineType,
        borderBlockStartWidth: `${lineWidth}px`,
        borderBlockEndWidth: 0,
        borderInlineWidth: 0,
      },

      [`${menuCls}-item-divider-dashed`]: {
        borderStyle: 'dashed',
      },

      [`${menuCls}-item-selected`]: {
        color: primaryColor,

        'a,a:hover': {
          color: primaryColor,
        },
      },

      [`&:not(${menuCls}-horizontal) ${menuCls}-item-selected`]: {
        backgroundColor: itemActiveBg,
      },

      [`${menuCls}-vertical-right`]: {
        borderInlineStart: `${lineWidth}px ${controlLineType} ${borderColorSplit}`,
      },

      [`${menuCls}-vertical${menuCls}-sub,${menuCls}-vertical-left${menuCls}-sub,${menuCls}-vertical-right${menuCls}-sub`]:
        {
          minWidth: 160, // FIXME: hard code in v4
          maxHeight: 'calc(100vh - 100px)', // FIXME: hard code in v4
          padding: 0,
          overflow: 'hidden',
          borderInlineEnd: 0,

          // https://github.com/ant-design/ant-design/issues/22244
          // https://github.com/ant-design/ant-design/issues/26812
          [`&:not([class*='-active'])`]: {
            overflowX: 'hidden',
            overflowY: 'auto',
          },

          [`${menuCls}-item`]: {
            insetInlineStart: 0,
            marginInlineStart: 0,
            borderInlineEnd: 0,

            '&::after': {
              borderInlineEnd: 0,
            },
          },
          [`> ${menuCls}-item, > ${menuCls}-submenu`]: {
            transformOrigin: '0 0',
          },
        },

      [`${menuCls}-horizontal${menuCls}-sub`]: {
        // in case of submenu width is too big: https://codesandbox.io/s/qvpwm6mk66
        minWidth: '114px', // FIXME: hard code in v4,
      },

      [`${menuCls}-item,${menuCls}-submenu-title`]: {
        position: 'relative',
        display: 'block',
        margin: 0,
        paddingInline: '20px', // FIXME: hard code in v4
        paddingBlock: 0,
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        transition: `border-color ${motionDurationSlow}, background ${motionDurationSlow},padding ${motionDurationSlow} ${motionEaseInOut}`,

        [`${menuCls}-item-icon,${iconPrefixCls}`]: {
          minWidth: '14px', // FIXME: hard code in v4
          fontSize,
          transition: `font-size ${motionDurationMD} ${easeOut},margin ${motionDurationSlow} ${motionEaseInOut}, color ${motionDurationSlow}`,

          '+ span': {
            marginInlineStart: 10,
            opacity: 1,
            transition: `opacity ${motionDurationSlow} ${motionEaseInOut}, margin ${motionDurationSlow},color ${motionDurationSlow}`,
          },
        },

        [`${menuCls}-item-icon.svg`]: {
          verticalAlign: '-0.125em', // FIXME: hard code in v4
        },

        [`&${menuCls}-item-only-child`]: {
          [`> ${iconPrefixCls},> ${menuCls}-item-icon`]: {
            marginInlineEnd: 0,
          },
        },

        '&:focus-visible': {
          ...accessibilityFocus(token),
        },
      },

      [`& > ${menuCls}-item-divider`]: {
        margin: `${lineWidth}px 0`,
        padding: 0,
      },

      [`&${menuCls}-inline-collapsed`]: {
        width: '80px',

        [`
          > ${menuCls}-item,
          > ${menuCls}-item-group
          > ${menuCls}-item-group-list
          > ${menuCls}-item,
          > ${menuCls}-item-group
          > ${menuCls}-item-group-list
          > ${menuCls}-submenu
          > ${menuCls}-submenu-title,
          > ${menuCls}-submenu > ${menuCls}-submenu-title
        `]: {
          insetInlineStart: 0,
          paddingInline: `calc(50% - 8px)`, // FIXME: hard code in v4
          paddingBlock: 0,
          textOverflow: 'clip',

          [`${menuCls}-submenu-arrow`]: {
            opacity: 0,
          },

          [`${menuCls}-item-icon,${iconPrefixCls}`]: {
            margin: 0,
            fontSize: sizeLg,
            lineHeight: `${controlHeightLG}px`,

            '+ span': {
              display: 'inline-block',
              opacity: 0,
            },
          },
        },

        [`${menuCls}-item-icon,${iconPrefixCls}`]: {
          display: 'inline-block',
        },

        [`&-tooltip`]: {
          pointerEvents: 'none',

          [`${menuCls}-item-icon,${iconPrefixCls}`]: {
            display: 'none',
          },

          a: {
            color: colorDark,
          },
        },

        [`${menuCls}-item-group-title`]: {
          borderInline: `${paddingXXS}px`,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        },
      },

      [`${menuCls}-item-group-list`]: {
        margin: 0,
        padding: 0,
        [`${menuCls}-item,${menuCls}-submenu-title`]: {
          paddingBlock: 0,
          paddingInlineStart: '28px', // FIXME: hard code in v4
          paddingInlineEnd: '16px', // FIXME: hard code in v4
        },
      },
      [`${menuCls}-sub${menuCls}-inline`]: {
        padding: 0,
        background: menuInlineSubmenuBg,
        border: 0,
        borderRadius: 0,
        boxShadow: 'none',
        [`& > ${menuCls}-item,& > ${menuCls}-submenu > ${menuCls}-submenu-title`]: {
          height: controlHeightLG,
          lineHeight: `${controlHeightLG}px`,
          listStylePosition: 'inside',
          listStyleType: 'disc',
        },

        [`${menuCls}-item-group-title`]: {
          paddingInlineStart: `${controlHeight}px`,
        },
      },
      // Disabled state sets text to gray and nukes hover/tab effects
      [`${menuCls}-item-disabled, ${menuCls}-submenu-disabled`]: {
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
        [`> ${menuCls}-submenu-title`]: {
          color: `${disabledColor} !important`,
          cursor: 'not-allowed',
          [`> ${menuCls}-submenu-arrow`]: {
            [`&::before, &::after`]: {
              background: `${disabledColor} !important`,
            },
          },
        },
      },

      [`${menuCls}-submenu-arrow`]: {
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

      [`${menuCls}-submenu-horizontal ${menuCls}-submenu-arrow`]: {
        display: 'none',
      },

      [`${menuCls}-inline-collapsed ${menuCls}-submenu-arrow, ${menuCls}-submenu-inline ${menuCls}-submenu-arrow`]:
        {
          // ↓
          '&::before': {
            transform: `rotate(-45deg) translateX(2.5px)`, // FIXME: hard code in v4
          },

          '&::after': {
            transform: `rotate(45deg) translateX(-2.5px)`, // FIXME: hard code in v4
          },
        },
      [`${menuCls}-submenu-open${menuCls}-submenu-inline > ${menuCls}-submenu-title > ${menuCls}-submenu-arrow`]:
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
      [`${menuCls}-submenu-expand-icon,${menuCls}-submenu-arrow`]: {
        position: 'absolute',
        insetBlockStart: '50%',
        insetInlineEnd: '16px', // FIXME: hard code in v4
        width: '10px', // FIXME: hard code in v4
        color: colorText,
        transform: 'translateY(-50%)', // FIXME
        transition: `transform ${motionDurationSlow} ${motionEaseInOut}`,
      },
      [`
        ${menuCls}-submenu:hover > ${menuCls}-submenu-title > ${menuCls}-submenu-expand-icon,
        ${menuCls}-submenu:hover > ${menuCls}-submenu-title > ${menuCls}-submenu-arrow
      `]: {
        color: primaryColor,
      },
      ...genDarkStyle(token),

      [`${menuCls}-vertical ${menuCls}-item`]: {
        height: controlHeightLG,
        marginBlock: marginXXS,
        paddingBlock: 0,
        paddingInline: `${padding}px`,
        overflow: 'hidden',
        lineHeight: `${controlHeightLG}px`,
        textOverflow: 'ellipsis',
      },
      [`${menuCls}-hidden`]: {
        display: 'none',
      },
    },

    [`${menuCls}-submenu-hidden`]: {
      display: 'none',
    },
    // ========================= root  ============================
    [`${menuCls}-root${menuCls}-vertical,
      ${menuCls}-root${menuCls}-vertical-left,
      ${menuCls}-root${menuCls}-vertical-right,
      ${menuCls}-root${menuCls}-inline`]: {
      boxShadow: 'none',
    },
    [`${menuCls}-root&-inline-collapsed`]: {
      [`${menuCls}-item,${menuCls}-submenu ${menuCls}-submenu-title`]: {
        [`> ${menuCls}-inline-collapsed-noicon`]: {
          fontSize: sizeLg,
          textAlign: 'center',
        },
      },
    },

    // ========================= dark  ============================
    [`${menuCls}-dark ${menuCls}-inline${menuCls}-sub`]: {
      background: darkInlineSubmenuBg,
    },

    [`
      ${menuCls}-dark ${menuCls}-item,${menuCls}-dark ${menuCls}-item-group-title,
      ${menuCls}-dark ${menuCls}-item > a,${menuCls}-dark ${menuCls}-item > span > a
    `]: {
      color: darkColor,
    },

    [`
      ${menuCls}-dark${menuCls}-inline,${menuCls}-dark${menuCls}-vertical,
      ${menuCls}-dark${menuCls}-vertical-left,${menuCls}-dark${menuCls}-vertical-right
    `]: {
      borderInlineEnd: 0,
    },

    [`
      ${menuCls}-dark${menuCls}-inline ${menuCls}-item,
      ${menuCls}-dark${menuCls}-vertical ${menuCls}-item,
      ${menuCls}-dark${menuCls}-vertical-left ${menuCls}-item,
      ${menuCls}-dark${menuCls}-vertical-right ${menuCls}-item
    `]: {
      insetInlineStart: 0,
      marginInlineStart: 0,
      borderInlineEnd: 0,

      '&::after': {
        borderInlineEnd: 0,
      },
    },

    [`
      ${menuCls}-dark${menuCls}-inline ${menuCls}-item,
      ${menuCls}-dark${menuCls}-inline ${menuCls}-submenu-title
    `]: {
      width: '100%',
    },

    [`
      ${menuCls}-dark ${menuCls}-item:hover,
      ${menuCls}-dark ${menuCls}-item-active,
      ${menuCls}-dark ${menuCls}-submenu-active,
      ${menuCls}-dark ${menuCls}-submenu-open,
      ${menuCls}-dark ${menuCls}-submenu-selected,
      ${menuCls}-dark ${menuCls}-submenu-title:hover
    `]: {
      color: darkHighlightColor,
      backgroundColor: 'transparent',
      [`${menuCls}`]: {
        color: '#000',
        ...clearFix(),
      },
      '> a, > span > a': {
        color: darkHighlightColor,
      },
      [`> ${menuCls}-submenu-title`]: {
        [`> ${menuCls}-submenu-arrow`]: {
          opacity: 1,

          '&::after, &::before': {
            background: darkHighlightColor,
          },
        },
      },
    },

    [`${menuCls}-dark ${menuCls}-item:hover`]: {
      backgroundColor: 'transparent',
    },

    [`${menuCls}-dark${menuCls}-dark:not(${menuCls}-horizontal) ${menuCls}-item-selected`]: {
      backgroundColor: primaryColor,
    },

    [`${menuCls}-dark ${menuCls}-item-selected`]: {
      color: darkHighlightColor,
      borderInlineEnd: 0,

      '&::after': {
        borderInlineEnd: 0,
      },

      '> a, > span > a, > a:hover,> span > a:hover': {
        color: darkHighlightColor,
      },

      [`${menuCls}-item-icon, ${iconPrefixCls}`]: {
        color: darkHighlightColor,

        '+ span': {
          color: darkHighlightColor,
        },
      },
    },

    [`&${menuCls}-dark ${menuCls}-item-selected,${menuCls}-submenu-popup${menuCls}-dark ${menuCls}-item-selected`]:
      {
        backgroundColor: primaryColor,
      },

    // Disabled state sets text to dark gray and nukes hover/tab effects
    [`${menuCls}-dark ${menuCls}-item-disabled,${menuCls}-dark ${menuCls}-submenu-disabled`]: {
      '&, > a, > span > a': {
        color: `${disabledColorDark} !important`,
        opacity: 0.8,
      },
      [`> ${menuCls}-submenu-title`]: {
        color: `${disabledColorDark} !important`,
        [`> ${menuCls}-submenu-arrow`]: {
          [`&::before, &::after`]: {
            background: `${disabledColorDark} !important`,
          },
        },
      },
    },

    // ========================= inline  ============================
    [`${menuCls}${menuCls}-inline`]: {
      width: '100%',
      [`${menuCls}-selected,${menuCls}-item-selected`]: {
        '&::after': {
          transform: 'scaleY(1)',
          opacity: 1,
          transition: `transform ${motionDurationMD} ${motionEaseInOut},opacity ${motionDurationMD} ${motionEaseInOut}`,
        },
      },

      [`${menuCls}-item,${menuCls}-submenu-title`]: {
        width: 'calc(100% + 1px)', // FIXME: hard code in v4
      },

      [`${menuCls}-item-group-list ${menuCls}-submenu-title,${menuCls}-submenu-title`]: {
        paddingInlineEnd: '34px', // FIXME: hard code in v4
      },
    },
    // Motion enhance for first level
    [`${menuCls}-inline${menuCls}-root`]: {
      [`${menuCls}-item,${menuCls}-submenu-title`]: {
        display: 'flex',
        alignItems: 'center',
        transition: `border-color ${motionDurationSlow}, background ${motionDurationSlow},padding 0.1s ${easeOut}`,

        [`> ${menuCls}-title-content`]: {
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
    [`${menuCls}-submenu,${menuCls}-submenu-inline`]: {
      transition: `border-color ${motionDurationSlow} ${motionEaseInOut},background ${motionDurationSlow} ${motionEaseInOut},padding ${motionDurationMD} ${motionEaseInOut}`,
    },
    [`${menuCls}-inline,${menuCls}-vertical,${menuCls}-vertical-left`]: {
      borderInlineEnd: `${lineWidth}px ${controlLineType} ${borderColorSplit}`,
    },

    // ========================= horizontal  ============================
    [`${menuCls}-horizontal`]: {
      lineHeight: '46px', // FIXME: hard code in v4
      border: 0,
      borderBlockEnd: `${lineWidth}px ${controlLineType} ${borderColorSplit}`,
      boxShadow: 'none',

      [`&:not(${menuCls}-dark)`]: {
        [`> ${menuCls}-item, > ${menuCls}-submenu`]: {
          marginBlocStart: '-1px', // FIXME: hard code in v4
          marginBlockEnd: 0,
          paddingBlock: 0,
          paddingInline: '20px',
          [`&:hover,&-active,&-open,&-selected`]: {
            color: primaryColor,

            '&::after': {
              borderBlockEnd: `2px ${controlLineType} ${primaryColor}`, // FIXME: hard code in v4
            },
          },
        },
      },

      [`> ${menuCls}-item, > ${menuCls}-submenu`]: {
        position: 'relative',
        insetBlockStart: '1px',
        display: 'inline-block',
        verticalAlign: 'bottom',

        '&::after': {
          position: 'absolute',
          insetInlineEnd: '20px', // FIXME: hard code in v4
          insetBlockEnd: 0,
          insetInlineStart: '20px', // FIXME: hard code in v4
          borderBlockEnd: '2px ${controlLineType} transparent',
          transition: `border-color ${motionDurationSlow} ${motionEaseInOut}`,
          content: '""',
        },
      },

      [`> ${menuCls}-submenu > ${menuCls}-submenu-title`]: {
        padding: 0,
      },

      [`> ${menuCls}-item`]: {
        a: {
          color: colorText,

          '&:hover': {
            color: primaryColor,
          },

          '&::before': {
            insetBlockEnd: '-2px', // FIXME: hard code in v4
          },
        },

        [`&-selected a`]: {
          color: primaryColor,
        },
      },

      '&::after': {
        display: 'block',
        clear: 'both',
        height: 0,
        content: `' '`, // FIXME  '\20'
      },
    },

    [`${menuCls}-horizontal ${menuCls}-submenu`]: {
      transition: `border-color ${motionDurationSlow} ${motionEaseInOut},background ${motionDurationSlow} ${motionEaseInOut}`,
    },

    [`${menuCls}-horizontal ${menuCls}-item,${menuCls}-horizontal ${menuCls}-submenu`]: {
      marginBlocStart: '-1px',
    },

    [`${menuCls}-horizontal > ${menuCls}-item:hover,${menuCls}-horizontal > ${menuCls}-item-active,${menuCls}-horizontal > ${menuCls}-submenu ${menuCls}-submenu-title:hover`]:
      {
        backgroundColor: 'transparent',
      },

    [`${menuCls}-dark${menuCls}-horizontal`]: {
      borderBlockEnd: 0,
    },

    [`${menuCls}-dark${menuCls}-horizontal > ${menuCls}-item,${menuCls}-dark${menuCls}-horizontal > ${menuCls}-submenu`]:
      {
        insetBlockStart: 0,
        marginBlockStart: 0,
        paddingBlock: 0,
        paddingInline: '20px', // FIXME: hard code in v4
        borderColor: darkBg,
        borderBlockEnd: 0,
      },

    [`${menuCls}-dark${menuCls}-horizontal > ${menuCls}-item:hover`]: {
      backgroundColor: primaryColor,
    },

    [`${menuCls}-dark${menuCls}-horizontal > ${menuCls}-item > a::before`]: {
      insetBlockEnd: 0,
    },

    [`${menuCls}-horizontal ${menuCls}-item,${menuCls}-horizontal ${menuCls}-submenu-title`]: {
      transition: `border-color ${motionDurationSlow}, background ${motionDurationSlow}`,
    },
    // ========================= vertical  ============================
    [`${menuCls}-vertical ${menuCls}-submenu-selected,${menuCls}-vertical-left ${menuCls}-submenu-selected,${menuCls}-vertical-right ${menuCls}-submenu-selected`]:
      {
        color: primaryColor,
      },

    [`${menuCls}-vertical`]: {
      [`${menuCls}-item-group-list ${menuCls}-submenu-title,${menuCls}-submenu-title`]: {
        borderInlineEnd: '34px', // FIXME: hard code in v4
      },
      [`${menuCls}-item`]: {
        height: controlHeightLG,
        marginBlock: marginXXS,
        paddingBlock: 0,
        paddingInline: `${padding}px`,
        overflow: 'hidden',
        lineHeight: `${controlHeightLG}px`,
        textOverflow: 'ellipsis',
      },
    },

    [`${menuCls}-vertical,${menuCls}-vertical-left,${menuCls}-vertical-right,${menuCls}-inline`]: {
      [`${menuCls}-item`]: {
        position: 'relative',

        '&::after': {
          position: 'absolute',
          insetBlockStart: 0,
          insetInlineEnd: 0,
          insetBlockEnd: 0,
          borderInlineEnd: `3px ${controlLineType} ${primaryColor}`, // FIXME: hard code in v4
          transform: 'scaleY(0.0001)', // FIXME: hard code in v4
          opacity: 0,
          transition: `transform ${motionDurationMD} ${easeOut},opacity ${motionDurationMD} ${easeOut}`,
          content: '""',
        },
      },

      [`${menuCls}-item,${menuCls}-submenu-title`]: {
        height: controlHeightLG,
        marginBlock: marginXXS,
        paddingBlock: 0,
        paddingInline: `${padding}px`,
        overflow: 'hidden',
        lineHeight: `${controlHeightLG}px`,
        textOverflow: 'ellipsis',
      },

      // disable margin collapsed
      [`${menuCls}-submenu`]: {
        paddingBottom: '0.02px', // FIXME: hard code in v4
      },

      [`${menuCls}-item:not(:last-child)`]: {
        marginBlockEnd: marginXS,
      },

      [`> ${menuCls}-item, > ${menuCls}-submenu > ${menuCls}-submenu-title`]: {
        height: controlHeightLG,
        lineHeight: `${controlHeightLG}px`,
      },
    },
    // ========================= submenu  ============================
    [`${menuCls}-submenu`]: {
      // https://github.com/ant-design/ant-design/issues/13955
      [`&-placement-rightTop::before`]: {
        insetBlockStart: 0,
        insetInlineStart: '-7px', // FIXME: hard code in v4
      },

      [`> ${menuCls}`]: {
        backgroundColor: componentBackground,
        borderRadius: radiusBase,

        [`&-submenu-title::after`]: {
          transition: `transform ${motionDurationSlow} ${motionEaseInOut}`,
        },
      },

      [`${menuCls}-item a`]: {
        color: colorText,

        '&:hover': {
          color: primaryColor,
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

    [`${menuCls}-submenu-popup > ${menuCls}`]: {
      backgroundColor: componentBackground,
    },

    [`${menuCls}-submenu ${menuCls}-sub`]: {
      cursor: 'initial',
      transition: `background ${motionDurationSlow} ${motionEaseInOut},padding ${motionDurationSlow} ${motionEaseInOut}`,
    },
    // ========================= submenu-popup  ============================
    [`${menuCls}-submenu-popup`]: {
      position: 'absolute',
      zIndex: zIndexDrop,
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
        opacity: 0.0001,
        content: '" "',
      },
      [`${menuCls}-item,${menuCls}-submenu-title`]: {
        height: controlHeightLG,
        marginBlock: marginXXS,
        paddingBlock: 0,
        paddingInline: `${padding}px`,
        overflow: 'hidden',
        lineHeight: `${controlHeightLG}px`,
        textOverflow: 'ellipsis',
      },
    },

    [`${menuCls}-dark${menuCls}-submenu-popup`]: {
      background: 'transparent',
    },

    // ========================= other  ============================
    // Integration with header element so menu items have the same height
    [`${antPrefix}-layout-header`]: {
      [`${menuCls}`]: {
        lineHeight: 'inherit',
      },
    },

    // https://github.com/ant-design/ant-design/issues/32950
    [`${antPrefix}-menu-inline-collapsed-tooltip`]: {
      'a,a:hover': {
        color: componentBackground,
      },
    },

    // Overflow ellipsis
    [`${menuCls}-overflow`]: {
      display: 'flex',

      [`${menuCls}-item`]: {
        flex: 'none',
      },
    },
  };
};

// ============================== Export ==============================
export default function useStyle(
  rootPrefixCls: string,
  prefixCls: string,
  iconPrefixCls: string,
): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  const menuToken: MenuToken = {
    ...token,
    rootPrefixCls,
    iconPrefixCls,
    menuCls: `.${prefixCls}`,

    antPrefix: `.ant`, // FIXME: hard code in v4
    componentBackground: '#fff', // FIXME: hard code in v4
    darkBg: '#001529', // FIXME: hard code in v4
    darkInlineSubmenuBg: '#000c17', // FIXME: hard code in v4
    colorTextSecondary: new TinyColor('#000').setAlpha(0.45).toRgbString(), // FIXME: hard code in v4
    highlightDangerColor: new TinyColor('#f5222d').setAlpha(0.2).toRgbString(), // FIXME: hard code in v4 // color(~`colorPalette('@{red-6}', 5) `)
    itemActiveDangerBg: new TinyColor('#f5222d').setAlpha(0.9).toRgbString(), // FIXME: hard code in v4 // color(~`colorPalette('@{red-6}', 1) `)
    itemActiveBackground: new TinyColor('#000').setAlpha(0.9).toRgbString(), // FIXME: hard code in v4
    itemActiveBg: '#e6f7ff', // FIXME: hard code in v4,
    textColorDark: new TinyColor('#000').setAlpha(0.85).toRgbString(), // FIXME: hard code in v4
    disabledColor: new TinyColor('#000').setAlpha(0.25).toRgbString(), // FIXME: hard code in v4
    darkColor: new TinyColor('#fff').setAlpha(0.65).toRgbString(), // FIXME: hard code in v4
    colorDark: new TinyColor('#fff').setAlpha(0.85).toRgbString(), // FIXME: hard code in v4
    disabledColorDark: new TinyColor('#fff').setAlpha(0.45).toRgbString(), // FIXME: hard code in v4
    darkHighlightColor: '#fff', // FIXME: hard code in v4
    motionDurationMD: '0.15s', // FIXME: hard code in v4,
    primaryColor: '#1890ff', // FIXME: hard code in v4
    boxShadowColor: new TinyColor('#1890ff').setAlpha(0.05).toRgbString(), // FIXME: hard code in v4, shade(@primary-color, 5%)
    borderColorSplit: new TinyColor({ h: 0, s: 0, v: 94 }).toHexString(), // FIXME: hard code in v4
    menuInlineSubmenuBg: new TinyColor({ h: 0, s: 0, v: 98 }).toHexString(), // FIXME: hard code in v4
    easeOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)', // FIXME: hard code in v4

    zIndexDrop: 1050,
    menuOpacity: 0.0001,

    sizeLg: 16,
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genBaseStyle(menuToken, hashId),
      genDarkStyle(menuToken),
      genLightStyle(menuToken),
      genStatusStyle(menuToken),
    ]),
    hashId,
  ];
}
