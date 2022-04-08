// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';

import { resetComponent, GenerateStyle, genComponentStyleHook, FullToken } from '../../_util/theme';

interface TabsToken extends FullToken<'Tabs'> {
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
    componentCls,
    tabsCardHorizontalPadding,
    tabsCardHeadBackground,
    tabsCardGutter,
    borderColorSplit,
  } = token;
  return {
    [`${componentCls}-card`]: {
      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        [`${componentCls}-tab`]: {
          margin: 0,
          padding: tabsCardHorizontalPadding,
          background: tabsCardHeadBackground,
          border: `${token.controlLineWidth}px ${token.controlLineType} ${borderColorSplit}`,
          transition: `all ${token.motionDurationSlow} ${token.motionEaseInOut}`,
        },

        [`${componentCls}-tab-active`]: {
          color: token.colorPrimary,
          background: token.colorBgComponent,
        },

        [`${componentCls}-ink-bar`]: {
          visibility: 'hidden',
        },
      },

      // ========================== Top & Bottom ==========================
      [`&${componentCls}-top, &${componentCls}-bottom`]: {
        [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
          [`${componentCls}-tab + ${componentCls}-tab`]: {
            marginLeft: {
              _skip_check_: true,
              value: `${tabsCardGutter}px`,
            },
          },
        },
      },

      [`&${componentCls}-top`]: {
        [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            borderRadius: `${token.radiusBase}px ${token.radiusBase}px 0 0`,
          },

          [`${componentCls}-tab-active`]: {
            borderBottomColor: token.colorBgComponent,
          },
        },
      },

      [`&${componentCls}-bottom`]: {
        [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            borderRadius: `0 0 ${token.radiusBase}px ${token.radiusBase}px`,
          },

          [`${componentCls}-tab-active`]: {
            borderTopColor: token.colorBgComponent,
          },
        },
      },

      // ========================== Left & Right ==========================
      [`&${componentCls}-left, &${componentCls}-right`]: {
        [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
          [`${componentCls}-tab + ${componentCls}-tab`]: {
            marginTop: `${tabsCardGutter}px`,
          },
        },
      },

      [`&${componentCls}-left`]: {
        [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            borderRadius: {
              _skip_check_: true,
              value: `${token.radiusBase}px 0 0 ${token.radiusBase}px`,
            },
          },

          [`${componentCls}-tab-active`]: {
            borderRightColor: {
              _skip_check_: true,
              value: token.colorBgComponent,
            },
          },
        },
      },

      [`&${componentCls}-right`]: {
        [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            borderRadius: {
              _skip_check_: true,
              value: `0 ${token.radiusBase}px ${token.radiusBase}px 0`,
            },
          },

          [`${componentCls}-tab-active`]: {
            borderLeftColor: {
              _skip_check_: true,
              value: token.colorBgComponent,
            },
          },
        },
      },
    },
  };
};

