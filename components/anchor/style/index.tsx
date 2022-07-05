import type { CSSObject } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../theme';
import { genComponentStyleHook, mergeToken, resetComponent } from '../../theme';

export interface ComponentToken {}

interface AnchorToken extends FullToken<'Anchor'> {
  holderOffsetBlock: number;
  anchorPaddingBlock: number;
  anchorPaddingBlockSecondary: number;
  anchorPaddingInline: number;
  anchorBallSize: number;
  anchorTitleBlock: number;
}

// ============================== Shared ==============================
const genSharedAnchorStyle: GenerateStyle<AnchorToken> = (token): CSSObject => {
  const { componentCls, holderOffsetBlock, anchorBallSize, lineWidthBold } = token;

  return {
    [`${componentCls}-wrapper`]: {
      marginBlockStart: -holderOffsetBlock,
      paddingBlockStart: holderOffsetBlock,

      // delete overflow: auto
      // overflow: 'auto',

      backgroundColor: 'transparent',

      [componentCls]: {
        ...resetComponent(token),
        position: 'relative',
        paddingInlineStart: lineWidthBold,

        [`${componentCls}-ink`]: {
          position: 'absolute',
          insetBlockStart: 0,
          insetInlineStart: 0,
          height: '100%',

          '&::before': {
            position: 'relative',
            display: 'block',
            width: lineWidthBold,
            height: '100%',
            margin: '0 auto',
            backgroundColor: token.colorSplit,
            content: '" "',
          },
        },

        [`${componentCls}-ink-ball`]: {
          position: 'absolute',
          left: {
            _skip_check_: true,
            value: '50%',
          },
          display: 'none',
          width: anchorBallSize,
          height: anchorBallSize,
          backgroundColor: token.colorBgContainer,
          border: `${lineWidthBold}px solid ${token.colorPrimary}`,
          borderRadius: anchorBallSize,
          transform: 'translateX(-50%)',
          transition: `top ${token.motionDurationSlow} ease-in-out`,

          '&.visible': {
            display: 'inline-block',
          },
        },

        [`${componentCls}-link`]: {
          paddingBlock: token.anchorPaddingBlock,
          paddingInline: `${token.anchorPaddingInline}px 0`,

          '&-title': {
            position: 'relative',
            display: 'block',
            marginBlockEnd: token.anchorTitleBlock,
            overflow: 'hidden',
            color: token.colorText,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
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

      [`${componentCls}-fixed ${componentCls}-ink ${componentCls}-ink-ball`]: {
        display: 'none',
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Anchor', token => {
  const { fontSize, lineHeight, fontSizeLG, padding, paddingXXS } = token;

  const fontHeight = Math.round(fontSize * lineHeight);

  // Still a magic number: 36 & 26
  const titleHeight = (fontSize / 14) * 36;
  const subTitleHeight = (fontSize / 14) * 26;

  const anchorToken = mergeToken<AnchorToken>(token, {
    holderOffsetBlock: paddingXXS,
    anchorPaddingBlock: (titleHeight - fontHeight) / 2,
    anchorPaddingBlockSecondary: (subTitleHeight - fontHeight) / 2,
    anchorPaddingInline: padding,
    anchorTitleBlock: (fontSize / 14) * 3,
    anchorBallSize: fontSizeLG / 2,
  });
  return [genSharedAnchorStyle(anchorToken)];
});
