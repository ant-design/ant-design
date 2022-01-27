import { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import { DerivativeToken, useStyleRegister, useToken } from '../../_util/theme';

const genSizeButtonStyle = (token: DerivativeToken) => ({
  //   @padding-vertical: max(
  //     (round(((@height - @font-size * @line-height-base) / 2) * 10) / 10) - @border-width-base,
  //     0
  //   );
  //   height: @height;
  //   padding: @padding-vertical @padding-horizontal;
  //   font-size: @font-size;
  //   border-radius: @border-radius;
});

const genSharedButtonStyle = (token: DerivativeToken): CSSObject => ({
  position: 'relative',
  display: 'inline-block',
  fontWeight: 400,
  whiteSpace: 'nowrap',
  textAlign: 'center',
  backgroundImage: 'none',
  border: `${token.borderWidth}px ${token.borderStyle} transparent`,
  boxShadow: '0 2px 0 rgba(0, 0, 0, 0.015)',
  cursor: 'pointer',
  transition: token.easeInOut,
  userSelect: 'none',
  touchAction: 'manipulation',

  '> span': {
    display: 'inline-block',
  },
});

const genSolidButtonStyle = (token: DerivativeToken): CSSObject => {
  const paddingVertical =
    (token.height - token.fontSize * token.lineHeight) / 2 - token.borderWidth;
  const paddingHorizontal = token.paddingMD - token.borderWidth;

  return {
    ...genSharedButtonStyle(token),

    lineHeight: token.lineHeight,
    borderRadius: token.borderRadius,
    backgroundColor: token.primaryColor,

    color: '#FFF',
    fontSize: token.fontSize,
    height: token.height,

    padding: `${paddingVertical}px ${paddingHorizontal}px`,
  };
};

// Default
const genDefaultButtonStyle = (prefixCls: string, token: DerivativeToken): CSSInterpolation => ({
  [`.${prefixCls}`]: {
    ...genSolidButtonStyle(token),

    backgroundColor: token.componentBackground,
    color: token.textColor,
    borderColor: token.borderColor,
  },
});

// Primary
const genPrimaryButtonStyle = (prefixCls: string, token: DerivativeToken): CSSInterpolation => ({
  [`.${prefixCls}-primary`]: {
    ...genSolidButtonStyle(token),

    borderColor: token.primaryColor,
  },
});

// Dashed
const genDashedButtonStyle = (prefixCls: string): CSSInterpolation => ({
  [`.${prefixCls}-dashed`]: {
    borderStyle: 'dashed',
  },
});

// Text
const genTextButtonStyle = (prefixCls: string): CSSInterpolation => ({
  [`.${prefixCls}-text`]: {
    borderColor: 'transparent',
    boxShadow: 'none',
  },
});

// Link
const genLinkButtonStyle = (prefixCls: string, token: DerivativeToken): CSSInterpolation => ({
  [`.${prefixCls}-link`]: {
    borderColor: 'transparent',
    boxShadow: 'none',

    color: token.linkColor,
  },
});

export default function useStyle(prefixCls: string) {
  const [theme, token, hashId] = useToken();

  useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
    genDefaultButtonStyle(prefixCls, token),
    genPrimaryButtonStyle(prefixCls, token),
    genDashedButtonStyle(prefixCls),
    genTextButtonStyle(prefixCls),
    genLinkButtonStyle(prefixCls, token),
  ]);
}
