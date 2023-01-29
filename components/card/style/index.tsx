import type { CSSObject } from '@ant-design/cssinjs';

import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import { clearFix, resetComponent, textEllipsis } from '../../style';

export interface ComponentToken {}

interface CardToken extends FullToken<'Card'> {
  cardHeaderHeight: number;
  cardHeaderHeightSM: number;
  cardShadow: string;
  cardHeadHeight: number;
  cardHeadPadding: number;
  cardPaddingSM: number;
  cardPaddingBase: number;
  cardHeadTabsMarginBottom: number;
  cardInnerHeadPadding: number;
  cardActionsLiMargin: string;
  cardActionsIconSize: number;
}

// ============================== Styles ==============================

// ============================== Head ==============================
const genCardHeadStyle: GenerateStyle<CardToken> = (token): CSSObject => {
  const {
    antCls,
    componentCls,
    cardHeadHeight,
    cardHeadPadding,
    cardPaddingBase,
    cardHeadTabsMarginBottom,
  } = token;

  return {
    minHeight: cardHeadHeight,
    marginBottom: -1, // Fix card grid overflow bug: https://gw.alipayobjects.com/zos/rmsportal/XonYxBikwpgbqIQBeuhk.png
    padding: `0 ${cardPaddingBase}px`,
    color: token.colorTextHeading,
    fontWeight: token.fontWeightStrong,
    fontSize: token.fontSizeLG,
    background: 'transparent',
    borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary}`,
    borderRadius: `${token.borderRadiusLG}px ${token.borderRadiusLG}px 0 0`,

    ...clearFix(),

    '&-wrapper': {
      display: 'flex',
      alignItems: 'center',
    },

    '&-title': {
      display: 'inline-block',
      flex: 1,
      padding: `${cardHeadPadding}px 0`,
      ...textEllipsis,

      [`
          > ${componentCls}-typography,
          > ${componentCls}-typography-edit-content
        `]: {
        insetInlineStart: 0,
        marginTop: 0,
        marginBottom: 0,
      },
    },

    [`${antCls}-tabs-top`]: {
      clear: 'both',
      marginBottom: cardHeadTabsMarginBottom,
      color: token.colorText,
      fontWeight: 'normal',
      fontSize: token.fontSize,

      '&-bar': {
        borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorBorderSecondary}`,
      },
    },
  };
};

// ============================== Grid ==============================
const genCardGridStyle: GenerateStyle<CardToken> = (token): CSSObject => {
  const { cardPaddingBase, colorBorderSecondary, cardShadow, lineWidth } = token;
  return {
    width: '33.33%',
    padding: cardPaddingBase,
    border: 0,
    borderRadius: 0,
    boxShadow: `
      ${lineWidth}px 0 0 0 ${colorBorderSecondary},
      0 ${lineWidth}px 0 0 ${colorBorderSecondary},
      ${lineWidth}px ${lineWidth}px 0 0 ${colorBorderSecondary},
      ${lineWidth}px 0 0 0 ${colorBorderSecondary} inset,
      0 ${lineWidth}px 0 0 ${colorBorderSecondary} inset;
    `,
    transition: `all ${token.motionDurationMid}`,

    '&-hoverable:hover': {
      position: 'relative',
      zIndex: 1,
      boxShadow: cardShadow,
    },
  };
};

// ============================== Actions ==============================
const genCardActionsStyle: GenerateStyle<CardToken> = (token): CSSObject => {
  const { componentCls, iconCls, cardActionsLiMargin, cardActionsIconSize, colorBorderSecondary } =
    token;
  return {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    background: token.colorBgContainer,
    borderTop: `${token.lineWidth}px ${token.lineType} ${colorBorderSecondary}`,
    display: 'flex',
    borderRadius: `0 0 ${token.borderRadiusLG}px ${token.borderRadiusLG}px `,
    ...clearFix(),

    '& > li': {
      margin: cardActionsLiMargin,
      color: token.colorTextDescription,
      textAlign: 'center',

      '> span': {
        position: 'relative',
        display: 'block',
        minWidth: token.cardActionsIconSize * 2,
        fontSize: token.fontSize,
        lineHeight: token.lineHeight,
        cursor: 'pointer',

        '&:hover': {
          color: token.colorPrimary,
          transition: `color ${token.motionDurationMid}`,
        },

        [`a:not(${componentCls}-btn), > ${iconCls}`]: {
          display: 'inline-block',
          width: '100%',
          color: token.colorTextDescription,
          lineHeight: `${token.fontSize * token.lineHeight}px`,
          transition: `color ${token.motionDurationMid}`,

          '&:hover': {
            color: token.colorPrimary,
          },
        },

        [`> ${iconCls}`]: {
          fontSize: cardActionsIconSize,
          lineHeight: `${cardActionsIconSize * token.lineHeight}px`,
        },
      },

      '&:not(:last-child)': {
        borderInlineEnd: `${token.lineWidth}px ${token.lineType} ${colorBorderSecondary}`,
      },
    },
  };
};

// ============================== Meta ==============================
const genCardMetaStyle: GenerateStyle<CardToken> = (token): CSSObject => ({
  margin: `-${token.marginXXS}px 0`,
  display: 'flex',
  ...clearFix(),

  '&-avatar': {
    paddingInlineEnd: token.padding,
  },

  '&-detail': {
    overflow: 'hidden',
    flex: 1,

    '> div:not(:last-child)': {
      marginBottom: token.marginXS,
    },
  },

  '&-title': {
    color: token.colorTextHeading,
    fontWeight: token.fontWeightStrong,
    fontSize: token.fontSizeLG,
    ...textEllipsis,
  },

  '&-description': {
    color: token.colorTextDescription,
  },
});

