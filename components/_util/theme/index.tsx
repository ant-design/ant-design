import React from 'react';
import { Theme, useCacheToken, useStyleRegister } from '@ant-design/cssinjs';
import defaultDesignToken from './default';
import version from '../../version';
import { ConfigContext } from '../../config-provider';

export interface DesignToken {
  primaryColor: string;
  lineHeight: number;
  borderWidth: number;
  borderStyle: string;
  borderRadius: number;
  borderColor: string;
  easeInOut: string;

  fontSize: number;
  textColor: string;

  height: number;

  paddingMD: number;
  marginXS: number;

  componentBackground: string;
}

/** This is temporary token definition since final token definition is not ready yet. */
export interface DerivativeToken extends DesignToken {
  linkColor: string;
  fontSizeLG: number;
}

export { useStyleRegister };

// =============================== Derivative ===============================
function derivative(designToken: DesignToken): DerivativeToken {
  return {
    ...designToken,
    linkColor: designToken.primaryColor,
    fontSizeLG: designToken.fontSize + 2,
  };
}

// ================================ Context =================================
export const ThemeContext = React.createContext(
  new Theme<DesignToken, DerivativeToken>(derivative),
);

export const DesignTokenContext = React.createContext<{
  token?: Partial<DesignToken>;
  hashed?: string | boolean;
}>({
  token: defaultDesignToken,
});

// ================================== Hook ==================================
export function useToken() {
  const { iconPrefixCls } = React.useContext(ConfigContext);
  const { token: rootDesignToken = defaultDesignToken, hashed } =
    React.useContext(DesignTokenContext);
  const theme = React.useContext(ThemeContext);

  const salt = `${version}-${hashed || ''}`;

  const [token, hashId] = useCacheToken(theme, [defaultDesignToken, rootDesignToken], {
    salt,
  });
  return [theme, token, iconPrefixCls, hashed ? hashId : ''];
}
