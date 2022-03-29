// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';

import {
  DerivativeToken,
  resetComponent,
  UseComponentStyleResult,
  useStyleRegister,
  useToken,
  GenerateStyle,
} from '../../_util/theme';

interface TabsToken extends DerivativeToken {
  tabsCls: string;
  iconPrefixCls: string;
  tabsCardHorizontalPadding: string;
  tabsCardHeight: number;
  tabsCardGutter: number;
  tabsHoverColor: string;
  tabsActiveColor: string;
  disabledColor: string;
  tabsHorizontalGutter: number;
  tabsCardHeadBackground: string;
  dropdownLineHeight: number;
  dropdownEdgeChildVerticalPadding: number;
  marginMD: number;
  paddingMD: number;
  boxShadowColor: string;
  borderColorSplit: string;
}

const genCardStyle: GenerateStyle<TabsToken> = (token: TabsToken): CSSObject => {
  const {
    tabsCls,
    tabsCardHorizontalPadding,
    tabsCardHeadBackground,
    tabsCardGutter,
    borderColorSplit,
  } = token;
  return {
    [`${tabsCls}-card`]: {
      [`> ${tabsCls}-nav, > div > ${tabsCls}-nav`]: {
        [`${tabsCls}-tab`]: {
          margin: 0,
          padding: tabsCardHorizontalPadding,
          background: tabsCardHeadBackground,
          border: `${token.controlLineWidth}px ${token.controlLineType} ${borderColorSplit}`,
          transition: `all ${token.motionDurationSlow} ${token.motionEaseInOut}`,
        },

        [`${tabsCls}-tab-active`]: {
          color: token.colorPrimary,
          background: token.colorBgComponent,
        },

        [`${tabsCls}-ink-bar`]: {
          visibility: 'hidden',
        },
      },

      // ========================== Top & Bottom ==========================
      [`&${tabsCls}-top, &${tabsCls}-bottom`]: {
        [`> ${tabsCls}-nav, > div > ${tabsCls}-nav`]: {
          [`${tabsCls}-tab + ${tabsCls}-tab`]: {
            marginLeft: `${tabsCardGutter}px`,
          },
        },
      },

      [`&${tabsCls}-top`]: {
        [`> ${tabsCls}-nav, > div > ${tabsCls}-nav`]: {
          [`${tabsCls}-tab`]: {
            borderRadius: `${token.radiusBase}px ${token.radiusBase}px 0 0`,
          },

          [`${tabsCls}-tab-active`]: {
            borderBottomColor: token.colorBgComponent,
          },
        },
      },

      [`&${tabsCls}-bottom`]: {
        [`> ${tabsCls}-nav, > div > ${tabsCls}-nav`]: {
          [`${tabsCls}-tab`]: {
            borderRadius: `0 0 ${token.radiusBase}px ${token.radiusBase}px`,
          },

          [`${tabsCls}-tab-active`]: {
            borderTopColor: token.colorBgComponent,
          },
        },
      },

      // ========================== Left & Right ==========================
      [`&${tabsCls}-left, &${tabsCls}-right`]: {
        [`> ${tabsCls}-nav, > div > ${tabsCls}-nav`]: {
          [`${tabsCls}-tab + ${tabsCls}-tab`]: {
            marginTop: `${tabsCardGutter}px`,
          },
        },
      },

      [`&${tabsCls}-left`]: {
        [`> ${tabsCls}-nav, > div > ${tabsCls}-nav`]: {
          [`${tabsCls}-tab`]: {
            borderRadius: `${token.radiusBase}px 0 0 ${token.radiusBase}px`,
          },

          [`${tabsCls}-tab-active`]: {
            borderRightColor: token.colorBgComponent,
          },
        },
      },

      [`&${tabsCls}-right`]: {
        [`> ${tabsCls}-nav, > div > ${tabsCls}-nav`]: {
          [`${tabsCls}-tab`]: {
            borderRadius: `0 ${token.radiusBase}px ${token.radiusBase}px 0`,
          },

          [`${tabsCls}-tab-active`]: {
            borderLeftColor: token.colorBgComponent,
          },
        },
      },
    },
  };
};

