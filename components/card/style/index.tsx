// import '../../style/index.less';
// import './index.less';

// style dependencies
// import '../../tabs/style';
// import '../../row/style';
// import '../../col/style';

// deps-lint-skip-all
import { CSSObject, Keyframes } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';

import {
  resetComponent,
  GenerateStyle,
  genComponentStyleHook,
  FullToken,
  mergeToken,
  clearFix,
} from '../../_util/theme';

interface CardToken extends FullToken<'Card'> {
  rootPrefixCls: string;
  cardHoverableHoverBorder: string;
  cardShadow: string;
  cardHeadHeight: number;
  cardHeadHeightSM: number;
  cardHeadPadding: number;
  cardPaddingBase: number;
  cardHeadTabsMarginBottom: number;
  cardInnerHeadPadding: number;
  cardActionsLiMargin: string;
  cardActionsIconSize: number;
  cardSkeletonBg: string;
  borderColorSplit: string;
  backgroundColorLight: string;
  gradientMin: string;
  gradientMax: string;
}

// ============================== Motion ==============================
const antCardLoading = new Keyframes('antCardLoading', {
  '0%, 100%': {
    backgroundPosition: '0 50%',
  },

  '50%': {
    backgroundPosition: '100% 50%',
  },
});

// ============================== Styles ==============================

// ============================== Head ==============================
const genCardHeadStyle: GenerateStyle<CardToken> = (token): CSSObject => {
  const {
    rootPrefixCls,
    componentCls,
    cardHoverableHoverBorder,
    cardHeadHeight,
    cardHeadPadding,
    cardPaddingBase,
    cardHeadTabsMarginBottom,
    borderColorSplit,
  } = token;

  return {
    minHeight: cardHeadHeight,
    marginBottom: -1, // Fix card grid overflow bug: https://gw.alipayobjects.com/zos/rmsportal/XonYxBikwpgbqIQBeuhk.png
    padding: `0 ${cardPaddingBase}px`,
    color: token.colorTextHeading,
    fontWeight: 500, // FIXME: hardcode in v4
    fontSize: token.fontSizeLG,
    background: cardHoverableHoverBorder,
    borderBottom: `${token.controlLineWidth}px ${token.controlLineType} ${borderColorSplit}`,
    borderRadius: `${token.radiusBase}px ${token.radiusBase}px 0 0`,

    ...clearFix(),

    '&-wrapper': {
      display: 'flex',
      alignItems: 'center',
    },

    '&-title': {
      display: 'inline-block',
      flex: 1,
      padding: `${cardHeadPadding}px 0`,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',

      [`
          > ${componentCls}-typography,
          > ${componentCls}-typography-edit-content
        `]: {
        insetInlineStart: 0,
        marginTop: 0,
        marginBottom: 0,
      },
    },

    [`.${rootPrefixCls}-tabs-top`]: {
      clear: 'both',
      marginBottom: cardHeadTabsMarginBottom,
      color: token.colorText,
      fontWeight: 'normal',
      fontSize: token.fontSizeBase,

      '&-bar': {
        borderBottom: `${token.controlLineWidth}px ${token.controlLineType} ${borderColorSplit}`,
      },
    },
  };
};

// ============================== Grid ==============================
const genCardGridStyle: GenerateStyle<CardToken> = (token): CSSObject => {
  const { cardPaddingBase, borderColorSplit, cardShadow } = token;
  return {
    float: {
      _skip_check_: true,
      value: 'left',
    },
    width: '33.33%', // FIXME: hardcode in v4
    padding: cardPaddingBase,
    border: 0,
    borderRadius: 0,
    boxShadow: `
    1px 0 0 0 ${borderColorSplit},
    0 1px 0 0 ${borderColorSplit},
    1px 1px 0 0 ${borderColorSplit},
    1px 0 0 0 ${borderColorSplit} inset,
    0 1px 0 0 ${borderColorSplit} inset;
    transition: all ${token.motionDurationSlow}
  `, // FIXME: hardcode in v4

    '&-hoverable:hover': {
      position: 'relative',
      zIndex: 1,
      boxShadow: cardShadow,
    },
  };
};

