// deps-lint-skip-all
import type { CSSObject } from '@ant-design/cssinjs';
import { genComponentStyleHook, mergeToken, resetComponent } from '../../_util/theme';
import type { GenerateStyle, FullToken } from '../../_util/theme';

export interface ComponentToken {}

interface AnchorToken extends FullToken<'Anchor'> {
  holderOffsetBlock: number;
  anchorPaddingBlock: number;
  anchorPaddingBlockSecondary: number;
  anchorPaddingInline: number;
  anchorLineHeight: number;
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
            backgroundColor: token.colorBorderSecondary,
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
          backgroundColor: token.colorBgComponent,
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
          lineHeight: token.anchorLineHeight,

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
  const { controlHeight, controlLineWidth, fontSize, lineHeight, fontSizeLG, padding, paddingXXS } =
    token;
  const linkHeight = controlHeight - 2 * controlLineWidth;
  const anchorLineHeight = fontSizeLG / fontSize; // Anchor is special that use less height
  const paddingBlock = Math.round(linkHeight - fontSizeLG) / 2;

  // Still a magic number: 22 - 16
  const titleBlock = Math.round(fontSize * lineHeight - fontSizeLG);

  const paddingBlockSecondary = Math.round(linkHeight - paddingXXS - fontSizeLG) / 2;

  const anchorToken = mergeToken<AnchorToken>(token, {
    holderOffsetBlock: paddingXXS,
    anchorPaddingBlock: paddingBlock,
    anchorPaddingBlockSecondary: paddingBlockSecondary,
    anchorPaddingInline: padding,
    anchorLineHeight,
    anchorTitleBlock: titleBlock,
    anchorBallSize: fontSizeLG / 2,
  });
  return [genSharedAnchorStyle(anchorToken)];
});