const genDropdownStyle: GenerateStyle<TabsToken> = (token: TabsToken): CSSObject => {
  const {
    tabsCls,
    disabledColor,
    dropdownLineHeight,
    tabsHoverColor,
    dropdownEdgeChildVerticalPadding,
  } = token;
  return {
    [`${tabsCls}-dropdown`]: {
      ...resetComponent(token),

      position: 'absolute',
      top: -9999,
      left: -9999,
      zIndex: 1050, // FIXME: hardcode in v4
      display: 'block',

      '&-hidden': {
        display: 'none',
      },

      '&-menu': {
        maxHeight: 200, // FIXME: hardcode in v4
        margin: 0,
        padding: `${dropdownEdgeChildVerticalPadding}px 0`,
        overflowX: 'hidden',
        overflowY: 'auto',
        textAlign: 'left',
        listStyleType: 'none',
        backgroundColor: token.colorBgComponent,
        backgroundClip: 'padding-box',
        borderRadius: token.radiusBase,
        outline: 'none',
        boxShadow: token.boxShadow,

        '&-item': {
          display: 'flex',
          alignItems: 'center',
          minWidth: 120, // FIXME: hardcode in v4
          margin: 0,
          padding: `5px ${token.paddingSM}px`, // FIXME: hardcode in v4
          overflow: 'hidden',
          color: token.colorText,
          fontWeight: 'normal',
          fontSize: token.fontSizeBase,
          lineHeight: dropdownLineHeight,
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          cursor: 'pointer',
          transition: `all ${token.motionDurationSlow}`,

          '> span': {
            flex: 1,
            whiteSpace: 'nowrap',
          },

          '&-remove': {
            flex: 'none',
            marginLeft: token.marginSM,
            color: token.colorTextSecondary,
            fontSize: token.fontSizeSM,
            background: 'transparent',
            border: 0,
            cursor: 'pointer',

            '&:hover': {
              color: tabsHoverColor,
            },
          },

          '&:hover': {
            background: token.controlItemBgHover,
          },

          '&-disabled': {
            '&, &:hover': {
              color: disabledColor,
              background: 'transparent',
              cursor: 'not-allowed',
            },
          },
        },
      },
    },
  };
};