const genDropdownStyle: GenerateStyle<TabsToken> = (token: TabsToken): CSSObject => {
  const {
    componentCls,
    disabledColor,
    dropdownLineHeight,
    tabsHoverColor,
    dropdownEdgeChildVerticalPadding,
  } = token;
  return {
    [`${componentCls}-dropdown`]: {
      ...resetComponent(token),

      position: 'absolute',
      top: -9999,
      left: {
        _skip_check_: true,
        value: -9999,
      },
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
        textAlign: {
          _skip_check_: true,
          value: 'left',
        },
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
          padding: `5px ${token.paddingSM}px`, // FIXME: hardcode in v4,
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
            marginLeft: {
              _skip_check_: true,
              value: token.marginSM,
            },
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
  const { componentCls, marginMD, boxShadowColor, borderColorSplit } = token;
  return {
    // ========================== Top & Bottom ==========================
    [`${componentCls}-top, ${componentCls}-bottom`]: {
      flexDirection: 'column',

      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        margin: `0 0 ${marginMD}px 0`,

        '&::before': {
          position: 'absolute',
          right: {
            _skip_check_: true,
            value: 0,
          },
          left: {
            _skip_check_: true,
            value: 0,
          },
          borderBottom: `${token.controlLineWidth}px ${token.controlLineType} ${borderColorSplit}`,
          content: "''",
        },

        [`${componentCls}-ink-bar`]: {
          height: 2, // FIXME: hardcode in v4

          '&-animated': {
            transition: `width ${token.motionDurationSlow}, left ${token.motionDurationSlow},
            right ${token.motionDurationSlow}`,
          },
        },

        [`${componentCls}-nav-wrap`]: {
          '&::before, &::after': {
            top: 0,
            bottom: 0,
            width: 30, // FIXME: hardcode in v4
          },

          '&::before': {
            left: {
              _skip_check_: true,
              value: 0,
            },
            boxShadow: `inset 10px 0 8px -8px ${boxShadowColor}`, // FIXME: hardcode in v4
          },

          '&::after': {
            right: {
              _skip_check_: true,
              value: 0,
            },
            boxShadow: `inset -10px 0 8px -8px ${boxShadowColor}`, // FIXME: hardcode in v4
          },

          [`&${componentCls}-nav-wrap-ping-left::before`]: {
            opacity: 1,
          },
          [`&${componentCls}-nav-wrap-ping-right::after`]: {
            opacity: 1,
          },
        },
      },
    },

    [`${componentCls}-top`]: {
      [`> ${componentCls}-nav,
        > div > ${componentCls}-nav`]: {
        '&::before': {
          bottom: 0,
        },

        [`${componentCls}-ink-bar`]: {
          bottom: 0,
        },
      },
    },

    [`${componentCls}-bottom`]: {
      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        order: 1,
        marginTop: `${marginMD}px`,
        marginBottom: 0,

        '&::before': {
          top: 0,
        },

        [`${componentCls}-ink-bar`]: {
          top: 0,
        },
      },

      [`> ${componentCls}-content-holder, > div > ${componentCls}-content-holder`]: {
        order: 0,
      },
    },

    // ========================== Left & Right ==========================
    [`${componentCls}-left, ${componentCls}-right`]: {
      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        flexDirection: 'column',
        minWidth: 50, // FIXME: hardcode in v4

        // >>>>>>>>>>> Tab
        [`${componentCls}-tab`]: {
          padding: `${token.paddingXS}px ${token.paddingLG}px`,
          textAlign: 'center',
        },

        [`${componentCls}-tab + ${componentCls}-tab`]: {
          margin: `${token.marginMD}px 0 0 0`,
        },

        // >>>>>>>>>>> Nav
        [`${componentCls}-nav-wrap`]: {
          flexDirection: 'column',

          '&::before, &::after': {
            right: {
              _skip_check_: true,
              value: 0,
            },
            left: {
              _skip_check_: true,
              value: 0,
            },
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

          [`&${componentCls}-nav-wrap-ping-top::before`]: {
            opacity: 1,
          },

          [`&${componentCls}-nav-wrap-ping-bottom::after`]: {
            opacity: 1,
          },
        },

        // >>>>>>>>>>> Ink Bar
        [`${componentCls}-ink-bar`]: {
          width: 2, // FIXME: hardcode in v4

          '&-animated': {
            transition: `height ${token.motionDurationSlow}, top ${token.motionDurationSlow}`,
          },
        },

        [`${componentCls}-nav-list, ${componentCls}-nav-operations`]: {
          flex: '1 0 auto', // fix safari scroll problem
          flexDirection: 'column',
        },
      },
    },

    [`${componentCls}-left`]: {
      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        [`${componentCls}-ink-bar`]: {
          right: {
            _skip_check_: true,
            value: 0,
          },
        },
      },

      [`> ${componentCls}-content-holder, > div > ${componentCls}-content-holder`]: {
        marginLeft: {
          _skip_check_: true,
          value: `-${token.controlLineWidth}px`,
        },
        borderLeft: {
          _skip_check_: true,
          value: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorBorder}`,
        },

        [`> ${componentCls}-content > ${componentCls}-tabpane`]: {
          paddingLeft: {
            _skip_check_: true,
            value: token.paddingLG,
          },
        },
      },
    },

    [`${componentCls}-right`]: {
      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        order: 1,

        [`${componentCls}-ink-bar`]: {
          left: {
            _skip_check_: true,
            value: 0,
          },
        },
      },

      [`> ${componentCls}-content-holder, > div > ${componentCls}-content-holder`]: {
        order: 0,
        marginRight: {
          _skip_check_: true,
          value: -token.controlLineWidth,
        },
        borderRight: {
          _skip_check_: true,
          value: `${token.controlLineWidth}px ${token.controlLineType} ${token.colorBorder}`,
        },

        [`> ${componentCls}-content > ${componentCls}-tabpane`]: {
          paddingRight: {
            _skip_check_: true,
            value: token.paddingLG,
          },
        },
      },
    },
  };
};

const genSizeStyle: GenerateStyle<TabsToken> = (token: TabsToken): CSSObject => {
  const { componentCls, paddingMD } = token;
  return {
    [componentCls]: {
      '&-small': {
        [`> ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            padding: `${token.paddingXS}px 0`,
            fontSize: token.fontSizeBase,
          },
        },
      },

      '&-large': {
        [`> ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            padding: `${paddingMD}px 0`,
            fontSize: token.fontSizeLG,
          },
        },
      },
    },

    [`${componentCls}-card`]: {
      [`&${componentCls}-small`]: {
        [`> ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            padding: `6px ${paddingMD}px`, // FIXME: hardcode in v4
          },
        },
      },

      [`&${componentCls}-large`]: {
        [`> ${componentCls}-nav`]: {
          [`${componentCls}-tab`]: {
            padding: `7px ${paddingMD}px 6px`, // FIXME: hardcode in v4
          },
        },
      },
    },
  };
};

