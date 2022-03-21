import React from 'react';
import {
  CSSInterpolation,
  CSSObject,
  Theme,
  useCacheToken,
  useStyleRegister,
} from '@ant-design/cssinjs';
import defaultSeedToken, { derivative as defaultDerivative } from './themes/default';
import version from '../../version';
import { resetComponent, resetIcon, clearFix } from './util';
import formatToken from './util/alias';
import {
  initSlideMotion,
  slideUpIn,
  slideUpOut,
  slideDownIn,
  slideDownOut,
  slideLeftIn,
  slideLeftOut,
  slideRightIn,
  slideRightOut,
} from './util/slide';
import { PresetColors } from './interface';
import type {
  SeedToken,
  DerivativeToken,
  AliasToken,
  OverrideToken,
  PresetColorType,
} from './interface';

export {
  PresetColors,
  resetComponent,
  resetIcon,
  clearFix,
  initSlideMotion,
  slideUpIn,
  slideUpOut,
  slideDownIn,
  slideDownOut,
  slideLeftIn,
  slideLeftOut,
  slideRightIn,
  slideRightOut,
  useStyleRegister,
};

export type {
  SeedToken,
  AliasToken,
  PresetColorType,
  // FIXME: Remove this type
  AliasToken as DerivativeToken,
};

// ================================ Context =================================
const defaultTheme = new Theme(defaultDerivative);

export const DesignTokenContext = React.createContext<{
  token: Partial<SeedToken>;
  theme?: Theme<SeedToken, DerivativeToken>;
  override?: OverrideToken;
  hashed?: string | boolean;
}>({
  token: defaultSeedToken,
  theme: defaultTheme,
});

// ================================== Hook ==================================
export function useToken(): [Theme<SeedToken, DerivativeToken>, AliasToken, string] {
  const {
    token: rootDesignToken,
    theme = defaultTheme,
    override,
    hashed,
  } = React.useContext(DesignTokenContext);

  const salt = `${version}-${hashed || ''}`;

  const [token, hashId] = useCacheToken<AliasToken, SeedToken>(
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

export type GenerateStyle<ComponentToken extends object, ReturnType = CSSInterpolation> = (
  token: ComponentToken,
  hashId?: string,
) => ReturnType;

// ================================== Util ==================================
export function withPrefix(
  style: CSSObject,
  prefixCls: string,
  additionalClsList: string[] = [],
): CSSObject {
  const fullClsList = [prefixCls, ...additionalClsList].filter(cls => cls).map(cls => `.${cls}`);

  return {
    [fullClsList.join('')]: style,
  };
}
