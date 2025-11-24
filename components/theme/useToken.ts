import React from 'react';
import type { Theme } from '@ant-design/cssinjs';
import { useCacheToken } from '@ant-design/cssinjs';

import version from '../version';
import type { DesignTokenProviderProps } from './context';
import { defaultTheme, DesignTokenContext } from './context';
import type { AliasToken, GlobalToken, SeedToken } from './interface';
import defaultSeedToken from './themes/seed';
import formatToken from './util/alias';

export const unitless: {
  [key in keyof AliasToken]?: boolean;
} = {
  lineHeight: true,
  lineHeightSM: true,
  lineHeightLG: true,
  lineHeightHeading1: true,
  lineHeightHeading2: true,
  lineHeightHeading3: true,
  lineHeightHeading4: true,
  lineHeightHeading5: true,
  opacityLoading: true,
  fontWeightStrong: true,
  zIndexPopupBase: true,
  zIndexBase: true,
  opacityImage: true,
};

export const ignore: {
  [key in keyof AliasToken]?: boolean;
} = {
  motionBase: true,
  motionUnit: true,
};

const preserve: {
  [key in keyof AliasToken]?: boolean;
} = {
  screenXS: true,
  screenXSMin: true,
  screenXSMax: true,
  screenSM: true,
  screenSMMin: true,
  screenSMMax: true,
  screenMD: true,
  screenMDMin: true,
  screenMDMax: true,
  screenLG: true,
  screenLGMin: true,
  screenLGMax: true,
  screenXL: true,
  screenXLMin: true,
  screenXLMax: true,
  screenXXL: true,
  screenXXLMin: true,
};

export const getComputedToken = (
  originToken: SeedToken,
  overrideToken: DesignTokenProviderProps['components'] & {
    override?: Partial<AliasToken>;
  },
  theme: Theme<any, any>,
) => {
  const derivativeToken = theme.getDerivativeToken(originToken);

  const { override, ...components } = overrideToken;

  // Merge with override
  let mergedDerivativeToken = {
    ...derivativeToken,
    override,
  };

  // Format if needed
  mergedDerivativeToken = formatToken(mergedDerivativeToken);

  if (components) {
    Object.entries(components).forEach(([key, value]) => {
      const { theme: componentTheme, ...componentTokens } = value;
      let mergedComponentToken = componentTokens;
      if (componentTheme) {
        mergedComponentToken = getComputedToken(
          {
            ...mergedDerivativeToken,
            ...componentTokens,
          },
          {
            override: componentTokens,
          },
          componentTheme,
        );
      }
      mergedDerivativeToken[key] = mergedComponentToken;
    });
  }

  return mergedDerivativeToken;
};

// ================================== Hook ==================================
export default function useToken(): [
  theme: Theme<SeedToken, AliasToken>,
  token: GlobalToken,
  hashId: string,
  realToken: GlobalToken,
  cssVar: DesignTokenProviderProps['cssVar'],
  zeroRuntime: boolean,
] {
  const {
    token: rootDesignToken,
    hashed,
    theme,
    override,
    cssVar: ctxCssVar,
    zeroRuntime,
  } = React.useContext(DesignTokenContext);

  const cssVar = {
    prefix: ctxCssVar?.prefix || 'ant',
    key: ctxCssVar?.key || 'css-var-root',
  };

  const salt = `${version}-${hashed || ''}`;

  const mergedTheme = theme || defaultTheme;

  const [token, hashId, realToken] = useCacheToken<GlobalToken, SeedToken>(
    mergedTheme,
    [defaultSeedToken, rootDesignToken],
    {
      salt,
      override,
      getComputedToken,
      cssVar: {
        ...cssVar,
        unitless,
        ignore,
        preserve,
      },
    },
  );

  return [mergedTheme, realToken, hashed ? hashId : '', token, cssVar, !!zeroRuntime];
}
