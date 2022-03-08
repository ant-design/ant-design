// deps-lint-skip-all
import type { CSSObject } from '@ant-design/cssinjs';
import { generate } from '@ant-design/colors';
import { useStyleRegister, useToken } from '../../_util/theme';
import type { DerivativeToken } from '../../_util/theme';

const genTypographyStyle = ({
  prefixCls,
  token,
}: {
  prefixCls: string;
  token: DerivativeToken;
}): CSSObject => {
  const errorColors = generate(token.errorColor);
  return {
    [`.${prefixCls}`]: {
      color: token.textColor,
      overflowWrap: 'break-word',
      '&&-secondary': {
        color: token.textColorSecondary,
      },

      '&&-success': {
        color: token.successColor,
      },

      '&&-warning': {
        color: token.warningColor,
      },

      '&&-danger': {
        color: token.errorColor,
        'a&:active, a&:focus, a&:hover': {
          color: errorColors[4],
        },
      },

      '&&-disabled': {
        color: token.disabledColor,
        cursor: 'not-allowed',
        userSelect: 'none',
      },

      'div, p': {
        marginBottom: '1em',
      },

      'h1&, div&-h1, div&-h1 > textarea, h1': {},
    },
  };
};

// ============================== Export ==============================
export default function useStyle(prefixCls: string) {
  const [theme, token, hashId] = useToken();

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genTypographyStyle({ prefixCls, token }),
    ]),
    hashId,
  ];
}
