import { useContext } from 'react';
import { genStyleUtils } from '@ant-design/cssinjs-utils';
import type { GetCompUnitless } from '@ant-design/cssinjs-utils/es/util/genStyleUtils';

import { ConfigContext, defaultIconPrefixCls } from '../../config-provider/context';
import { genCommonStyle, genIconStyle, genLinkStyle } from '../../style';
import type { AliasToken, ComponentTokenMap, SeedToken } from '../interface';
import useLocalToken, { unitless } from '../useToken';

export const { genStyleHooks, genComponentStyleHook, genSubStyleComponent } = genStyleUtils<
  ComponentTokenMap,
  AliasToken,
  SeedToken
>({
  usePrefix: () => {
    const { getPrefixCls, iconPrefixCls } = useContext(ConfigContext);

    const rootPrefixCls = getPrefixCls();

    return {
      rootPrefixCls,
      iconPrefixCls,
    };
  },
  useToken: () => {
    const [theme, realToken, hashId, token, cssVar, zeroRuntime] = useLocalToken();
    return { theme, realToken, hashId, token, cssVar, zeroRuntime };
  },
  useCSP: () => {
    const { csp } = useContext(ConfigContext);
    return csp ?? {};
  },
  getResetStyles: (token, config) => {
    const linkStyle = genLinkStyle(token);
    return [
      linkStyle,
      { '&': linkStyle },
      genIconStyle(config?.prefix.iconPrefixCls ?? defaultIconPrefixCls),
    ];
  },
  getCommonStyle: genCommonStyle,
  getCompUnitless: (() => unitless) as GetCompUnitless<ComponentTokenMap, AliasToken>,
});

type CssVarName = (name: string) => `--${string}`;
type CssVarRef = (name: string, fallback?: string | number) => `var(--${string})`;

export const genCssVar = (
  antCls: string,
  component: string,
): readonly [varName: CssVarName, varRef: CssVarRef] => {
  const cssPrefix = `--${antCls.replace(/\./g, '')}-${component}-` satisfies `--${string}`;
  const varName: CssVarName = (name) => {
    return `${cssPrefix}${name}`;
  };
  const varRef: CssVarRef = (name, fallback) => {
    return fallback ? `var(${cssPrefix}${name}, ${fallback})` : `var(${cssPrefix}${name})`;
  };
  return [varName, varRef] as const;
};
