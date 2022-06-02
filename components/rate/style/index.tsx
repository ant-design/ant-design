// deps-lint-skip-all
import type { CSSObject } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../_util/theme';
import { genComponentStyleHook, mergeToken, resetComponent } from '../../_util/theme';

interface RateToken extends FullToken<'Rate'> {
  rateStarColor: string;
  rateStarSize: number;
  rateStarHoverScale: CSSObject['transform'];
}

const genRateStarStyle: GenerateStyle<RateToken, CSSObject> = token => {
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
        transition: `all ${token.motionDurationSlow}, outline 0s`,

        '&:hover': {
          transform: token.rateStarHoverScale,
        },

        '&:focus': {
          outline: 0,
        },

        '&:focus-visible': {
          outline: `${token.lineWidth} dashed ${token.colorSplit}`,
          transform: token.rateStarHoverScale,
        },
      },

      '&-first, &-second': {
        color: token.colorSplit,
        transition: `all ${token.motionDurationSlow}`,
        userSelect: 'none',

        [token.iconCls]: {
          verticalAlign: 'middle',
        },
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

const genRateStyle: GenerateStyle<RateToken> = token => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),

      display: 'inline-block',
      margin: 0,
      padding: 0,
      color: token.rateStarColor,
      fontSize: token.rateStarSize,
      lineHeight: 'unset',
      listStyle: 'none',
      outline: 'none',

      // disable styles
      [`&-disabled${componentCls} ${componentCls}-star`]: {
        cursor: 'default',

        '&:hover': {
          transform: 'scale(1)',
        },
      },

      // star styles
      ...genRateStarStyle(token),

      // text styles
      [`+ ${componentCls}-text`]: {
        display: 'inline-block',
        marginInlineStart: token.marginXS,
        fontSize: token.fontSize,
      },

      // rtl styles
      ...genRateRtlStyle(token),
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Rate', token => {
  const rateToken = mergeToken<RateToken>(token, {
    rateStarColor: token.yellow,
    rateStarSize: token.controlHeightLG * 0.5,
    rateStarHoverScale: 'scale(1.1)',
  });
  return [genRateStyle(rateToken)];
});
