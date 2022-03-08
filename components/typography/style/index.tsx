// deps-lint-skip-all
import { CSSInterpolation, CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import { DerivativeToken, useStyleRegister, useToken, withPrefix } from '../../_util/theme';

const genTypographyStyle = ({
  prefixCls,
  token,
}: {
  prefixCls: string;
  token: DerivativeToken;
}): CSSObject => ({
  color: token.textColor,
  overflowWrap: 'break-word',

  [`&.${prefixCls}-secondary`]: {
    color: token.textColorSecondary,
  },

  [`&.${prefixCls}-success`]: {
    color: token.successColor,
  },

  [`&.${prefixCls}-warning`]: {
    color: token.warningColor,
  },
});

// ============================== Export ==============================
export default function useStyle(prefixCls: string) {
  const [theme, token, hashId] = useToken();

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      withPrefix(genTypographyStyle({ prefixCls, token }), prefixCls),
    ]),
    hashId,
  ];
}
