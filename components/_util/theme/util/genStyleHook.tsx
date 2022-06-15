import type { CSSInterpolation } from '@ant-design/cssinjs';
import { useStyleRegister } from '@ant-design/cssinjs';
import type React from 'react';
import type { AliasToken } from '..';
import { useToken } from '..';

export type UseStyleResult = {
  wrapSSR: (node: React.ReactNode) => React.ReactElement;
  hashId: string;
};

export type UseToken<T extends AliasToken> = () => {
  token: T;
  hashId: string;
};

export default function genStyleHook<Token extends AliasToken>(useCustomToken: UseToken<Token>) {
  return (styleFn: (token: Token) => CSSInterpolation) =>
    (prefixCls: string): UseStyleResult => {
      const { token, hashId } = useCustomToken();
      const [theme] = useToken();

      return {
        wrapSSR: useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () =>
          styleFn(token),
        ),
        hashId,
      };
    };
}
