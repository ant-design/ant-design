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
  SeedToken,
} from './interface';
import { PresetColors } from './interface';
import defaultDerivative from './themes/default';
import defaultSeedToken from './themes/seed';
import formatToken from './util/alias';
import type { FullToken } from './util/genComponentStyleHook';
import genComponentStyleHook from './util/genComponentStyleHook';
import statisticToken, { merge as mergeToken, statistic } from './util/statistic';

const defaultTheme = createTheme(defaultDerivative);

export {
  // colors
  PresetColors,
  // Statistic
  statistic,
  statisticToken,
  mergeToken,
  // hooks
  useStyleRegister,
  genComponentStyleHook,
};
export type {
  SeedToken,
  AliasToken,
  PresetColorType,
  // FIXME: Remove this type
  AliasToken as DerivativeToken,
  FullToken,
};

// ================================ Context =================================
// To ensure snapshot stable. We disable hashed in test env.
export const defaultConfig: DesignTokenContextProps = {
  token: defaultSeedToken,
  hashed: true,
};

interface DesignTokenContextProps {
  token: Partial<SeedToken>;
  theme?: Theme<SeedToken, MapToken>;
  override?: OverrideToken;
  hashed?: string | boolean;
}

export const DesignTokenContext = React.createContext<DesignTokenContextProps | null>(null);

// ================================== Hook ==================================
// In dev env, we refresh salt per hour to avoid user use this
// Note: Do not modify this to real time update which will make debug harder
const saltPrefix =
  process.env.NODE_ENV === 'production' ? version : `${version}-${new Date().getHours()}`;

export function useToken(): [Theme<SeedToken, MapToken>, GlobalToken, string] {
  const {
    token: rootDesignToken,
    override,
    hashed,
    theme,
  } = React.useContext(DesignTokenContext) || defaultConfig;

  const salt = `${saltPrefix}-${hashed || ''}`;

  const mergedTheme = theme || defaultTheme;

  const [token, hashId] = useCacheToken<GlobalToken, SeedToken>(
    mergedTheme,
    [defaultSeedToken, rootDesignToken],
    {
      salt,
      override,
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
