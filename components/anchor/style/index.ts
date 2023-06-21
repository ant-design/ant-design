import type { CSSObject } from '@ant-design/cssinjs';
import { resetComponent, textEllipsis } from '../../style';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  linkPaddingBlock: number;
  linkPaddingInlineStart: number;
}

interface AnchorToken extends FullToken<'Anchor'> {
  holderOffsetBlock: number;
  anchorPaddingBlockSecondary: number;
  anchorBallSize: number;
  anchorTitleBlock: number;
}

// ============================== Shared ==============================
const genSharedAnchorStyle: GenerateStyle<AnchorToken> = (token): CSSObject => {
  const {
    componentCls,
    holderOffsetBlock,
    motionDurationSlow,
    lineWidthBold,
    colorPrimary,
    lineType,
    colorSplit,
  } = token;

  return {
    [`${componentCls}-wrapper`]: {
      marginBlockStart: -holderOffsetBlock,
      paddingBlockStart: holderOffsetBlock,

      // delete overflow: auto
      // overflow: 'auto',

      [componentCls]: {
        ...resetComponent(token),
        position: 'relative',
        paddingInlineStart: lineWidthBold,

        [`${componentCls}-link`]: {
          paddingBlock: token.linkPaddingBlock,
          paddingInline: `${token.linkPaddingInlineStart}px 0`,

          '&-title': {
            ...textEllipsis,
            position: 'relative',
            display: 'block',
            marginBlockEnd: token.anchorTitleBlock,
            color: token.colorText,
            transition: `all ${token.motionDurationSlow}`,

            '&:only-child': {
              marginBlockEnd: 0,
            },
          },

          [`&-active > ${componentCls}-link-title`]: {
            color: token.colorPrimary,
          },

          // link link
          [`${componentCls}-link`]: {
            paddingBlock: token.anchorPaddingBlockSecondary,
          },
        },
      },

      [`&:not(${componentCls}-wrapper-horizontal)`]: {
        [componentCls]: {
          '&::before': {
            position: 'absolute',
            insetInlineStart: 0,
            top: 0,
            height: '100%',
            borderInlineStart: `${lineWidthBold}px ${lineType} ${colorSplit}`,
            content: '" "',
          },

          [`${componentCls}-ink`]: {
            position: 'absolute',
            insetInlineStart: 0,
            display: 'none',
            transform: 'translateY(-50%)',
            transition: `top ${motionDurationSlow} ease-in-out`,
            width: lineWidthBold,
            backgroundColor: colorPrimary,

            [`&${componentCls}-ink-visible`]: {
              display: 'inline-block',
            },
          },
        },
      },

      [`${componentCls}-fixed ${componentCls}-ink ${componentCls}-ink`]: {
        display: 'none',
      },
    },
  };
};

const genSharedAnchorHorizontalStyle: GenerateStyle<AnchorToken> = (token): CSSObject => {
  const { componentCls, motionDurationSlow, lineWidthBold, colorPrimary } = token;

  return {
    [`${componentCls}-wrapper-horizontal`]: {
      position: 'relative',

      '&::before': {
        position: 'absolute',
        left: {
          _skip_check_: true,
          value: 0,
        },
        right: {
          _skip_check_: true,
          value: 0,
        },
        bottom: 0,
        borderBottom: `1px ${token.lineType} ${token.colorSplit}`,
        content: '" "',
      },

      [componentCls]: {
        overflowX: 'scroll',
        position: 'relative',
        display: 'flex',
        scrollbarWidth: 'none' /* Firefox */,

        '&::-webkit-scrollbar': {
          display: 'none' /* Safari and Chrome */,
        },

        [`${componentCls}-link:first-of-type`]: {
          paddingInline: 0,
        },

        [`${componentCls}-ink`]: {
          position: 'absolute',
          bottom: 0,
          transition: `left ${motionDurationSlow} ease-in-out, width ${motionDurationSlow} ease-in-out`,
          height: lineWidthBold,
          backgroundColor: colorPrimary,
        },
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook(
  'Anchor',
  (token) => {
    const { fontSize, fontSizeLG, paddingXXS } = token;

    const anchorToken = mergeToken<AnchorToken>(token, {
      holderOffsetBlock: paddingXXS,
      anchorPaddingBlockSecondary: paddingXXS / 2,
      anchorTitleBlock: (fontSize / 14) * 3,
      anchorBallSize: fontSizeLG / 2,
    });
    return [genSharedAnchorStyle(anchorToken), genSharedAnchorHorizontalStyle(anchorToken)];
  },
  (token) => ({
    linkPaddingBlock: token.paddingXXS,
    linkPaddingInlineStart: token.padding,
  }),
);
