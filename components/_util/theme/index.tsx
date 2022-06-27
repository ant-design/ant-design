import type { CSSInterpolation } from '@ant-design/cssinjs';
import { Theme, useCacheToken, useStyleRegister } from '@ant-design/cssinjs';
import React from 'react';
import version from '../../version';
import type { DeepPartial } from '../type';
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
import { clearFix, operationUnit, resetComponent, resetIcon, roundedArrow } from './util';
import formatToken from './util/alias';
import type { FullToken } from './util/genComponentStyleHook';
import genComponentStyleHook from './util/genComponentStyleHook';
import getArrowStyle from './util/placementArrow';
import statisticToken, { merge as mergeToken, statistic } from './util/statistic';

export {
  resetComponent,
  resetIcon,
  clearFix,
  roundedArrow,
  getArrowStyle,
  operationUnit,
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
export const DesignTokenContext = React.createContext<{
  token: Partial<SeedToken>;
  derivative?: (token: SeedToken) => MapToken;
  override?: DeepPartial<OverrideToken>;
  hashed?: string | boolean;
}>({
  token: defaultSeedToken,
});

// ================================== Hook ==================================
// In dev env, we refresh salt per hour to avoid user use this
// Note: Do not modify this to real time update which will make debug harder
const saltPrefix =
  process.env.NODE_ENV === 'production' ? version : `${version}-${new Date().getHours()}`;

export function useToken(): [Theme<SeedToken, MapToken>, GlobalToken, string] {
  const {
    token: rootDesignToken,
    override,
    derivative = defaultDerivative,
    hashed,
  } = React.useContext(DesignTokenContext);

  const theme = new Theme(derivative);

  const salt = `${saltPrefix}-${hashed || ''}`;

  const [token, hashId] = useCacheToken<GlobalToken, SeedToken>(
    theme,
    [defaultSeedToken, rootDesignToken],
    {
      salt,
      override,
      formatToken,
    },
  );

  return [theme, token, hashed ? hashId : ''];
}

export type UseComponentStyleResult = [(node: React.ReactNode) => React.ReactElement, string];

export type GenerateStyle<
  ComponentToken extends object = AliasToken,
  ReturnType = CSSInterpolation,
> = (token: ComponentToken) => ReturnType;

export const emptyTheme = new Theme(token => token);

export type CustomTokenOptions<
  CustomSeedToken extends Record<string, any>,
  CustomAliasToken extends Record<string, any> = {},
> = {
  /** The original tokens, which may affect other tokens. */
  seedToken?: CustomSeedToken;
  /** Generate token based on seedToken. */
  formatToken?: (
    mergedToken: AliasToken & CustomSeedToken,
  ) => AliasToken & CustomSeedToken & CustomAliasToken;
};

/**
 * Generate custom tokens with tokens of ant-design.
 */
export function useCustomToken<
  CustomSeedToken extends Record<string, any>,
  CustomAliasToken extends Record<string, any> = {},
>({
  seedToken,
  formatToken: customFormatToken,
}: CustomTokenOptions<CustomSeedToken, CustomAliasToken>): {
  token: AliasToken & CustomSeedToken & CustomAliasToken;
  hashId: string;
} {
  const [, antdToken, hashed] = useToken();

  const salt = `${saltPrefix}-${hashed || ''}`;

  const [token, hashId] = useCacheToken(emptyTheme, [antdToken, seedToken ?? {}], {
    salt,
    formatToken: customFormatToken,
  });

  return {
    token,
    hashId: hashed ? hashId : '',
  };
}