const genTabStyle: GenerateStyle<TabsToken, CSSObject> = (token: TabsToken) => {
  const {
    componentCls,
    tabsActiveColor,
    tabsHoverColor,
    disabledColor,
    iconCls,
    tabsHorizontalGutter,
  } = token;

  const tabCls = `${componentCls}-tab`;

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
        marginRight: {
          _skip_check_: true,
          value: -token.marginXXS,
        },
        marginLeft: {
          _skip_check_: true,
          value: token.marginXS,
        },
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
      [`&${tabCls}-disabled ${tabCls}-btn, &${tabCls}-disabled ${componentCls}-remove`]: {
        '&:focus, &:active': {
          color: disabledColor,
        },
      },
      [`& ${tabCls}-remove ${iconCls}`]: {
        margin: 0,
      },
      [iconCls]: {
        marginRight: {
          _skip_check_: true,
          value: token.marginSM,
        },
      },
    },

    [`${tabCls} + ${tabCls}`]: {
      margin: {
        _skip_check_: true,
        value: `0 0 0 ${tabsHorizontalGutter}px`,
      },
    },
  };
};

const genRtlStyle: GenerateStyle<TabsToken, CSSObject> = (token: TabsToken) => {
  const { componentCls, tabsHorizontalGutter, iconCls, tabsCardGutter } = token;
  const rtlCls = `${componentCls}-rtl`;
  return {
    [rtlCls]: {
      direction: 'rtl',

      [`${componentCls}-nav`]: {
        [`${componentCls}-tab`]: {
          margin: {
            _skip_check_: true,
            value: `0 0 0 ${tabsHorizontalGutter}px`,
          },

          [`${componentCls}-tab:last-of-type`]: {
            marginLeft: {
              _skip_check_: true,
              value: 0,
            },
          },

          [iconCls]: {
            marginRight: {
              _skip_check_: true,
              value: 0,
            },
            marginLeft: {
              _skip_check_: true,
              value: `${token.marginSM}px`,
            },
          },

          [`${componentCls}-tab-remove`]: {
            marginRight: {
              _skip_check_: true,
              value: `${token.marginXS}px`,
            },
            marginLeft: {
              _skip_check_: true,
              value: `-${token.marginXXS}px`,
            },

            [iconCls]: {
              margin: 0,
            },
          },
        },
      },

      [`&${componentCls}-left`]: {
        [`> ${componentCls}-nav`]: {
          order: 1,
        },

        [`> ${componentCls}-content-holder`]: {
          order: 0,
        },
      },

      [`&${componentCls}-right`]: {
        [`> ${componentCls}-nav`]: {
          order: 0,
        },

        [`> ${componentCls}-content-holder`]: {
          order: 1,
        },
      },

      // ====================== Card ======================
      [`&${componentCls}-card${componentCls}-top, &${componentCls}-card${componentCls}-bottom`]: {
        [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
          [`${componentCls}-tab + ${componentCls}-tab`]: {
            marginRight: {
              _skip_check_: true,
              value: `${tabsCardGutter}px`,
            },
            marginLeft: { _skip_check_: true, value: 0 },
          },
        },
      },
    },

    [`${componentCls}-dropdown-rtl`]: {
      direction: 'rtl',
    },

    [`${componentCls}-menu-item`]: {
      [`${componentCls}-dropdown-rtl`]: {
        textAlign: {
          _skip_check_: true,
          value: 'right',
        },
      },
    },
  };
};