const genPositionStyle: GenerateStyle<TabsToken> = (token: TabsToken): CSSObject => {
  const { tabsCls, marginMD, boxShadowColor, borderColorSplit } = token;
  return {
    // ========================== Top & Bottom ==========================
    [`${tabsCls}-top, ${tabsCls}-bottom`]: {
      flexDirection: 'column',

      [`> ${tabsCls}-nav, > div > ${tabsCls}-nav`]: {
        margin: `0 0 ${marginMD}px 0`,

        '&::before': {
          position: 'absolute',
          right: 0,
          left: 0,
          borderBottom: `${token.controlLineWidth}px ${token.controlLineType} ${borderColorSplit}`,
          content: "''",
        },

        [`${tabsCls}-ink-bar`]: {
          height: 2, // FIXME: hardcode in v4

          '&-animated': {
            transition: `width ${token.motionDurationSlow}, left ${token.motionDurationSlow},
            right ${token.motionDurationSlow}`,
          },
        },

        [`${tabsCls}-nav-wrap`]: {
          '&::before, &::after': {
            top: 0,
            bottom: 0,
            width: 30, // FIXME: hardcode in v4
          },

          '&::before': {
            left: 0,
            boxShadow: `inset 10px 0 8px -8px ${boxShadowColor}`, // FIXME: hardcode in v4
          },

          '&::after': {
            right: 0,
            boxShadow: `inset -10px 0 8px -8px ${boxShadowColor}`, // FIXME: hardcode in v4
          },

          [`&${tabsCls}-nav-wrap-ping-left::before`]: {
            opacity: 1,
          },
          [`&${tabsCls}-nav-wrap-ping-right::after`]: {
            opacity: 1,
          },
        },
      },
    },

    [`${tabsCls}-top`]: {
      [`> ${tabsCls}-nav,
        > div > ${tabsCls}-nav`]: {
        '&::before': {
          bottom: 0,
        },

        [`${tabsCls}-ink-bar`]: {
          bottom: 0,
        },
      },
    },

    [`${tabsCls}-bottom`]: {
      [`> ${tabsCls}-nav, > div > ${tabsCls}-nav`]: {
        order: 1,
        marginTop: `${marginMD}px`,
        marginBottom: 0,

        '&::before': {
          top: 0,
        },

        [`${tabsCls}-ink-bar`]: {
          top: 0,
        },
      },

      [`> ${tabsCls}-content-holder, > div > ${tabsCls}-content-holder`]: {
        order: 0,
      },
    },

    // ========================== Left & Right ==========================
    [`${tabsCls}-left, ${tabsCls}-right`]: {
      [`> ${tabsCls}-nav, > div > ${tabsCls}-nav`]: {
        flexDirection: 'column',
        minWidth: 50, // FIXME: hardcode in v4

        // >>>>>>>>>>> Tab
        [`${tabsCls}-tab`]: {
          padding: `${token.paddingXS}px ${token.paddingLG}px`,
          textAlign: 'center',
        },

        [`${tabsCls}-tab + ${tabsCls}-tab`]: {
          margin: `${token.marginMD}px 0 0 0`,
        },

        // >>>>>>>>>>> Nav
        [`${tabsCls}-nav-wrap`]: {
          flexDirection: 'column',

          '&::before, &::after': {
            right: 0,
            left: 0,
            height: 30, // FIXME: hardcode in v4
          },

          '&::before': {
            top: 0,
            boxShadow: `inset 0 10px 8px -8px ${boxShadowColor}`,
          },

          '&::after': {
            bottom: 0,
            boxShadow: `inset 0 -10px 8px -8px ${boxShadowColor}`,
          },

          [`&${tabsCls}-nav-wrap-ping-top::before`]: {
            opacity: 1,
          },

          [`&${tabsCls}-nav-wrap-ping-bottom::after`]: {
            opacity: 1,
          },
        },

        // >>>>>>>>>>> Ink Bar
        [`${tabsCls}-ink-bar`]: {
          width: 2, // FIXME: hardcode in v4

          '&-animated': {
            transition: `height ${token.motionDurationSlow}, top ${token.motionDurationSlow}`,
          },
        },

        [`${tabsCls}-nav-list, ${tabsCls}-nav-operations`]: {
          flex: '1 0 auto', // fix safari scroll problem
          flexDirection: 'column',
        },
      },
    },

    [`${tabsCls}-left`]: {
      [`> ${tabsCls}-nav, > div > ${tabsCls}-nav`]: {
        [`${tabsCls}-ink-bar`]: {
          right: 0,
        },
      },

      [`> ${tabsCls}-content-holder, > div > ${tabsCls}-content-holder`]: {
        marginLeft: `-${token.controlLineWidth}px`,
        borderLeft: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorBorder}`,

        [`> ${tabsCls}-content > ${tabsCls}-tabpane`]: {
          paddingLeft: token.paddingLG,
        },
      },
    },

    [`${tabsCls}-right`]: {
      [`> ${tabsCls}-nav, > div > ${tabsCls}-nav`]: {
        order: 1,

        [`${tabsCls}-ink-bar`]: {
          left: 0,
        },
      },

      [`> ${tabsCls}-content-holder, > div > ${tabsCls}-content-holder`]: {
        order: 0,
        marginRight: -token.controlLineWidth,
        borderRight: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorBorder}`,

        [`> ${tabsCls}-content > ${tabsCls}-tabpane`]: {
          paddingRight: token.paddingLG,
        },
      },
    },
  };
};

