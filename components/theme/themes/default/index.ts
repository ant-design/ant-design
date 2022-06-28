import { generate } from '@ant-design/colors';
import { TinyColor } from '@ctrl/tinycolor';
import type { ColorPalettes, MapToken, PresetColorType, SeedToken } from '../../interface';
import { defaultPresetColors } from '../seed';
import { getFontSizes } from '../shared';
import genColorMapToken from '../shared/genColorMapToken';
import {
  generateBgPalettes,
  generateErrorPalettes,
  generateInfoPalettes,
  generatePrimaryPalettes,
  generateSuccessPalettes,
  generateTextAlphaPalettes,
  generateWarningPalettes,
} from './palettes';

export default function derivative(token: SeedToken): MapToken {
  const {
    colorPrimary,
    colorSuccess,
    colorWarning,
    colorError,
    colorInfo,
    colorBg,
    motionUnit,
    motionBase,
    fontSizeBase,
    sizeUnit,
    sizeBaseStep,
    gridUnit,
    gridBaseStep,
    radiusBase,
    controlHeight,
    lineWidth,
  } = token;

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

  const primaryColors = generatePrimaryPalettes(colorPrimary);
  const successColors = generateSuccessPalettes(colorSuccess);
  const warningColors = generateWarningPalettes(colorWarning);
  const errorColors = generateErrorPalettes(colorError);
  const infoColors = generateInfoPalettes(colorInfo);
  const bgColors = generateBgPalettes(colorBg);
  const textColors = generateTextAlphaPalettes('#000');

  const fontSizes = getFontSizes(fontSizeBase);

  return {
    ...token,
    ...colorPalettes,

    // Colors
    ...genColorMapToken({
      primaryPalettes: primaryColors,
      successPalettes: successColors,
      warningPalettes: warningColors,
      errorPalettes: errorColors,
      infoPalettes: infoColors,
      bgPalettes: bgColors,
      textAlphaPalettes: textColors,
    }),
    colorPrimaryOutline: new TinyColor(colorPrimary).setAlpha(0.2).toRgbString(),
    colorErrorOutline: new TinyColor(colorError).setAlpha(0.2).toRgbString(),
    colorWarningOutline: new TinyColor(colorWarning).setAlpha(0.2).toRgbString(),

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

    // line
    lineWidthBold: lineWidth + 1,

    // radius
    radiusSM: radiusBase / 2,
    radiusLG: radiusBase * 2,
    radiusXL: radiusBase * 4,

    // control
    controlHeightSM: controlHeight * 0.75,
    controlHeightXS: controlHeight * 0.5,
    controlHeightLG: controlHeight * 1.25,

    // FIXME: should be removed
    bgColors,
    textColors,
  };
}