const genTabsStyle: GenerateStyle<TabsToken> = (token: TabsToken): CSSObject => {
  const {
    componentCls,
    tabsCardHorizontalPadding,
    tabsCardHeight,
    tabsCardGutter,
    tabsHoverColor,
    tabsActiveColor,
    borderColorSplit,
  } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),
      display: 'flex',
      overflow: 'hidden',

      // ========================== Navigation ==========================
      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        position: 'relative',
        display: 'flex',
        flex: 'none',
        alignItems: 'center',

        [`${componentCls}-nav-wrap`]: {
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

        [`${componentCls}-nav-list`]: {
          position: 'relative',
          display: 'flex',
          transition: `opacity ${token.motionDurationSlow}`,
        },

        // >>>>>>>> Operations
        [`${componentCls}-nav-operations`]: {
          display: 'flex',
          alignSelf: 'stretch',
        },

        [`${componentCls}-nav-operations-hidden`]: {
          position: 'absolute',
          visibility: 'hidden',
          pointerEvents: 'none',
        },

        [`${componentCls}-nav-more`]: {
          position: 'relative',
          padding: tabsCardHorizontalPadding,
          background: 'transparent',
          border: 0,

          '&::after': {
            position: 'absolute',
            right: {
              _skip_check_: true,
              value: 0,
            },
            bottom: 0,
            left: {
              _skip_check_: true,
              value: 0,
            },
            height: '5px',
            transform: 'translateY(100%)',
            content: "''",
          },
        },

        [`${componentCls}-nav-add`]: {
          minWidth: `${tabsCardHeight}px`,
          marginLeft: {
            _skip_check_: true,
            value: `${tabsCardGutter}px`,
          },
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

      [`${componentCls}-extra-content`]: {
        flex: 'none',
      },

      // ============================ InkBar ============================
      [`${componentCls}-ink-bar`]: {
        position: 'absolute',
        background: token.colorPrimary,
        pointerEvents: 'none',
      },

      // ============================= Tabs =============================
      ...genTabStyle(token),

      // =========================== TabPanes ===========================
      [`${componentCls}-content`]: {
        display: 'flex',
        width: '100%',
      },

      [`${componentCls}-content-holder`]: {
        flex: 'auto',
        minWidth: 0,
        minHeight: 0,
      },

      [`${componentCls}-content-animated`]: {
        transition: `margin ${token.motionDurationSlow}`,
      },

      [`${componentCls}-tabpane`]: {
        flex: 'none',
        width: '100%',
        outline: 'none',
      },
    },

    [`${componentCls}-centered`]: {
      [`> ${componentCls}-nav, > div > ${componentCls}-nav`]: {
        [`${componentCls}-nav-wrap`]: {
          [`&:not([class*='${componentCls}-nav-wrap-ping'])`]: {
            justifyContent: 'center',
          },
        },
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Tabs', token => {
  const paddingMD = 16; // FIXME: hardcode in v4
  const tabsCardHeight = 40; // FIXME: hardcode in v4

  const tabsToken: TabsToken = {
    ...token,

    marginMD: 16, // FIXME: hardcode in v4
    paddingMD, // FIXME: hardcode in v4
    tabsHoverColor: '#40a9ff', // FIXME: hardcode in v4, primary-5
    tabsActiveColor: '#096dd9', // FIXME: hardcode in v4, primary-7

    tabsCardHorizontalPadding: `
    ${
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
    genSizeStyle(tabsToken),
    genRtlStyle(tabsToken),
    genPositionStyle(tabsToken),
    genDropdownStyle(tabsToken),
    genCardStyle(tabsToken),
    genTabsStyle(tabsToken),
  ];
});