// ============================== Actions ==============================
const genCardActionsStyle: GenerateStyle<CardToken> = (token): CSSObject => {
  const { componentCls, iconCls, cardActionsLiMargin, cardActionsIconSize, borderColorSplit } =
    token;
  return {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    background: token.colorBgComponent,
    borderTop: `${token.controlLineWidth}px ${token.controlLineType} ${borderColorSplit}`,
    ...clearFix(),

    '& > li': {
      float: 'left',
      margin: cardActionsLiMargin,
      color: token.colorTextSecondary,
      textAlign: 'center',

      '> span': {
        position: 'relative',
        display: 'block',
        minWidth: 32, // FIXME: hardcode in v4
        fontSize: token.fontSizeBase,
        lineHeight: token.lineHeight,
        cursor: 'pointer',

        '&:hover': {
          color: token.colorPrimary,
          transition: `color ${token.motionDurationSlow}`,
        },

        [`a:not(${componentCls}-btn), > ${iconCls}`]: {
          display: 'inline-block',
          width: '100%',
          color: token.colorTextSecondary,
          lineHeight: '22px', // FIXME: hardcode in v4
          transition: `color ${token.motionDurationSlow}`,

          '&:hover': {
            color: token.colorPrimary,
          },
        },

        [`> ${iconCls}`]: {
          fontSize: cardActionsIconSize,
          lineHeight: '22px', // FIXME: hardcode in v4
        },
      },

      '&:not(:last-child)': {
        borderInlineEnd: `${token.controlLineWidth}px ${token.controlLineType} ${borderColorSplit}`,
      },
    },
  };
};

// ============================== Meta ==============================
const genCardMetaStyle: GenerateStyle<CardToken> = (token): CSSObject => ({
  margin: '-4px 0', // FIXME: hardcode in v4
  ...clearFix(),

  '&-avatar': {
    float: 'left',
    paddingInlineEnd: 16, // FIXME: hardcode in v4
  },

  '&-detail': {
    overflow: 'hidden',

    '> div:not(:last-child)': {
      marginBottom: token.marginXS,
    },
  },

  '&-title': {
    overflow: 'hidden',
    color: token.colorTextHeading,
    fontWeight: 500, // FIXME: hardcode in v4
    fontSize: token.fontSizeLG,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  '&-description': {
    color: token.colorTextSecondary,
  },
});

// ============================== Inner ==============================
const genCardTypeInnerStyle: GenerateStyle<CardToken> = (token): CSSObject => {
  const { componentCls, cardPaddingBase, backgroundColorLight, cardInnerHeadPadding } = token;

  return {
    [`${componentCls}-head`]: {
      padding: `0 ${cardPaddingBase}px`,
      background: backgroundColorLight,

      '&-title': {
        padding: `${cardInnerHeadPadding}px 0`,
        fontSize: token.fontSizeBase,
      },
    },

    [`${componentCls}-body`]: {
      padding: `16px ${cardPaddingBase}px`, // FIXME: hardcode in v4
    },

    [`${componentCls}-extra`]: {
      padding: `${cardInnerHeadPadding + 1.5}px 0`,
    },
  };
};

// ============================== Loading ==============================
const genCardLoadingStyle: GenerateStyle<CardToken> = (token): CSSObject => {
  const { componentCls, gradientMin, gradientMax } = token;

  return {
    overflow: 'hidden',

    [`${componentCls}-body`]: {
      userSelect: 'none',
    },

    [`${componentCls}-loading-content p`]: {
      margin: 0,
    },

    [`${componentCls}-loading-block`]: {
      height: 14, // FIXME: hardcode in v4
      margin: '4px 0', // FIXME: hardcode in v4
      background: `linear-gradient(90deg, ${gradientMin}, ${gradientMax}, ${gradientMin})`,
      backgroundSize: '600% 600%',
      borderRadius: token.radiusBase,
      animationName: antCardLoading,
      animationDuration: '1.4s', // FIXME: hardcode
      animationTimingFunction: 'ease',
      animationIterationCount: 'infinite',
    },
  };
};

// ============================== Basic ==============================
const genCardStyle: GenerateStyle<CardToken> = (token): CSSObject => {
  const {
    componentCls,
    cardHoverableHoverBorder,
    cardShadow,
    cardHeadHeight,
    cardHeadPadding,
    cardPaddingBase,
    borderColorSplit,
  } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),

      position: 'relative',
      background: token.colorBgComponent,
      borderRadius: token.radiusBase,

      [`${componentCls}-head`]: genCardHeadStyle(token),

      [`${componentCls}-extra`]: {
        float: 'right',
        // https://stackoverflow.com/a/22429853/3040605
        marginInlineStart: 'auto',
        padding: '',
        color: '',
        fontWeight: 'normal',
        fontSize: token.fontSizeBase,
      },

      [`${componentCls}-body`]: {
        padding: cardPaddingBase,
        ...clearFix(),
      },

      [`${componentCls}-grid`]: genCardGridStyle(token),

      [`${componentCls}-cover`]: {
        '> *': {
          display: 'block',
          width: '100%',
        },

        img: {
          borderRadius: `${token.radiusBase}px ${token.radiusBase}px 0 0`,
        },
      },

      [`${componentCls}-actions`]: genCardActionsStyle(token),

      [`${componentCls}-meta`]: genCardMetaStyle(token),
    },

    [`${componentCls}-bordered`]: {
      border: `${token.controlLineWidth}px ${token.controlLineType} ${borderColorSplit}`,

      [`${componentCls}-cover`]: {
        marginTop: -1,
        marginInlineStart: -1,
        marginInlineEnd: -1,
      },
    },

    [`${componentCls}-hoverable`]: {
      cursor: 'pointer',
      transition: `box-shadow ${token.motionDurationSlow}, border-color ${token.motionDurationSlow}`,

      '&:hover': {
        borderColor: cardHoverableHoverBorder,
        boxShadow: cardShadow,
      },
    },

    [`${componentCls}-contain-grid:not(&-loading) ${componentCls}-body`]: {
      margin: {
        _skip_check_: true,
        value: '-1px 0 0 -1px', // FIXME: hardcode in v4
      },
      padding: 0,
    },

    [`${componentCls}-contain-tabs`]: {
      [`> ${componentCls}-head`]: {
        [`${componentCls}-head-title`]: {
          minHeight: cardHeadHeight - cardHeadPadding,
          paddingBottom: 0,
        },

        [`${componentCls}-extra`]: {
          paddingBottom: 0,
        },
      },
    },

    [`${componentCls}-type-inner`]: genCardTypeInnerStyle(token),

    [`${componentCls}-loading`]: genCardLoadingStyle(token),
  };
};

