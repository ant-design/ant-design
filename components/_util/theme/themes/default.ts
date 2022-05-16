/* eslint-disable import/prefer-default-export */

import { generate } from '@ant-design/colors';
import { TinyColor } from '@ctrl/tinycolor';
import type { PresetColorType, SeedToken, DerivativeToken, ColorPalettes } from '../interface';
import { getFontSizes } from './shared';

const defaultPresetColors: PresetColorType = {
  blue: '#1890FF',
  purple: '#722ED1',
  cyan: '#13C2C2',
  green: '#52C41A',
  magenta: '#EB2F96',
  pink: '#eb2f96',
  red: '#F5222D',
  orange: '#FA8C16',
  yellow: '#FADB14',
  volcano: '#FA541C',
  geekblue: '#2F54EB',
  gold: '#FAAD14',
  lime: '#A0D911',
};

export function derivative(token: SeedToken): DerivativeToken {
  const {
    colorPrimary,
    colorSuccess,
    colorWarning,
    colorError,
    colorInfo,
    motionUnit,
    motionBase,
    fontSizeBase,
    sizeUnit,
    sizeBaseStep,
    gridUnit,
    gridBaseStep,
    radiusBase,
    controlHeight,
  } = token;

  const primaryColors = generate(colorPrimary);
  const successColors = generate(colorSuccess);
  const warningColors = generate(colorWarning);
  const errorColors = generate(colorError);
  const infoColors = generate(colorInfo);

  const colorPalettes = Object.keys(defaultPresetColors)
    .map((colorKey: keyof PresetColorType) => {
      const colors = generate(token[colorKey]);

      return new Array(10).fill(1).reduce((prev, _, i) => {
        prev[`${colorKey}-${i + 1}`] = colors[i];
        return prev;
      }, {}) as ColorPalettes;
    })
    .reduce((prev, cur) => {
      prev = {
        ...prev,
        ...cur,
      };
      return prev;
    }, {} as ColorPalettes);

  const fontSizes = getFontSizes(fontSizeBase);

  const colorBg2 = new TinyColor({ h: 0, s: 0, v: 98 }).toHexString();
  const colorBgBelow = new TinyColor({ h: 0, s: 0, v: 98 }).toHexString();
  const colorBgBelow2 = new TinyColor({ h: 0, s: 0, v: 96 }).toHexString();

  return {
    ...token,
    ...colorPalettes,

    // motion
    motionDurationFast: `${(motionBase + motionUnit * 1).toFixed(1)}s`,
    motionDurationMid: `${(motionBase + motionUnit * 2).toFixed(1)}s`,
    motionDurationSlow: `${(motionBase + motionUnit * 3).toFixed(1)}s`,

    // font
    fontSizes: fontSizes.map(fs => fs.size),
    lineHeights: fontSizes.map(fs => fs.lineHeight),

    // size
    sizeSpaceSM: sizeUnit * (sizeBaseStep - 1),
    sizeSpace: sizeUnit * sizeBaseStep,
    sizeSpaceXS: sizeUnit * (sizeBaseStep - 2),
    sizeSpaceXXS: sizeUnit * (sizeBaseStep - 3),

    // grid
    gridSpaceSM: gridUnit * (gridBaseStep - 1),
    gridSpaceBase: gridUnit * gridBaseStep,
    gridSpaceLG: gridUnit * (gridBaseStep + 1),
    gridSpaceXL: gridUnit * (gridBaseStep + 2),
    gridSpaceXXL: gridUnit * (gridBaseStep + 5),

    // radius
    radiusSM: radiusBase / 2,
    radiusLG: radiusBase * 2,
    radiusXL: radiusBase * 4,

    // color
    colorBg2,
    colorBg3: '#e1e1e1',
    colorBgBelow,
    colorBgBelow2,

    colorDefaultOutline: colorBgBelow2,

    colorPrimaryActive: primaryColors[6],
    colorPrimaryHover: primaryColors[4],
    colorPrimaryOutline: new TinyColor(colorPrimary).setAlpha(0.2).toRgbString(),
    colorPrimarySecondary: primaryColors[2],

    colorSuccessSecondary: successColors[2],
    colorBgSuccess: successColors[0],

    colorErrorActive: errorColors[6],
    colorErrorHover: errorColors[4],
    colorErrorOutline: new TinyColor(colorError).setAlpha(0.2).toRgbString(),
    colorErrorSecondary: errorColors[2],
    colorBgError: errorColors[0],

    colorWarningActive: warningColors[6],
    colorWarningHover: warningColors[4],
    colorWarningOutline: new TinyColor(colorWarning).setAlpha(0.2).toRgbString(),
    colorWarningSecondary: warningColors[2],
    colorBgWarning: warningColors[0],

    colorInfoSecondary: infoColors[2],
    colorBgInfo: infoColors[0],

    colorHighlight: errorColors[4],

    // text color
    colorText2: new TinyColor('#000').setAlpha(0.85).toRgbString(),

    colorTextBelow: new TinyColor('#000').setAlpha(0.45).toRgbString(),
    colorTextBelow2: new TinyColor('#000').setAlpha(0.25).toRgbString(),
    colorTextBelow3: new TinyColor({ h: 0, s: 0, v: 75 }).setAlpha(0.5).toRgbString(),

    // control
    controlHeightSM: controlHeight * 0.75,
    controlHeightXS: controlHeight * 0.5,
    controlHeightLG: controlHeight * 1.25,
  };
}

const seedToken: SeedToken = {
  // preset color palettes
  ...defaultPresetColors,

  // Color
  colorPrimary: '#1890ff',
  colorSuccess: '#52c41a',
  colorWarning: '#faad14',
  colorError: '#ff4d4f',
  colorInfo: '#1890ff',
  colorText: new TinyColor('#000').setAlpha(0.85).toRgbString(),
  colorTextLightSolid: '#fff',

  colorBg: new TinyColor({ h: 0, s: 0, v: 100 }).toHexString(),

  // Font
  fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
'Noto Color Emoji'`,
  fontSizeBase: 14,

  // Grid
  gridUnit: 4,
  gridBaseStep: 2,

  // Line
  lineWidth: 1,
  lineType: 'solid',

  // Motion
  motionUnit: 0.1,
  motionBase: 0,
  motionEaseInOutCirc: `cubic-bezier(0.78, 0.14, 0.15, 0.86)`,
  motionEaseInOut: `cubic-bezier(0.645, 0.045, 0.355, 1)`,
  motionEaseOutBack: `cubic-bezier(0.12, 0.4, 0.29, 1.46)`,
  motionEaseInQuint: `cubic-bezier(0.645, 0.045, 0.355, 1)`,
  motionEaseOutQuint: `cubic-bezier(0.23, 1, 0.32, 1)`,

  // Radius
  radiusBase: 2,

  // Size
  sizeUnit: 4,
  sizeBaseStep: 4,
  sizePopupArrow: 8 * Math.sqrt(2),

  // Control Base
  controlHeight: 32,

  // zIndex
  zIndexBase: 0,
  zIndexPopupBase: 1000,
};

export default seedToken;
