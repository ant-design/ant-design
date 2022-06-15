import type { CSSInterpolation } from '@ant-design/cssinjs';
import { useStyleRegister } from '@ant-design/cssinjs';
import type React from 'react';
import { useContext } from 'react';
import type { AliasToken } from '..';
import { useToken } from '..';
import type { TokenWithCommonCls } from './genComponentStyleHook';
import { ConfigContext } from '../../../config-provider';

export type UseStyleResult = {
  wrapSSR: (node: React.ReactNode) => React.ReactElement;
  hashId: string;
};

export type UseToken<T extends AliasToken> = () => {
  token: T;
  hashId: string;
};

export default function genStyleHook<Token extends AliasToken>(useCustomToken: UseToken<Token>) {
  return (styleFn: (token: TokenWithCommonCls<Token>) => CSSInterpolation) =>
    (prefixCls: string): UseStyleResult => {
      const { token, hashId } = useCustomToken();
      const [theme] = useToken();
      const { getPrefixCls, iconPrefixCls } = useContext(ConfigContext);
      const rootPrefixCls = getPrefixCls();

      return {
        wrapSSR: useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => {
          const mergedToken: TokenWithCommonCls<Token> = {
            ...token,
            componentCls: `.${prefixCls}`,
            prefixCls,
            iconCls: `.${iconPrefixCls}`,
            antCls: `.${rootPrefixCls}`,
          };
          return styleFn(mergedToken);
        }),
        hashId,
      };
    };
}
