import React from 'react';
import { generate } from '@ant-design/colors';
import { CSSObject, Theme, useCacheToken, useStyleRegister } from '@ant-design/cssinjs';
import defaultDesignToken from './default';
import version from '../../version';
import { ConfigContext } from '../../config-provider';

export interface DesignToken {
  primaryColor: string;
  errorColor: string;
  lineHeight: number;
  borderWidth: number;
  borderStyle: string;
  borderRadius: number;
  borderColor: string;
  easeInOut: string;

  fontSize: number;
  textColor: string;
  textColorDisabled: string;

  height: number;

  padding: number;
  margin: number;

  componentBackground: string;
  componentBackgroundDisabled: string;

  duration: string;
}

/** This is temporary token definition since final token definition is not ready yet. */
export interface DerivativeToken extends DesignToken {
  primaryHoverColor: string;
  primaryActiveColor: string;
  errorHoverColor: string;
  errorActiveColor: string;

  linkColor: string;
  fontSizeSM: number;
  fontSizeLG: number;
  heightSM: number;
  heightLG: number;
  paddingXS: number;
  marginXS: number;
}

export { useStyleRegister };

// =============================== Derivative ===============================
function derivative(designToken: DesignToken): DerivativeToken {
  const primaryColors = generate(designToken.primaryColor);
  const errorColors = generate(designToken.errorColor);

  return {
    ...designToken,

    primaryHoverColor: primaryColors[4],
    primaryActiveColor: primaryColors[6],

    errorHoverColor: errorColors[4],
    errorActiveColor: errorColors[6],

    linkColor: designToken.primaryColor,
    fontSizeSM: designToken.fontSize - 2,
    fontSizeLG: designToken.fontSize + 2,
    heightSM: designToken.height * 0.75,
    heightLG: designToken.height * 1.25,
    paddingXS: designToken.padding * 0.5,
    marginXS: designToken.margin * 0.5,
  };
}

// ================================ Context =================================
export const ThemeContext = React.createContext(
  new Theme<DesignToken, DerivativeToken>(derivative),
);

export const DesignTokenContext = React.createContext<{
  token: Partial<DesignToken>;
  hashed?: string | boolean;
}>({
  token: defaultDesignToken,
});

// ================================== Hook ==================================
export function useToken() {
  const { iconPrefixCls } = React.useContext(ConfigContext);
  const { token: rootDesignToken, hashed } = React.useContext(DesignTokenContext);
  const theme = React.useContext(ThemeContext);

  const salt = `${version}-${hashed || ''}`;

  const [token, hashId] = useCacheToken(theme, [defaultDesignToken, rootDesignToken], {
    salt,
  });
  return [theme, token, iconPrefixCls, hashed ? hashId : ''];
}

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
