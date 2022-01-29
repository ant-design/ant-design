import { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import { DerivativeToken, useStyleRegister, useToken, withPrefix } from '../../_util/theme';

// ============================== Shared ==============================
const genSharedButtonStyle = (iconPrefixCls: string, token: DerivativeToken): CSSObject => ({
  position: 'relative',
  display: 'inline-block',
  fontWeight: 400,
  whiteSpace: 'nowrap',
  textAlign: 'center',
  backgroundImage: 'none',
  backgroundColor: 'transparent',
  border: `${token.borderWidth}px ${token.borderStyle} transparent`,
  cursor: 'pointer',
  transition: token.easeInOut,
  userSelect: 'none',
  touchAction: 'manipulation',
  lineHeight: token.lineHeight,
  color: token.textColor,

  '> span': {
    display: 'inline-block',
  },

  // Leave a space between icon and text.
  [`> .${iconPrefixCls} + span, > span + .${iconPrefixCls}`]: {
    marginInlineStart: token.marginXS,
  },
});

// ============================== Shape ===============================
const genCircleButtonStyle = (prefixCls: string, token: DerivativeToken): CSSObject => ({
  minWidth: token.height,
  paddingLeft: 0,
  paddingRight: 0,
  borderRadius: '50%',
});

const genRoundButtonStyle = (prefixCls: string, token: DerivativeToken): CSSObject => ({
  borderRadius: token.height,
  paddingLeft: token.height / 2,
  paddingRight: token.height / 2,
  width: 'auto',
});

// =============================== Type ===============================
const genSolidButtonStyle = (token: DerivativeToken): CSSObject => ({
  borderRadius: token.borderRadius,
});

const genDefaultButtonStyle = (token: DerivativeToken): CSSObject => ({
  ...genSolidButtonStyle(token),

  backgroundColor: token.componentBackground,
  borderColor: token.borderColor,

  boxShadow: '0 2px 0 rgba(0, 0, 0, 0.015)',
});

const genPrimaryButtonStyle = (token: DerivativeToken): CSSObject => ({
  ...genSolidButtonStyle(token),

  color: '#FFF',
  backgroundColor: token.primaryColor,

  boxShadow: '0 2px 0 rgba(0, 0, 0, 0.045)',
});

const genDashedButtonStyle = (token: DerivativeToken): CSSObject => ({
  ...genDefaultButtonStyle(token),

  borderStyle: 'dashed',
});

const genLinkButtonStyle = (token: DerivativeToken): CSSObject => ({
  color: token.linkColor,
});

const genTypeButtonStyle = (prefixCls: string, token: DerivativeToken): CSSInterpolation => [
  withPrefix(genDefaultButtonStyle(token), `${prefixCls}-default`, []),
  withPrefix(genPrimaryButtonStyle(token), `${prefixCls}-primary`, []),
  withPrefix(genDashedButtonStyle(token), `${prefixCls}-dashed`, []),
  withPrefix(genLinkButtonStyle(token), `${prefixCls}-link`, []),
];

// =============================== Size ===============================
const genSizeButtonStyle = (
  prefixCls: string,
  iconPrefixCls: string,
  sizePrefixCls: string,
  token: DerivativeToken,
): CSSInterpolation => {
  const paddingVertical = Math.max(
    0,
    (token.height - token.fontSize * token.lineHeight) / 2 - token.borderWidth,
  );
  const paddingHorizontal = token.padding - token.borderWidth;

  return [
    // Size
    withPrefix(
      {
        fontSize: token.fontSize,
        height: token.height,
        padding: `${paddingVertical}px ${paddingHorizontal}px`,

        [`&.${prefixCls}-icon-only`]: {
          width: token.height,
          paddingLeft: 0,
          paddingRight: 0,

          '> span': {
            transform: 'scale(1.143)', // 14px -> 16px
          },
        },
      },
      prefixCls,
      [sizePrefixCls],
    ),

    // Shape - patch prefixCls again to override solid border radius style
    withPrefix(genCircleButtonStyle(prefixCls, token), `${prefixCls}-circle`, [
      prefixCls,
      sizePrefixCls,
    ]),
    withPrefix(genRoundButtonStyle(prefixCls, token), `${prefixCls}-round`, [
      prefixCls,
      sizePrefixCls,
    ]),
  ];
};

const genSizeBaseButtonStyle = (
  prefixCls: string,
  iconPrefixCls: string,
  token: DerivativeToken,
): CSSInterpolation => genSizeButtonStyle(prefixCls, iconPrefixCls, '', token);

const genSizeSmallButtonStyle = (
  prefixCls: string,
  iconPrefixCls: string,
  token: DerivativeToken,
): CSSInterpolation => {
  const largeToken: DerivativeToken = {
    ...token,
    height: token.heightSM,
    padding: token.paddingXS,
  };

  return genSizeButtonStyle(prefixCls, iconPrefixCls, `${prefixCls}-sm`, largeToken);
};

const genSizeLargeButtonStyle = (
  prefixCls: string,
  iconPrefixCls: string,
  token: DerivativeToken,
): CSSInterpolation => {
  const largeToken: DerivativeToken = {
    ...token,
    height: token.heightLG,
    fontSize: token.fontSizeLG,
  };

  return genSizeButtonStyle(prefixCls, iconPrefixCls, `${prefixCls}-lg`, largeToken);
};

// ============================== Export ==============================
export default function useStyle(prefixCls: string) {
  const [theme, token, iconPrefixCls, hashId] = useToken();

  useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
    // Shared
    withPrefix(genSharedButtonStyle(iconPrefixCls, token), prefixCls),

    // Size
    genSizeSmallButtonStyle(prefixCls, iconPrefixCls, token),
    genSizeBaseButtonStyle(prefixCls, iconPrefixCls, token),
    genSizeLargeButtonStyle(prefixCls, iconPrefixCls, token),

    // Group (type, ghost, danger, disabled, loading)
    genTypeButtonStyle(prefixCls, token),
  ]);
}
