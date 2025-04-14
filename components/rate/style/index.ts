import type { CSSObject } from '@ant-design/cssinjs';
import { unit } from '@ant-design/cssinjs';

import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

export interface ComponentToken {
  /**
   * @desc 星星颜色
   * @descEN Star color
   */
  starColor: string;
  /**
   * @desc 星星大小
   * @descEN Star size
   */
  starSize: number;
  /**
   * @desc 星星悬浮时的缩放
   * @descEN Scale of star when hover
   */
  starHoverScale: CSSObject['transform'];
  /**
   * @desc 星星背景色
   * @descEN Star background color
   */
  starBg: string;
}

interface RateToken extends FullToken<'Rate'> {}

const genRateStarStyle: GenerateStyle<RateToken, CSSObject> = (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}-star`]: {
      position: 'relative',
      display: 'inline-block',
      color: 'inherit',
      cursor: 'pointer',

      '&:not(:last-child)': {
        marginInlineEnd: token.marginXS,
      },

      '> div': {
        transition: `all ${token.motionDurationMid}, outline 0s`,

        '&:hover': {
          transform: token.starHoverScale,
        },

        '&:focus': {
          outline: 0,
        },

        '&:focus-visible': {
          outline: `${unit(token.lineWidth)} dashed ${token.starColor}`,
          transform: token.starHoverScale,
        },
      },

      '&-first, &-second': {
        color: token.starBg,
        transition: `all ${token.motionDurationMid}`,
        userSelect: 'none',
      },

      '&-first': {
        position: 'absolute',
        top: 0,
        insetInlineStart: 0,
        width: '50%',
        height: '100%',
        overflow: 'hidden',
        opacity: 0,
      },

      [`&-half ${componentCls}-star-first, &-half ${componentCls}-star-second`]: {
        opacity: 1,
      },

      [`&-half ${componentCls}-star-first, &-full ${componentCls}-star-second`]: {
        color: 'inherit',
      },
    },
  };
};

const genRateRtlStyle = (token: RateToken): CSSObject => ({
  [`&-rtl${token.componentCls}`]: {
    direction: 'rtl',
  },
});

const genRateStyle: GenerateStyle<RateToken> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),

      display: 'inline-block',
      margin: 0,
      padding: 0,
      color: token.starColor,
      fontSize: token.starSize,
      lineHeight: 1,
      listStyle: 'none',
      outline: 'none',

      // disable styles
      [`&-disabled${componentCls} ${componentCls}-star`]: {
        cursor: 'default',

        '> div:hover': {
          transform: 'scale(1)',
        },
      },

      // star styles
      ...genRateStarStyle(token),

      // rtl styles
      ...genRateRtlStyle(token),
    },
  };
};

// ============================== Export ==============================
export const prepareComponentToken: GetDefaultToken<'Rate'> = (token) => ({
  starColor: token.yellow6,
  starSize: token.controlHeightLG * 0.5,
  starHoverScale: 'scale(1.1)',
  starBg: token.colorFillContent,
});

export default genStyleHooks(
  'Rate',
  (token) => {
    const rateToken = mergeToken<RateToken>(token, {});
    return [genRateStyle(rateToken)];
  },
  prepareComponentToken,
);
