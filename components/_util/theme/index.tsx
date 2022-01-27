import React from 'react';
import { Theme, useCacheToken, useStyleRegister } from '@ant-design/cssinjs';
import defaultDesignToken from './default';
import version from '../../version';

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

  componentBackground: string;
}

/** This is temporary token definition since final token definition is not ready yet. */
export interface DerivativeToken extends DesignToken {
  linkColor: string;
}

export { useStyleRegister };

// =============================== Derivative ===============================
function derivative(designToken: DesignToken): DerivativeToken {
  return {
    ...designToken,
    linkColor: designToken.primaryColor,
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
  const { token: rootDesignToken = defaultDesignToken, hashed } =
    React.useContext(DesignTokenContext);
  const theme = React.useContext(ThemeContext);

  const salt = `${version}-${hashed || ''}`;

  const [token, hashId] = useCacheToken(theme, [defaultDesignToken, rootDesignToken], {
    salt,
  });
  return [theme, token, hashed ? hashId : ''];
}