// ============================== RTL ==============================
const genCardRTLStyle: GenerateStyle<CardToken> = (token): CSSObject => {
  const { componentCls } = token;
  return {
    // rtl
    [`${componentCls}-rtl`]: {
      direction: 'rtl',

      [`${componentCls}-grid`]: {
        float: 'right',
      },

      [`${componentCls}-actions`]: {
        '& > li': {
          float: 'right',
        },
      },

      [`${componentCls}-meta`]: {
        '&-avatar': {
          float: 'right',
        },
      },
    },
  };
};

// ============================== Size ==============================
const genCardSizeStyle: GenerateStyle<CardToken> = (token): CSSObject => {
  const { componentCls, cardHeadHeightSM, cardPaddingBase, cardHeadPadding } = token;
  const cardPaddingBaseSM = cardPaddingBase / 2;
  const cardHeadPaddingSM = cardHeadPadding / 2;

  return {
    [`${componentCls}-small`]: {
      [`> ${componentCls}-head`]: {
        minHeight: cardHeadHeightSM,
        padding: `0 ${cardPaddingBaseSM}px`,
        fontSize: token.fontSizeBase,

        [`> ${componentCls}-head-wrapper`]: {
          [`> ${componentCls}-head-title`]: {
            padding: `${cardHeadPaddingSM}px 0`,
          },

          [`> ${componentCls}-extra`]: {
            padding: `${cardHeadPaddingSM}px 0`,
            fontSize: token.fontSizeBase,
          },
        },
      },

      [`> ${componentCls}-body`]: {
        padding: cardPaddingBaseSM,
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Card', (token, { rootPrefixCls }) => {
  const cardToken = mergeToken<CardToken>(token, {
    rootPrefixCls,

    cardHoverableHoverBorder: 'transparent', // FIXME: hardcode in v4
    cardShadow: `
      0 1px 2px -2px ${new TinyColor('rgba(0, 0, 0, 0.16)').toRgbString()},
      0 3px 6px 0 ${new TinyColor('rgba(0, 0, 0, 0.12)').toRgbString()},
      0 5px 12px 4px ${new TinyColor('rgba(0, 0, 0, 0.09)').toRgbString()}
    `, // FIXME: hardcode in v4
    cardHeadHeight: 48, // FIXME: hardcode in v4
    cardHeadHeightSM: 30, // FIXME: hardcode in v4
    cardHeadPadding: 16, // FIXME: hardcode in v4
    cardPaddingBase: 24, // FIXME: hardcode in v4
    cardHeadTabsMarginBottom: -17, // FIXME: hardcode in v4
    cardInnerHeadPadding: 12, // FIXME: hardcode in v4
    cardActionsLiMargin: '12px 0', // FIXME: hardcode in v4
    cardActionsIconSize: 16, // FIXME: hardcode in v4
    borderColorSplit: new TinyColor({ h: 0, s: 0, v: 94 }).toHexString(), // FIXME: hardcode in v4
    backgroundColorLight: new TinyColor({ h: 0, s: 0, v: 98 }).toHexString(), // FIXME: hardcode in v4
    gradientMin: new TinyColor('#cfd8dc').setAlpha(0.2).toRgbString(), // FIXME: hardcode in v4
    gradientMax: new TinyColor('#cfd8dc').setAlpha(0.4).toRgbString(), // FIXME: hardcode in v4
  });

  return [
    // Style
    genCardStyle(cardToken),

    // Size
    genCardSizeStyle(cardToken),

    // RTL
    genCardRTLStyle(cardToken),
  ];
});
