import React from 'react';
import { generate } from '@ant-design/colors';
import { TinyColor } from '@ctrl/tinycolor';
import { CSSObject, Theme, useCacheToken, useStyleRegister } from '@ant-design/cssinjs';
import defaultDesignToken from './default';
import version from '../../version';
import { resetComponent, resetIcon } from './util';

export { resetComponent, resetIcon };

export interface DesignToken {
  primaryColor: string;
  errorColor: string;
  lineHeight: number;
  borderWidth: number;
  borderStyle: string;
  borderRadius: number;
  borderColor: string;
  easeInOut: string;
  easeOutBack: string;

  outlineWidth: number;
  outlineBlurSize: number;

  fontSize: number;
  textColor: string;
  textColorDisabled: string;
  textColorSecondary: string;
  textColorInverse: string;
  placeholderColor: string;

  itemHoverBackground: string;

  height: number;

  padding: number;
  margin: number;

  background: string;
  componentBackground: string;
  componentBackgroundDisabled: string;

  duration: number;
}

/** This is temporary token definition since final token definition is not ready yet. */
export interface DerivativeToken extends Omit<DesignToken, 'duration'> {
  primaryHoverColor: string;
  primaryActiveColor: string;
  primaryOutlineColor: string;
  errorHoverColor: string;
  errorActiveColor: string;
  itemActiveBackground: string;

  linkColor: string;
  fontSizeSM: number;
  fontSizeLG: number;
  heightSM: number;
  heightLG: number;
  paddingSM: number;
  paddingXS: number;
  marginXS: number;

  duration: string;
  durationFast: string;

  // TMP
  tmpPrimaryHoverColorWeak: string;
}

export { useStyleRegister };

// =============================== Derivative ===============================
function derivative(designToken: DesignToken): DerivativeToken {
  const { primaryColor, errorColor } = designToken;

  const primaryColors = generate(primaryColor);
  const errorColors = generate(errorColor);

  return {
    ...designToken,

    tmpPrimaryHoverColorWeak: primaryColors[0],
    primaryHoverColor: primaryColors[4],
    primaryActiveColor: primaryColors[6],
    primaryOutlineColor: new TinyColor(primaryColor).setAlpha(0.2).toRgbString(),

    errorHoverColor: errorColors[4],
    errorActiveColor: errorColors[6],

    itemActiveBackground: primaryColors[1],

    linkColor: primaryColor,
    fontSizeSM: designToken.fontSize - 2,
    fontSizeLG: designToken.fontSize + 2,
    heightSM: designToken.height * 0.75,
    heightLG: designToken.height * 1.25,
    paddingSM: designToken.padding / 4 * 3,
    paddingXS: designToken.padding * 0.5,
    marginXS: designToken.margin * 0.5,

    duration: `${designToken.duration}s`,
    durationFast: `${designToken.duration / 3}s`,
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
export function useToken(): [Theme<DesignToken, DerivativeToken>, DerivativeToken, string] {
  const { token: rootDesignToken, hashed } = React.useContext(DesignTokenContext);
  const theme = React.useContext(ThemeContext);

  const salt = `${version}-${hashed || ''}`;

  const [token, hashId] = useCacheToken<DerivativeToken, DesignToken>(
    theme,
    [defaultDesignToken, rootDesignToken],
    {
      salt,
    },
  );
  return [theme, token, hashed ? hashId : ''];
}

export type UseComponentStyleResult = [(node: React.ReactNode) => React.ReactElement, string];

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