const genSizeStyle: GenerateStyle<TabsToken> = (token: TabsToken): CSSObject => {
  const { tabsCls, paddingMD } = token;
  return {
    [tabsCls]: {
      '&-small': {
        [`> ${tabsCls}-nav`]: {
          [`${tabsCls}-tab`]: {
            padding: `${token.paddingXS}px 0`,
            fontSize: token.fontSizeBase,
          },
        },
      },

      '&-large': {
        [`> ${tabsCls}-nav`]: {
          [`${tabsCls}-tab`]: {
            padding: `${paddingMD}px 0`,
            fontSize: token.fontSizeLG,
          },
        },
      },
    },

    [`${tabsCls}-card`]: {
      [`&${tabsCls}-small`]: {
        [`> ${tabsCls}-nav`]: {
          [`${tabsCls}-tab`]: {
            padding: `6px ${paddingMD}px`, // FIXME: hardcode in v4
          },
        },
      },

      [`&${tabsCls}-large`]: {
        [`> ${tabsCls}-nav`]: {
          [`${tabsCls}-tab`]: {
            padding: `7px ${paddingMD}px 6px`, // FIXME: hardcode in v4
          },
        },
      },
    },
  };
};

const genTabStyle: GenerateStyle<TabsToken, CSSObject> = (token: TabsToken) => {
  const {
    tabsCls,
    tabsActiveColor,
    tabsHoverColor,
    disabledColor,
    iconPrefixCls,
    tabsHorizontalGutter,
  } = token;

  const tabCls = `${tabsCls}-tab`;

  return {
    [tabCls]: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      padding: `${token.paddingSM}px 0`,
      fontSize: `${token.fontSizeBase}px`,
      background: 'transparent',
      border: 0,
      outline: 'none',
      cursor: 'pointer',
      '&-btn, &-remove': {
        '&:focus, &:active': {
          color: tabsActiveColor,
        },
      },
      '&-btn': {
        outline: 'none',
        transition: 'all 0.3s',
      },
      '&-remove': {
        flex: 'none',
        marginRight: -token.marginXXS,
        marginLeft: token.marginXS,
        color: token.colorTextSecondary,
        fontSize: token.fontSizeSM,
        background: 'transparent',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        transition: `all ${token.motionDurationSlow}`,
        '&:hover': {
          color: token.colorTextHeading,
        },
      },
      '&:hover': {
        color: tabsHoverColor,
      },

      [`&${tabCls}-active ${tabCls}-btn`]: {
        color: token.colorPrimary,
        textShadow: '0 0 0.25px currentcolor', // FIXME: hardcode in v4
      },

      [`&${tabCls}-disabled`]: {
        color: disabledColor,
        cursor: 'not-allowed',
      },
      [`&${tabCls}-disabled ${tabCls}-btn, &${tabCls}-disabled ${tabsCls}-remove`]: {
        '&:focus, &:active': {
          color: disabledColor,
        },
      },
      [`& ${tabCls}-remove ${iconPrefixCls}`]: {
        margin: 0,
      },
      [iconPrefixCls]: {
        marginRight: token.marginSM,
      },
    },

    [`${tabCls} + ${tabCls}`]: {
      margin: `0 0 0 ${tabsHorizontalGutter}px`,
    },
  };
};

