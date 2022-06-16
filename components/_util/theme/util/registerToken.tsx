import type { CSSInterpolation } from '@ant-design/cssinjs';
import { useStyleRegister } from '@ant-design/cssinjs';
import type React from 'react';
import { useContext } from 'react';
import type { AliasToken } from '..';
import { emptyTheme, useToken } from '..';
import { ConfigContext } from '../../../config-provider';
import type { TokenWithCommonCls } from './genComponentStyleHook';

export type UseStyleResult = {
  wrapSSR: (node: React.ReactNode) => React.ReactElement;
  hashId: string;
};

export type UseToken<T extends AliasToken = AliasToken> = () => {
  token: T;
  hashId: string;
};

function useStyle<T extends AliasToken = AliasToken>(componentName: string, styleFn: (token: T) => CSSInterpolation, token: T, hashId: string) {
  return {
    wrapSSR: useStyleRegister({ theme: emptyTheme, token, hashId, path: [componentName] }, () => styleFn(token)),
    hashId,
  };
}

/**
 * Register custom tokens into `useStyle` hook.
 * @param useCustomToken - Custom hook that return the whole tokens and hashId.
 */
export default function registerToken<Token extends AliasToken = AliasToken>(
  useCustomToken: UseToken<Token>,
) {
  return (styleFn: (token: TokenWithCommonCls<Token>) => CSSInterpolation) =>
    (prefixCls: string): UseStyleResult => {
      const { token, hashId } = useCustomToken();
      const { getPrefixCls, iconPrefixCls } = useContext(ConfigContext);
      const rootPrefixCls = getPrefixCls();

      return {
        wrapSSR: useStyleRegister({ theme: emptyTheme, token, hashId, path: [prefixCls] }, () => {
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

const useAntdToken: UseToken = () => {
  const [, token, hashId] = useToken();
  return {
    token,
    hashId,
  };
};

/**
 * Generate `useStyle` hook with tokens of ant-design.
 */
export const genStyleHook = registerToken(useAntdToken);
