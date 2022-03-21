// import React from 'react';
// import { generate } from '@ant-design/colors';
// import { TinyColor } from '@ctrl/tinycolor';
// import {
//   CSSInterpolation,
//   CSSObject,
//   Theme,
//   useCacheToken,
//   useStyleRegister,
// } from '@ant-design/cssinjs';
// import defaultDesignToken from './default';
// import version from '../../version';
// import { resetComponent, resetIcon, clearFix } from './util';
// import {
//   initSlideMotion,
//   slideUpIn,
//   slideUpOut,
//   slideDownIn,
//   slideDownOut,
//   slideLeftIn,
//   slideLeftOut,
//   slideRightIn,
//   slideRightOut,
// } from './util/slide';

// export {
//   resetComponent,
//   resetIcon,
//   clearFix,
//   initSlideMotion,
//   slideUpIn,
//   slideUpOut,
//   slideDownIn,
//   slideDownOut,
//   slideLeftIn,
//   slideLeftOut,
//   slideRightIn,
//   slideRightOut,
// };

// export interface PresetColorType {
//   blue: string;
//   purple: string;
//   cyan: string;
//   green: string;
//   magenta: string;
//   pink: string;
//   red: string;
//   orange: string;
//   yellow: string;
//   volcano: string;
//   geekblue: string;
//   lime: string;
//   gold: string;
// }

// export const PresetColorKeys: ReadonlyArray<keyof PresetColorType> = [
//   'blue',
//   'purple',
//   'cyan',
//   'green',
//   'magenta',
//   'pink',
//   'red',
//   'orange',
//   'yellow',
//   'volcano',
//   'geekblue',
//   'lime',
//   'gold',
// ];

// // 🚨🚨🚨🚨🚨 Note: Design Token is freeze. Please connect @zombieJ if need update this 🚨🚨🚨🚨🚨
// export interface DesignToken extends PresetColorType {
//   // Color
//   colorPrimary: string;
//   colorSuccess: string;
//   colorWarning: string;
//   colorError: string;
//   colorInfo: string;
//   colorText: string;
//   colorTextLightSolid: string;
//   colorBg: string;

//   // Font
//   fontFamily: string;
//   fontSizeBase: number;

//   // Grid
//   gridUnit: number;
//   gridStepBase: number;

//   // Line
//   lineWidth: number;

//   // Motion
//   motionUnit: number;
//   motionBaseStep: number;
//   motionEaseInOutCirc: string;
//   motionEaseInOut: string;
//   motionEaseOutBack: string;
//   motionEaseInQuint: string;
//   motionEaseOutQuint: string;

//   // Radius
//   radiusBase: number;

//   // Size
//   sizeUnit: number;
//   sizeBaseStep: number;

//   // =============== Legacy: should be remove ===============
//   primaryColor: string;
//   successColor: string;
//   warningColor: string;
//   errorColor: string;
//   infoColor: string;

//   lineHeight: number;
//   borderWidth: number;
//   borderStyle: string;
//   borderRadius: number;
//   borderColor: string;
//   borderColorSplit: string;

//   easeInOut: string;
//   easeInOutCirc: string;
//   easeOutBack: string;
//   easeInQuint: string;
//   easeOutQuint: string;

//   outlineWidth: number;
//   outlineBlurSize: number;

//   fontSize: number;
//   // fontFamily: string;
//   textColor: string;
//   textColorSecondary: string;
//   textColorDisabled: string;
//   textColorInverse: string;
//   placeholderColor: string;

//   disabledColor: string;

//   iconColorHover: string;

//   headingColor: string;

//   itemHoverBackground: string;

//   controlHeight: number;

//   padding: number;
//   margin: number;

//   background: string;
//   backgroundLight: string;

//   componentBackground: string;
//   componentBackgroundDisabled: string;

//   duration: number;

//   zIndexDropdown: number;

//   boxShadow?: string;
// }

// type ColorPaletteKeyIndexes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// export type ColorPalettes = {
//   [key in `${keyof PresetColorType}-${ColorPaletteKeyIndexes[number]}`]: string;
// };

// export interface DerivativeToken extends ColorPalettes, Omit<DesignToken, 'duration'> {
//   // =================== Derivative Parts ===================
//   // Derivative Parts: is generated directly by the algorithm with DesignToken.
//   colorPrimaryHover: string;
//   colorPrimaryActive: string;
//   colorPrimaryFocus: string;
//   colorErrorHover: string;
//   colorErrorActive: string;
//   fontSizeSM: number;
//   fontSizeLG: number;
//   sizeSpace: number;
//   fontSize: number;
//   colorTextBelow: string;
//   colorTextBelow2: string;
//   sizeSpaceXS: number;
//   motionDurationBase: number;
//   motionDurationFast: number;
//   motionDurationSlow: number;
//   fontHeight: number;
//   sizeSpaceSM: number;
//   sizePaddingXXS: number;
//   gridSpaceSM: number;
//   gridSpaceBase: number;
//   motionDurationMd: number;
//   radiusLG: number;
//   radiusXL: number;
//   radiusSM: number;
//   colorTextAbove: string;
//   radiusXXL: number;
//   radiusXXXL: number;
//   gridSpaceLG: number;
//   gridSpaceXL: number;
//   gridSpaceXXL: number;
//   fontSizeXL: number;
//   colorTextAbove2: string;
//   colorBgBelow: string;
//   colorBgBelow2: string;