const genRtlStyle: GenerateStyle<TabsToken, CSSObject> = (token: TabsToken) => {
  const { tabsCls, tabsHorizontalGutter, iconPrefixCls, tabsCardGutter } = token;
  const rtlCls = `${tabsCls}-rtl`;
  return {
    [rtlCls]: {
      direction: 'rtl',

      [`${tabsCls}-nav`]: {
        [`${tabsCls}-tab`]: {
          margin: `0 0 0 ${tabsHorizontalGutter}px`,

          [`${tabsCls}-tab:last-of-type`]: {
            marginLeft: 0,
          },

          [iconPrefixCls]: {
            marginRight: 0,
            marginLeft: `${token.marginSM}px`,
          },

          [`${tabsCls}-tab-remove`]: {
            marginRight: `${token.marginXS}px`,
            marginLeft: `-${token.marginXXS}px`,

            [iconPrefixCls]: {
              margin: 0,
            },
          },
        },
      },

      [`&${tabsCls}-left`]: {
        [`> ${tabsCls}-nav`]: {
          order: 1,
        },

        [`> ${tabsCls}-content-holder`]: {
          order: 0,
        },
      },

      [`&${tabsCls}-right`]: {
        [`> ${tabsCls}-nav`]: {
          order: 0,
        },

        [`> ${tabsCls}-content-holder`]: {
          order: 1,
        },
      },

      // ====================== Card ======================
      [`&${tabsCls}-card${tabsCls}-top, &${tabsCls}-card${tabsCls}-bottom`]: {
        [`> ${tabsCls}-nav, > div > ${tabsCls}-nav`]: {
          [`${tabsCls}-tab + ${tabsCls}-tab`]: {
            marginRight: `${tabsCardGutter}px`,
            marginLeft: 0,
          },
        },
      },
    },

    [`${tabsCls}-dropdown-rtl`]: {
      direction: 'rtl',
    },

    [`${tabsCls}-menu-item`]: {
      [`${tabsCls}-dropdown-rtl`]: {
        textAlign: 'right',
      },
    },
  };
};

const genTabsStyle: GenerateStyle<TabsToken> = (token: TabsToken): CSSObject => {
  const {
    tabsCls,
    tabsCardHorizontalPadding,
    tabsCardHeight,
    tabsCardGutter,
    tabsHoverColor,
    tabsActiveColor,
    borderColorSplit,
  } = token;

  return {
    [tabsCls]: {
      ...resetComponent(token),
      display: 'flex',
      overflow: 'hidden',

      // ========================== Navigation ==========================
      [`> ${tabsCls}-nav, > div > ${tabsCls}-nav`]: {
        position: 'relative',
        display: 'flex',
        flex: 'none',
        alignItems: 'center',

        [`${tabsCls}-nav-wrap`]: {
          position: 'relative',
          display: 'flex',
          flex: 'auto',
          alignSelf: 'stretch',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          transform: 'translate(0)', // Fix chrome render bug

          // >>>>> Ping shadow
          '&::before, &::after': {
            position: 'absolute',
            zIndex: 1,
            opacity: 0,
            transition: `opacity ${token.motionDurationSlow}`,
            content: "''",
            pointerEvents: 'none',
          },
        },

        [`${tabsCls}-nav-list`]: {
          position: 'relative',
          display: 'flex',
          transition: `opacity ${token.motionDurationSlow}`,
        },

        // >>>>>>>> Operations
        [`${tabsCls}-nav-operations`]: {
          display: 'flex',
          alignSelf: 'stretch',
        },

        [`${tabsCls}-nav-operations-hidden`]: {
          position: 'absolute',
          visibility: 'hidden',
          pointerEvents: 'none',
        },

        [`${tabsCls}-nav-more`]: {
          position: 'relative',
          padding: tabsCardHorizontalPadding,
          background: 'transparent',
          border: 0,

          '&::after': {
            position: 'absolute',
            right: 0,
            bottom: 0,
            left: 0,
            height: '5px',
            transform: 'translateY(100%)',
            content: "''",
          },
        },

        [`${tabsCls}-nav-add`]: {
          minWidth: `${tabsCardHeight}px`,
          marginLeft: `${tabsCardGutter}px`,
          padding: `0 ${token.paddingXS}px`,
          background: 'transparent',
          border: `${token.controlLineWidth}px ${token.controlLineType} ${borderColorSplit}`,
          borderRadius: `${token.radiusBase}px ${token.radiusBase}px 0 0`,
          outline: 'none',
          cursor: 'pointer',
          transition: `all ${token.motionDurationSlow} ${token.motionEaseInOut}`,

          '&:hover': {
            color: tabsHoverColor,
          },

          '&:active, &:focus': {
            color: tabsActiveColor,
          },
        },
      },

      [`${tabsCls}-extra-content`]: {
        flex: 'none',
      },

      // ============================ InkBar ============================
      [`${tabsCls}-ink-bar`]: {
        position: 'absolute',
        background: token.colorPrimary,
        pointerEvents: 'none',
      },

      // ============================= Tabs =============================
      ...genTabStyle(token),

      // =========================== TabPanes ===========================
      [`${tabsCls}-content`]: {
        display: 'flex',
        width: '100%',
      },

      [`${tabsCls}-content-holder`]: {
        flex: 'auto',
        minWidth: 0,
        minHeight: 0,
      },

      [`${tabsCls}-content-animated`]: {
        transition: `margin ${token.motionDurationSlow}`,
      },

      [`${tabsCls}-tabpane`]: {
        flex: 'none',
        width: '100%',
        outline: 'none',
      },
    },

    [`${tabsCls}-centered`]: {
      [`> ${tabsCls}-nav, > div > ${tabsCls}-nav`]: {
        [`${tabsCls}-nav-wrap`]: {
          [`&:not([class*='${tabsCls}-nav-wrap-ping'])`]: {
            justifyContent: 'center',
          },
        },
      },
    },
  };
};

