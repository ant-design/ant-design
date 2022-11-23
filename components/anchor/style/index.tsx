import type { CSSObject } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';
import { resetComponent, textEllipsis } from '../../style';

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
  const { componentCls, holderOffsetBlock, motionDurationSlow, lineWidthBold, colorPrimary } =
    token;

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
            value: 0,
          },
          display: 'none',
          transform: 'translateY(-50%)',
          transition: `top ${motionDurationSlow} ease-in-out`,
          width: lineWidthBold,
          backgroundColor: colorPrimary,

          [`&${componentCls}-ink-ball-visible`]: {
            display: 'inline-block',
          },
        },

        [`${componentCls}-link`]: {
          paddingBlock: token.anchorPaddingBlock,
          paddingInline: `${token.anchorPaddingInline}px 0`,

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

      [`${componentCls}-fixed ${componentCls}-ink ${componentCls}-ink-ball`]: {
        display: 'none',
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Anchor', (token) => {
  const { fontSize, fontSizeLG, padding, paddingXXS } = token;

  const anchorToken = mergeToken<AnchorToken>(token, {
    holderOffsetBlock: paddingXXS,
    anchorPaddingBlock: paddingXXS,
    anchorPaddingBlockSecondary: paddingXXS / 2,
    anchorPaddingInline: padding,
    anchorTitleBlock: (fontSize / 14) * 3,
    anchorBallSize: fontSizeLG / 2,
  });
  return [genSharedAnchorStyle(anchorToken)];
});
