import React from 'react';
import { generate } from '@ant-design/colors';
import { CSSObject, Theme, useCacheToken, useStyleRegister } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import defaultDesignToken from './default';
import version from '../../version';
import { resetComponent, placeholder } from './util';

export { resetComponent, placeholder };

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

  fontSize: number;
  textColor: string;
  textColorDisabled: string;
  textColorInverse: string;

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
  errorHoverColor: string;
  errorActiveColor: string;
  itemActiveBackground: string;

  linkColor: string;
  fontSizeSM: number;
  fontSizeLG: number;
  heightSM: number;
  heightLG: number;
  paddingXS: number;
  marginXS: number;

  duration: string;
  durationFast: string;

  // TMP
  tmpPrimaryHoverColorWeak: string;
  tmpBackgroundLight: string;
  tmpPaddingSM: number;
  tmpTextColorSecondary: string;
  tmpWarningColor: string;
  tmpSuccessColor: string;
  tmpIconHoverColor: string;
}

export { useStyleRegister };

// =============================== Derivative ===============================
function derivative(designToken: DesignToken): DerivativeToken {
  const primaryColors = generate(designToken.primaryColor);
  const errorColors = generate(designToken.errorColor);

  return {
    ...designToken,

    tmpPrimaryHoverColorWeak: primaryColors[0],
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

    duration: `${designToken.duration}s`,
    durationFast: `${designToken.duration / 3}s`,

    tmpBackgroundLight: new TinyColor({ h: 0, s: 0, v: '98%' }).toHexString(),
    tmpPaddingSM: 12,
    tmpTextColorSecondary: new TinyColor('#000').setAlpha('0.45').toHex8String(),
    tmpWarningColor: 'orange',
    tmpSuccessColor: 'green',
    tmpIconHoverColor: new TinyColor('#000').setAlpha('0.85').toHex8String(),
    itemActiveBackground: designToken.itemHoverBackground,
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