// ============================== Export ==============================
export default function useStyle(
  prefixCls: string,
  iconPrefixCls: string,
): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  const paddingMD = 16; // FIXME: hardcode in v4
  const tabsCardHeight = 40; // FIXME: hardcode in v4

  const tabsToken: TabsToken = {
    ...token,
    tabsCls: `.${prefixCls}`,
    iconPrefixCls: `.${iconPrefixCls}`,

    marginMD: 16, // FIXME: hardcode in v4
    paddingMD, // FIXME: hardcode in v4
    tabsHoverColor: '#40a9ff', // FIXME: hardcode in v4, primary-5
    tabsActiveColor: '#096dd9', // FIXME: hardcode in v4, primary-7

    tabsCardHorizontalPadding: `${
      (tabsCardHeight - Math.floor(token.fontSizeBase * token.lineHeight)) / 2 -
      token.controlLineWidth
    }px ${paddingMD}px`,
    tabsCardHeight, // FIXME: hardcode in v4
    tabsCardGutter: 2, // FIXME: hardcode in v4
    tabsHorizontalGutter: 32, // FIXME: hardcode in v4
    tabsCardHeadBackground: new TinyColor({ h: 0, s: 0, v: 98 }).toHexString(), // FIXME: hardcode in v4

    dropdownLineHeight: 22, // FIXME: hardcode in v4
    dropdownEdgeChildVerticalPadding: 4, // FIXME: hardcode in v4
    disabledColor: new TinyColor('#000').setAlpha(0.25).toRgbString(), // FIXME: hardcode in v4
    boxShadowColor: new TinyColor('rgba(0, 0, 0, 0.15)').setAlpha(0.08).toRgbString(), // FIXME: hardcode in v4
    borderColorSplit: new TinyColor({ h: 0, s: 0, v: 94 }).toHexString(), // FIXME: hardcode in v4
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genSizeStyle(tabsToken),
      genRtlStyle(tabsToken),
      genPositionStyle(tabsToken),
      genDropdownStyle(tabsToken),
      genCardStyle(tabsToken),
      genTabsStyle(tabsToken),
    ]),
    hashId,
  ];
}
