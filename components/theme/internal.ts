import type { CSSInterpolation, Theme } from '@ant-design/cssinjs';
import { createTheme, useCacheToken, useStyleRegister } from '@ant-design/cssinjs';
import React from 'react';
import version from '../version';
import type {
  AliasToken,
  GlobalToken,
  MapToken,
  OverrideToken,
  PresetColorType,
  PresetColorKey,
  SeedToken,
} from './interface';
import { PresetColors } from './interface';
import defaultDerivative from './themes/default';
import defaultSeedToken from './themes/seed';
import formatToken from './util/alias';
import type { FullToken } from './util/genComponentStyleHook';
import genComponentStyleHook from './util/genComponentStyleHook';
import statisticToken, { merge as mergeToken } from './util/statistic';
import genPresetColor from './util/genPresetColor';

const defaultTheme = createTheme(defaultDerivative);

export {
  // colors
  PresetColors,
  statisticToken,
  mergeToken,
  // hooks
  useStyleRegister,
  genComponentStyleHook,
  genPresetColor,
};
export type {
  SeedToken,
  AliasToken,
  PresetColorType,
  PresetColorKey,
  // FIXME: Remove this type
  AliasToken as DerivativeToken,
  FullToken,
};

// ================================ Context =================================
// To ensure snapshot stable. We disable hashed in test env.
export const defaultConfig = {
  token: defaultSeedToken,
  hashed: true,
};

export const DesignTokenContext = React.createContext<{
  token: Partial<AliasToken>;
  theme?: Theme<SeedToken, MapToken>;
  components?: OverrideToken;
  hashed?: string | boolean;
}>(defaultConfig);

// ================================== Hook ==================================
export function useToken(): [Theme<SeedToken, MapToken>, GlobalToken, string] {
  const {
    token: rootDesignToken,
    hashed,
    theme,
    components,
  } = React.useContext(DesignTokenContext);

  const salt = `${version}-${hashed || ''}`;

  const mergedTheme = theme || defaultTheme;

  const [token, hashId] = useCacheToken<GlobalToken, SeedToken>(
    mergedTheme,
    [defaultSeedToken, rootDesignToken],
    {
      salt,
      override: { override: rootDesignToken, ...components },
      formatToken,
    },
  );

  return [mergedTheme, token, hashed ? hashId : ''];
}

export type UseComponentStyleResult = [(node: React.ReactNode) => React.ReactElement, string];

export type GenerateStyle<
  ComponentToken extends object = AliasToken,
  ReturnType = CSSInterpolation,
> = (token: ComponentToken) => ReturnType;