//   // ===================== Alias Parts ======================
//   // Alias Parts: Alias of the derivative parts for more meaningful name.
//   colorPrimaryBorder: string;
//   colorLink: string;
//   colorPrimaryBg: string;
//   controlHeight: number;
//   colorBgContainer: string;
//   colorBgComponent: string;
//   colorBgComponentDisabled: string;
//   controlLineType: string;
//   colorBorder: string;
//   colorHeading: string;
//   colorIconHover: string;
//   colorBgContainerHover: string;
//   controlHeightSM: number;
//   controlHeightLG: number;
//   controlOutlineWidthActive: string;
//   controlOutlineActiveStyle: string;
//   controlOutlineActiveColor: string;
//   colorPlaceholder: string;
//   colorIcon: string;
//   colorBgHover: string;
//   colorSplit: string;
//   colorTextPrimary: string;
//   controlRadius: number;
//   radiusPiece: number;
//   gridContainerMargin: number;
//   controlPaddingHorizontal: number;
//   controlItemBgSelected: number;
//   sizePaddingHorizontal: number;
//   sizePaddingHorizontalXS: number;
//   sizePaddingHorizontalSM: number;
//   sizePaddingHorizontalXXS: number;
//   controlPaddingHorizontalSM: number;
//   controlLineWidth: number;
//   controlHeightXS: number;
//   controlItemBgActive: string;
//   controlItemBgHover: string;
//   colorTextDarkSolid: string;

//   // =============== Legacy: should be remove ===============
//   primaryHoverColor: string;
//   primaryActiveColor: string;
//   primaryOutlineColor: string;
//   errorHoverColor: string;
//   errorActiveColor: string;
//   errorOutlineColor: string;
//   warningHoverColor: string;
//   warningOutlineColor: string;
//   itemActiveBackground: string;

//   highlightColor: string;

//   linkColor: string;
//   linkHoverColor: string;
//   linkActiveColor: string;
//   linkDecoration: CSSObject['textDecoration'];
//   linkHoverDecoration: CSSObject['textDecoration'];
//   linkFocusDecoration: CSSObject['textDecoration'];

//   paddingSM: number;
//   paddingXS: number;
//   paddingXXS: number;
//   paddingLG: number;
//   marginXS: number;
//   marginLG: number;
//   marginXXS: number;

//   duration: string;
//   durationMid: string;
//   durationFast: string;

//   heading1Size: number;
//   heading2Size: number;
//   heading3Size: number;
//   heading4Size: number;
//   heading5Size: number;

//   primaryColors: string[];
//   errorColors: string[];
//   warningColors: string[];

//   // TMP
//   tmpPrimaryColorWeak: string;
//   tmpPrimaryHoverColorWeak: string;
//   // Checked background for Checkable Tag
//   tmpPrimaryColor6: string;
//   // Active background for Checkable Tag
//   tmpPrimaryColor7: string;

//   tmpSuccessColorDeprecatedBg: string;
//   tmpWarningColorDeprecatedBg: string;
//   tmpErrorColorDeprecatedBg: string;
//   tmpInfoColorDeprecatedBg: string;

//   tmpSuccessColorDeprecatedBorder: string;
//   tmpWarningColorDeprecatedBorder: string;
//   tmpErrorColorDeprecatedBorder: string;
//   tmpInfoColorDeprecatedBorder: string;
// }

// export { useStyleRegister };

// // =============================== Derivative ===============================
// function derivative(designToken: DesignToken): DerivativeToken {
//   const { primaryColor, errorColor, warningColor, infoColor, successColor } = designToken;

//   const primaryColors = generate(primaryColor);
//   const errorColors = generate(errorColor);
//   const warningColors = generate(warningColor);
//   const infoColors = generate(infoColor);
//   const successColors = generate(successColor);

//   const paddingSM = (designToken.padding / 4) * 3;
//   const paddingXS = designToken.padding * 0.5;

//   const colorPalettes = PresetColorKeys.map((colorKey: keyof PresetColorType) => {
//     const colors = generate(designToken[colorKey]);

//     const ret = new Array(10).fill(1).reduce((prev, _, i) => {
//       prev[`${colorKey}-${i + 1}`] = colors[i];
//       return prev;
//     }, {}) as ColorPalettes;
//     return ret;
//   }).reduce((prev, cur) => {
//     prev = {
//       ...prev,
//       ...cur,
//     };
//     return prev;
//   }, {} as ColorPalettes);

//   return {
//     // =================== Derivative Parts ===================
//     // FIXME: @arvinxx fix this

//     // ===================== Alias Parts ======================
//     // FIXME: @arvinxx fix this

