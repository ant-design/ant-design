// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
import {
  DerivativeToken,
  resetComponent,
  UseComponentStyleResult,
  useStyleRegister,
  useToken,
  GenerateStyle,
} from '../../_util/theme';

interface RateToken extends DerivativeToken {
  rateStarColor: string;
  rateStarSize: number;
  rateStarHoverScale: CSSObject['transform'];
  rateCls: string;
  iconPrefixCls: string;
}

const genRateStarStyle: GenerateStyle<RateToken, CSSObject> = token => {
  const { rateCls } = token;

  return {
    [`${rateCls}-star`]: {
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
          outline: `1px dashed ${token.colorSplit}`,
          transform: token.rateStarHoverScale,
        },
      },

      '&-first, &-second': {
        color: token.colorSplit,
        transition: `all ${token.motionDurationSlow}`,
        userSelect: 'none',

        [token.iconPrefixCls]: {
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

      [`&-half ${rateCls}-star-first, &-half ${rateCls}-star-second`]: {
        opacity: 1,
      },

      [`&-half ${rateCls}-star-first, &-full ${rateCls}-star-second`]: {
        color: 'inherit',
      },
    },
  };
};

const genRateRtlStyle = (token: RateToken): CSSObject => ({
  [`&-rtl${token.rateCls}`]: {
    direction: 'rtl',
  },
});

const genRateStyle: GenerateStyle<RateToken> = token => {
  const { rateCls } = token;

  return {
    [rateCls]: {
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
      [`&-disabled${rateCls} ${rateCls}-star`]: {
        cursor: 'default',

        '&:hover': {
          transform: 'scale(1)',
        },
      },

      // star styles
      ...genRateStarStyle(token),

      // text styles
      [`+ ${rateCls}-text`]: {
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
export default function useStyle(
  prefixCls: string,
  iconPrefixCls: string,
): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();

  const rateToken: RateToken = {
    ...token,
    // FIXME: missing token
    rateStarColor: '#fadb14', // @yellow-6
    rateStarSize: 20, // fixed-value
    rateStarHoverScale: 'scale(1.1)', // fixed-value
    rateCls: `.${prefixCls}`,
    iconPrefixCls: `.${iconPrefixCls}`,
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [genRateStyle(rateToken)]),
    hashId,
  ];
}
