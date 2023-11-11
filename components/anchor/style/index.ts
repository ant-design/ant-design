import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import { resetComponent, textEllipsis } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genComponentStyleHook, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  /**
   * @desc 链接纵向内间距
   * @descEN Vertical padding of link
   */
  linkPaddingBlock: number | string;
  /**
   * @desc 链接横向内间距
   * @descEN Horizontal padding of link
   */
  linkPaddingInlineStart: number | string;
}

interface AnchorToken extends FullToken<'Anchor'> {
  holderOffsetBlock: number | string;
  anchorPaddingBlockSecondary: number | string;
  anchorBallSize: number | string;
  anchorTitleBlock: number | string;
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
      marginBlockStart: token.calc(holderOffsetBlock).mul(-1).equal(),
      paddingBlockStart: unit(holderOffsetBlock),

      // delete overflow: auto
      // overflow: 'auto',

      [componentCls]: {
        ...resetComponent(token),
        position: 'relative',
        paddingInlineStart: unit(lineWidthBold),

        [`${componentCls}-link`]: {
          paddingBlock: unit(token.linkPaddingBlock),
          paddingInline: `${unit(token.linkPaddingInlineStart)} 0`,

          '&-title': {
            ...textEllipsis,
            position: 'relative',
            display: 'block',
            marginBlockEnd: unit(token.anchorTitleBlock),
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
            paddingBlock: unit(token.anchorPaddingBlockSecondary),
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
            borderInlineStart: `${unit(lineWidthBold)} ${lineType} ${colorSplit}`,
            content: '" "',
          },

          [`${componentCls}-ink`]: {
            position: 'absolute',
            insetInlineStart: 0,
            display: 'none',
            transform: 'translateY(-50%)',
            transition: `top ${motionDurationSlow} ease-in-out`,
            width: unit(lineWidthBold),
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
          height: unit(lineWidthBold),
          backgroundColor: colorPrimary,
        },
      },
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'Anchor'> = (token) => ({
  linkPaddingBlock: unit(token.paddingXXS),
  linkPaddingInlineStart: unit(token.padding),
});

// ============================== Export ==============================
export default genComponentStyleHook('Anchor', (token) => {
  const { fontSize, fontSizeLG, paddingXXS } = token;
  const anchorToken = mergeToken<AnchorToken>(token, {
    holderOffsetBlock: unit(paddingXXS),
    anchorPaddingBlockSecondary: token.calc(paddingXXS).div(2).equal(),
    anchorTitleBlock: token.calc(fontSize).div(14).mul(3).equal(),
    anchorBallSize: token.calc(fontSizeLG).div(2).equal(),
  });
  return [genSharedAnchorStyle(anchorToken), genSharedAnchorHorizontalStyle(anchorToken)];
});
