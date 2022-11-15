import type { CSSObject } from '@ant-design/cssinjs';

import type { FullToken, GenerateStyle } from '../../theme';
import { genComponentStyleHook, mergeToken } from '../../theme';
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
    colorTextHeading,
    fontWeightStrong,
    fontSizeLG,
    lineWidth,
    lineType,
    colorBorderSecondary,
    borderRadiusLG,
    colorText,
    fontSize,
  } = token;

  return {
    minHeight: cardHeadHeight,
    marginBottom: -1, // Fix card grid overflow bug: https://gw.alipayobjects.com/zos/rmsportal/XonYxBikwpgbqIQBeuhk.png
    padding: `0 ${cardPaddingBase}px`,
    color: colorTextHeading,
    fontWeight: fontWeightStrong,
    fontSize: fontSizeLG,
    background: 'transparent',
    borderBottom: `${lineWidth}px ${lineType} ${colorBorderSecondary}`,
    borderRadius: `${borderRadiusLG}px ${borderRadiusLG}px 0 0`,

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
      color: colorText,
      fontWeight: 'normal',
      fontSize,

      '&-bar': {
        borderBottom: `${lineWidth}px ${lineType} ${colorBorderSecondary}`,
      },
    },
  };
};

// ============================== Grid ==============================
const genCardGridStyle: GenerateStyle<CardToken> = (token): CSSObject => {
  const { cardPaddingBase, colorBorderSecondary, cardShadow, lineWidth, motionDurationFast } =
    token;
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
    transition: `all ${motionDurationFast}`,

    '&-hoverable:hover': {
      position: 'relative',
      zIndex: 1,
      boxShadow: cardShadow,
    },
  };
};

// ============================== Actions ==============================
const genCardActionsStyle: GenerateStyle<CardToken> = (token): CSSObject => {
  const {
    componentCls,
    iconCls,
    cardActionsLiMargin,
    cardActionsIconSize,
    colorBorderSecondary,
    colorBgContainer,
    lineWidth,
    lineType,
    colorTextDescription,
    fontSize,
    lineHeight,
    colorPrimary,
    motionDurationFast,
  } = token;
  return {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    background: colorBgContainer,
    borderTop: `${lineWidth}px ${lineType} ${colorBorderSecondary}`,
    display: 'flex',
    ...clearFix(),

    '& > li': {
      margin: cardActionsLiMargin,
      color: colorTextDescription,
      textAlign: 'center',

      '> span': {
        position: 'relative',
        display: 'block',
        minWidth: cardActionsIconSize * 2,
        fontSize,
        lineHeight,
        cursor: 'pointer',

        '&:hover': {
          color: colorPrimary,
          transition: `color ${motionDurationFast}`,
        },

        [`a:not(${componentCls}-btn), > ${iconCls}`]: {
          display: 'inline-block',
          width: '100%',
          color: colorTextDescription,
          lineHeight: `${fontSize * lineHeight}px`,
          transition: `color ${motionDurationFast}`,

          '&:hover': {
            color: colorPrimary,
          },
        },

        [`> ${iconCls}`]: {
          fontSize: cardActionsIconSize,
          lineHeight: `${cardActionsIconSize * lineHeight}px`,
        },
      },

      '&:not(:last-child)': {
        borderInlineEnd: `${lineWidth}px ${lineType} ${colorBorderSecondary}`,
      },
    },
  };
};

// ============================== Meta ==============================
const genCardMetaStyle: GenerateStyle<CardToken> = ({
  marginXXS,
  padding,
  marginXS,
  colorTextHeading,
  fontWeightStrong,
  fontSizeLG,
  colorTextDescription,
}): CSSObject => ({
  margin: `-${marginXXS}px 0`,
  display: 'flex',
  ...clearFix(),

  '&-avatar': {
    paddingInlineEnd: padding,
  },

  '&-detail': {
    overflow: 'hidden',

    '> div:not(:last-child)': {
      marginBottom: marginXS,
    },
  },

  '&-title': {
    color: colorTextHeading,
    fontWeight: fontWeightStrong,
    fontSize: fontSizeLG,
    ...textEllipsis,
  },

  '&-description': {
    color: colorTextDescription,
  },
});

// ============================== Inner ==============================
const genCardTypeInnerStyle: GenerateStyle<CardToken> = (token): CSSObject => {
  const { componentCls, fontSize, padding, cardPaddingBase, colorFillAlter, cardInnerHeadPadding } =
    token;

  return {
    [`${componentCls}-head`]: {
      padding: `0 ${cardPaddingBase}px`,
      background: colorFillAlter,

      '&-title': {
        padding: `${cardInnerHeadPadding}px 0`,
        fontSize,
      },
    },

    [`${componentCls}-body`]: {
      padding: `${padding}px ${cardPaddingBase}px`,
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
    colorBgContainer,
    borderRadiusLG,
    fontSize,
    lineWidth,
    lineType,
    motionDurationFast,
  } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),

      position: 'relative',
      background: colorBgContainer,
      borderRadius: borderRadiusLG,

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
        fontSize,
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
          borderRadius: `${borderRadiusLG}px ${borderRadiusLG}px 0 0`,
        },
      },

      [`${componentCls}-actions`]: genCardActionsStyle(token),

      [`${componentCls}-meta`]: genCardMetaStyle(token),
    },

    [`${componentCls}-bordered`]: {
      border: `${lineWidth}px ${lineType} ${colorBorderSecondary}`,

      [`${componentCls}-cover`]: {
        marginTop: -1,
        marginInlineStart: -1,
        marginInlineEnd: -1,
      },
    },

    [`${componentCls}-hoverable`]: {
      cursor: 'pointer',
      transition: `box-shadow ${motionDurationFast}, border-color ${motionDurationFast}`,

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
        marginBlockStart: -lineWidth,
        marginInlineStart: -lineWidth,
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
        fontSize,

        [`> ${componentCls}-head-wrapper`]: {
          [`> ${componentCls}-head-title`]: {
            padding: `${cardHeadPaddingSM}px 0`,
          },

          [`> ${componentCls}-extra`]: {
            padding: `${cardHeadPaddingSM}px 0`,
            fontSize,
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
  const {
    boxShadowCard,
    fontSizeLG,
    lineHeightLG,
    padding,
    fontSize,
    lineHeight,
    paddingXS,
    paddingLG,
    lineWidth,
    paddingSM,
  } = token;

  const cardToken = mergeToken<CardToken>(token, {
    cardShadow: boxShadowCard,
    cardHeaderHeight: fontSizeLG * lineHeightLG + padding * 2,
    cardHeaderHeightSM: fontSize * lineHeight + paddingXS * 2,
    cardHeadPadding: padding,
    cardPaddingBase: paddingLG,
    cardHeadTabsMarginBottom: -padding - lineWidth,
    cardInnerHeadPadding: paddingSM,
    cardActionsLiMargin: `${paddingSM}px 0`,
    cardActionsIconSize: fontSize,
    cardPaddingSM: 12, // Fixed padding.
  });

  return [
    // Style
    genCardStyle(cardToken),

    // Size
    genCardSizeStyle(cardToken),
  ];
});
