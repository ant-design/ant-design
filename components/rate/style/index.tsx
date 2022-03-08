// deps-lint-skip-all
import { CSSObject } from '@ant-design/cssinjs';
import {
  DerivativeToken,
  resetComponent,
  UseComponentStyleResult,
  useStyleRegister,
  useToken,
  withPrefix,
} from '../../_util/theme';

interface RateToken extends DerivativeToken {
  rateStarColor: string;
  rateStarSize: number;
  rateStarHoverScale: CSSObject['transform'];
}

interface GenRateArgs {
  prefixCls: string;
  iconPrefixCls: string;
  token: RateToken;
}

const genRateStarStyle = ({ prefixCls, iconPrefixCls, token }: GenRateArgs): CSSObject => ({
  [`.${prefixCls}-star`]: {
    position: 'relative',
    display: 'inline-block',
    color: 'inherit',
    cursor: 'pointer',

    '&:not(:last-child)': {
      marginInlineEnd: 8,
    },

    '> div': {
      transition: 'all 0.3s, outline 0s',

      '&:hover': {
        transform: token.rateStarHoverScale,
      },

      '&:focus': {
        outline: 0,
      },

      '&:focus-visible': {
        outline: `1px dashed ${token.borderColorSplit}`,
        transform: token.rateStarHoverScale,
      },
    },

    '&-first, &-second': {
      color: token.borderColorSplit,
      transition: 'all 0.3s',
      userSelect: 'none',

      [`.${iconPrefixCls}`]: {
        verticalAlign: 'middle',
      },
    },

    '&-first': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '50%',
      height: '100%',
      overflow: 'hidden',
      opacity: 0,
    },

    [`&-half .${prefixCls}-star-first, &-half .${prefixCls}-star-second`]: {
      opacity: 1,
    },

    [`&-half .${prefixCls}-star-first, &-full .${prefixCls}-star-second`]: {
      color: 'inherit',
    },
  },
});

const genRateRtlStyle = (prefixCls: string): CSSObject => ({
  [`&-rtl.${prefixCls}`]: {
    direction: 'rtl',

    [`.${prefixCls}-star-first`]: {
      right: 0,
      left: 'auto',
    },
  },
});

const genRateStyle = ({ prefixCls, iconPrefixCls, token }: GenRateArgs): CSSObject => ({
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
  [`&-disabled.${prefixCls} .${prefixCls}-star`]: {
    cursor: 'default',

    '&:hover': {
      transform: 'scale(1)',
    },
  },

  // star styles
  ...genRateStarStyle({ prefixCls, iconPrefixCls, token }),

  // text styles
  [`+ .${prefixCls}-text`]: {
    display: 'inline-block',
    marginInlineStart: 8,
    fontSize: token.fontSize,
  },

  // rtl styles
  ...genRateRtlStyle(prefixCls),
});

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
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      withPrefix(genRateStyle({ prefixCls, iconPrefixCls, token: rateToken }), prefixCls),
    ]),
    hashId,
  ];
}