// ============================== Inner ==============================
const genCardTypeInnerStyle: GenerateStyle<CardToken> = (token): CSSObject => {
  const { componentCls, cardPaddingBase, colorFillAlter, cardInnerHeadPadding } = token;

  return {
    [`${componentCls}-head`]: {
      padding: `0 ${cardPaddingBase}px`,
      background: colorFillAlter,

      '&-title': {
        padding: `${cardInnerHeadPadding}px 0`,
        fontSize: token.fontSize,
      },
    },

    [`${componentCls}-body`]: {
      padding: `${token.padding}px ${cardPaddingBase}px`,
    },

    [`${componentCls}-extra`]: {
      padding: `${cardInnerHeadPadding + 1.5}px 0`,
    },
  };
};

// ============================== Loading ==============================
const genCardLoadingStyle: GenerateStyle<CardToken> = (token): CSSObject => {
  const { componentCls } = token;

  return {
    overflow: 'hidden',

    [`${componentCls}-body`]: {
      userSelect: 'none',
    },
  };
};

// ============================== Basic ==============================
const genCardStyle: GenerateStyle<CardToken> = (token): CSSObject => {
  const {
    componentCls,
    cardShadow,
    cardHeadHeight,
    cardHeadPadding,
    colorBorderSecondary,
    boxShadow,
    cardPaddingBase,
  } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),

      position: 'relative',
      background: token.colorBgContainer,
      borderRadius: token.borderRadiusLG,

      [`&:not(${componentCls}-bordered)`]: {
        boxShadow,
      },

      [`${componentCls}-head`]: genCardHeadStyle(token),

      [`${componentCls}-extra`]: {
        // https://stackoverflow.com/a/22429853/3040605
        marginInlineStart: 'auto',
        padding: '',
        color: '',
        fontWeight: 'normal',
        fontSize: token.fontSize,
      },

      [`${componentCls}-body`]: {
        padding: cardPaddingBase,
        borderRadius: ` 0 0 ${token.borderRadiusLG}px ${token.borderRadiusLG}px`,
        ...clearFix(),
      },

      [`${componentCls}-grid`]: genCardGridStyle(token),

      [`${componentCls}-cover`]: {
        '> *': {
          display: 'block',
          width: '100%',
        },

        img: {
          borderRadius: `${token.borderRadiusLG}px ${token.borderRadiusLG}px 0 0`,
        },
      },

      [`${componentCls}-actions`]: genCardActionsStyle(token),

      [`${componentCls}-meta`]: genCardMetaStyle(token),
    },

    [`${componentCls}-bordered`]: {
      border: `${token.lineWidth}px ${token.lineType} ${colorBorderSecondary}`,

      [`${componentCls}-cover`]: {
        marginTop: -1,
        marginInlineStart: -1,
        marginInlineEnd: -1,
      },
    },

    [`${componentCls}-hoverable`]: {
      cursor: 'pointer',
      transition: `box-shadow ${token.motionDurationMid}, border-color ${token.motionDurationMid}`,

      '&:hover': {
        borderColor: 'transparent',
        boxShadow: cardShadow,
      },
    },

    [`${componentCls}-contain-grid`]: {
      [`${componentCls}-body`]: {
        display: 'flex',
        flexWrap: 'wrap',
      },

      [`&:not(${componentCls}-loading) ${componentCls}-body`]: {
        marginBlockStart: -token.lineWidth,
        marginInlineStart: -token.lineWidth,
        padding: 0,
      },
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

    [`${componentCls}-rtl`]: {
      direction: 'rtl',
    },
  };
};

// ============================== Size ==============================
const genCardSizeStyle: GenerateStyle<CardToken> = (token): CSSObject => {
  const { componentCls, cardPaddingSM, fontSize, lineHeight, cardHeaderHeightSM } = token;
  const cardHeadPaddingSM = (cardHeaderHeightSM - fontSize * lineHeight) / 2;

  return {
    [`${componentCls}-small`]: {
      [`> ${componentCls}-head`]: {
        minHeight: cardHeaderHeightSM,
        padding: `0 ${cardPaddingSM}px`,
        fontSize: token.fontSize,

        [`> ${componentCls}-head-wrapper`]: {
          [`> ${componentCls}-head-title`]: {
            padding: `${cardHeadPaddingSM}px 0`,
          },

          [`> ${componentCls}-extra`]: {
            padding: `${cardHeadPaddingSM}px 0`,
            fontSize: token.fontSize,
          },
        },
      },

      [`> ${componentCls}-body`]: {
        padding: cardPaddingSM,
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Card', (token) => {
  const cardToken = mergeToken<CardToken>(token, {
    cardShadow: token.boxShadowCard,
    cardHeaderHeight: token.fontSizeLG * token.lineHeightLG + token.padding * 2,
    cardHeaderHeightSM: token.fontSize * token.lineHeight + token.paddingXS * 2,
    cardHeadPadding: token.padding,
    cardPaddingBase: token.paddingLG,
    cardHeadTabsMarginBottom: -token.padding - token.lineWidth,
    cardInnerHeadPadding: token.paddingSM,
    cardActionsLiMargin: `${token.paddingSM}px 0`,
    cardActionsIconSize: token.fontSize,
    cardPaddingSM: 12, // Fixed padding.
  });

  return [
    // Style
    genCardStyle(cardToken),

    // Size
    genCardSizeStyle(cardToken),
  ];
});
