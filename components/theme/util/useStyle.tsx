/* eslint-disable no-redeclare */
import type { CSSInterpolation } from '@ant-design/cssinjs';
import { useStyleRegister } from '@ant-design/cssinjs';
import type React from 'react';
import type { AliasToken } from '..';
import { emptyTheme, useToken } from '..';

export type UseStyleResult = {
  wrapSSR: (node: React.ReactNode) => React.ReactElement;
  hashId: string;
};

export type UseToken<T extends AliasToken = AliasToken> = () => {
  token: T;
  hashId: string;
};

export type UseCustomStyle<T extends AliasToken> = (
  componentName: string,
  styleFn: (token: T) => CSSInterpolation,
) => UseStyleResult;

export function useStyle(
  componentName: string,
  styleFn: (token: AliasToken) => CSSInterpolation,
): UseStyleResult {
  const [, token, hashId] = useToken();
  return {
    wrapSSR: useStyleRegister({ theme: emptyTheme, token, hashId, path: [componentName] }, () =>
      styleFn(token),
    ),
    hashId,
  };
}

export function useCustomStyle<T extends AliasToken = AliasToken>(
  componentName: string,
  styleFn: (token: T) => CSSInterpolation,
  token: T,
  hashId: string,
): UseStyleResult {
  return {
    wrapSSR: useStyleRegister({ theme: emptyTheme, token, hashId, path: [componentName] }, () =>
      styleFn(token),
    ),
    hashId,
  };
}