//     // =============== Legacy: should be remove ===============
//     // FIXME: Need design token
//     boxShadow: `
//     0 3px 6px -4px rgba(0, 0, 0, 0.12),
//     0 6px 16px 0 rgba(0, 0, 0, 0.08),
//     0 9px 28px 8px rgba(0, 0, 0, 0.05)`,

//     ...designToken,

//     primaryHoverColor: primaryColors[4],
//     primaryActiveColor: primaryColors[6],
//     primaryOutlineColor: new TinyColor(primaryColor).setAlpha(0.2).toRgbString(),

//     errorHoverColor: errorColors[4],
//     errorActiveColor: errorColors[6],
//     errorOutlineColor: new TinyColor(errorColor).setAlpha(0.2).toRgbString(),

//     warningHoverColor: warningColors[4],
//     warningOutlineColor: new TinyColor(warningColor).setAlpha(0.2).toRgbString(),

//     highlightColor: errorColors[4], // FIXME: Should not align with error color

//     itemActiveBackground: primaryColors[0],

//     linkColor: primaryColor,
//     linkHoverColor: primaryColors[4],
//     linkActiveColor: primaryColors[6],
//     linkDecoration: 'none',
//     linkHoverDecoration: 'none',
//     linkFocusDecoration: 'none',

//     fontSizeSM: designToken.fontSize - 2,
//     fontSizeLG: designToken.fontSize + 2,
//     controlHeightXS: designToken.controlHeight / 2,
//     controlHeightSM: designToken.controlHeight * 0.75,
//     controlHeightLG: designToken.controlHeight * 1.25,
//     controlPaddingHorizontal: paddingSM,
//     controlPaddingHorizontalSM: paddingXS,
//     paddingSM,
//     paddingXS,
//     paddingXXS: designToken.padding * 0.25,
//     paddingLG: designToken.padding * 1.5,
//     marginXS: designToken.margin * 0.5,
//     marginLG: designToken.margin * 1.5,
//     marginXXS: designToken.margin * 0.25,

//     duration: `${designToken.duration}s`,
//     durationMid: `${(designToken.duration / 3) * 2}s`,
//     durationFast: `${designToken.duration / 3}s`,

//     ...colorPalettes,

//     heading1Size: Math.ceil(designToken.fontSize * 2.71),
//     heading2Size: Math.ceil(designToken.fontSize * 2.14),
//     heading3Size: Math.ceil(designToken.fontSize * 1.71),
//     heading4Size: Math.ceil(designToken.fontSize * 1.42),
//     heading5Size: Math.ceil(designToken.fontSize * 1.14),

//     primaryColors,
//     errorColors,
//     warningColors,

//     // TMP
//     tmpPrimaryColorWeak: primaryColors[2],
//     tmpPrimaryHoverColorWeak: primaryColors[0],
//     tmpPrimaryColor6: primaryColors[5],
//     tmpPrimaryColor7: primaryColors[6],

//     tmpSuccessColorDeprecatedBg: successColors[0],
//     tmpWarningColorDeprecatedBg: warningColors[0],
//     tmpErrorColorDeprecatedBg: errorColors[0],
//     tmpInfoColorDeprecatedBg: infoColors[0],

//     tmpSuccessColorDeprecatedBorder: successColors[2],
//     tmpWarningColorDeprecatedBorder: warningColors[2],
//     tmpErrorColorDeprecatedBorder: errorColors[2],
//     tmpInfoColorDeprecatedBorder: infoColors[2],
//   };
// }

// // ================================ Context =================================
// export const ThemeContext = React.createContext(
//   new Theme<DesignToken, DerivativeToken>(derivative),
// );

// export const DesignTokenContext = React.createContext<{
//   token: Partial<DesignToken>;
//   hashed?: string | boolean;
// }>({
//   token: defaultDesignToken,
// });

// // ================================== Hook ==================================
// export function useToken(): [Theme<DesignToken, DerivativeToken>, DerivativeToken, string] {
//   const { token: rootDesignToken, hashed } = React.useContext(DesignTokenContext);
//   const theme = React.useContext(ThemeContext);

//   const salt = `${version}-${hashed || ''}`;

//   const [token, hashId] = useCacheToken<DerivativeToken, DesignToken>(
//     theme,
//     [defaultDesignToken, rootDesignToken],
//     {
//       salt,
//     },
//   );
//   return [theme, token, hashed ? hashId : ''];
// }

// export type UseComponentStyleResult = [(node: React.ReactNode) => React.ReactElement, string];

// export type GenerateStyle<ComponentToken extends object, ReturnType = CSSInterpolation> = (
//   token: ComponentToken,
//   hashId?: string,
// ) => ReturnType;

// // ================================== Util ==================================
// export function withPrefix(
//   style: CSSObject,
//   prefixCls: string,
//   additionalClsList: string[] = [],
// ): CSSObject {
//   const fullClsList = [prefixCls, ...additionalClsList].filter(cls => cls).map(cls => `.${cls}`);

//   return {
//     [fullClsList.join('')]: style,
//   };
// }
