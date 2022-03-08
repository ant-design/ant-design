import React from 'react';
import { generate } from '@ant-design/colors';
import { TinyColor } from '@ctrl/tinycolor';
import { CSSObject, Theme, useCacheToken, useStyleRegister } from '@ant-design/cssinjs';
import defaultDesignToken from './default';
import version from '../../version';
import { resetComponent, resetIcon } from './util';
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

export {
  resetComponent,
  resetIcon,
  initSlideMotion,
  slideUpIn,
  slideUpOut,
  slideDownIn,
  slideDownOut,
  slideLeftIn,
  slideLeftOut,
  slideRightIn,
  slideRightOut,
};

export interface DesignToken {
  primaryColor: string;
  successColor: string;
  warningColor: string;
  errorColor: string;
  infoColor: string;

  lineHeight: number;
  borderWidth: number;
  borderStyle: string;
  borderRadius: number;
  borderColor: string;
  borderColorSplit: string;

  easeInOut: string;
  easeInOutCirc: string;
  easeOutBack: string;
  easeInQuint: string;
  easeOutQuint: string;

  outlineWidth: number;
  outlineBlurSize: number;

  fontSize: number;
  fontFamily: string;
  textColor: string;
  textColorSecondary: string;
  textColorDisabled: string;
  textColorInverse: string;
  placeholderColor: string;

  iconColorHover: string;

  headingColor: string;

  itemHoverBackground: string;

  controlHeight: number;

  padding: number;
  margin: number;

  background: string;
  backgroundLight: string;

  componentBackground: string;
  componentBackgroundDisabled: string;

  duration: number;

  zIndexDropdown: number;

  boxShadow?: string;
}

/** This is temporary token definition since final token definition is not ready yet. */
export interface DerivativeToken extends Omit<DesignToken, 'duration'> {
  primaryHoverColor: string;
  primaryActiveColor: string;
  primaryOutlineColor: string;
  errorHoverColor: string;
  errorActiveColor: string;
  errorOutlineColor: string;
  warningHoverColor: string;
  warningOutlineColor: string;
  itemActiveBackground: string;

  highlightColor: string;

  linkColor: string;
  fontSizeSM: number;
  fontSizeLG: number;
  /** @private Only Used for control inside component like Multiple Select inner selection item */
  controlHeightXS: number;
  controlHeightSM: number;
  controlHeightLG: number;
  controlPaddingHorizontal: number;
  controlPaddingHorizontalSM: number;
  paddingSM: number;
  paddingXS: number;
  paddingXXS: number;
  marginXS: number;

  duration: string;
  durationMid: string;
  durationFast: string;

  // TMP
  tmpPrimaryHoverColorWeak: string;
}

export { useStyleRegister };

// =============================== Derivative ===============================
function derivative(designToken: DesignToken): DerivativeToken {
  const { primaryColor, errorColor, warningColor } = designToken;

  const primaryColors = generate(primaryColor);
  const errorColors = generate(errorColor);
  const warningColors = generate(warningColor);

  const paddingSM = (designToken.padding / 4) * 3;
  const paddingXS = designToken.padding * 0.5;

  return {
    // FIXME: Need design token
    boxShadow: `
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 9px 28px 8px rgba(0, 0, 0, 0.05)`,

    ...designToken,

    tmpPrimaryHoverColorWeak: primaryColors[0],
    primaryHoverColor: primaryColors[4],
    primaryActiveColor: primaryColors[6],
    primaryOutlineColor: new TinyColor(primaryColor).setAlpha(0.2).toRgbString(),

    errorHoverColor: errorColors[4],
    errorActiveColor: errorColors[6],
    errorOutlineColor: new TinyColor(errorColor).setAlpha(0.2).toRgbString(),

    warningHoverColor: warningColors[4],
    warningOutlineColor: new TinyColor(warningColor).setAlpha(0.2).toRgbString(),

    highlightColor: errorColors[4], // FIXME: Should not align with error color

    itemActiveBackground: primaryColors[0],

    linkColor: primaryColor,
    fontSizeSM: designToken.fontSize - 2,
    fontSizeLG: designToken.fontSize + 2,
    controlHeightXS: designToken.controlHeight / 2,
    controlHeightSM: designToken.controlHeight * 0.75,
    controlHeightLG: designToken.controlHeight * 1.25,
    controlPaddingHorizontal: paddingSM,
    controlPaddingHorizontalSM: paddingXS,
    paddingSM,
    paddingXS,
    paddingXXS: designToken.padding * 0.25,
    marginXS: designToken.margin * 0.5,

    duration: `${designToken.duration}s`,
    durationMid: `${(designToken.duration / 3) * 2}s`,
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
