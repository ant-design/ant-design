import { generate } from '@ant-design/colors';
import { TinyColor } from '@ctrl/tinycolor';
import type { ColorPalettes, MapToken, PresetColorType, SeedToken } from '../../interface';
import { defaultPresetColors } from '../seed';
import { getFontSizes } from '../shared';
import { generateBgPalettes, generateTextAlphaPalettes } from './palettes';

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

  const primaryColors = generate(colorPrimary);
  const successColors = generate(colorSuccess);
  const warningColors = generate(colorWarning);
  const errorColors = generate(colorError);
  const infoColors = generate(colorInfo);
  const bgColors = generateBgPalettes(colorBg);
  // FIXME: need seedToken '#000'
  const textColors = generateTextAlphaPalettes('#000');

  const fontSizes = getFontSizes(fontSizeBase);

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

    // line
    lineWidthBold: lineWidth + 1,

    // radius
    radiusSM: radiusBase / 2,
    radiusLG: radiusBase * 2,
    radiusXL: radiusBase * 4,

    colorDefaultOutline: textColors['4'],

    colorPrimaryActive: primaryColors[6],
    colorPrimaryHover: primaryColors[4],
    colorPrimaryOutline: new TinyColor(colorPrimary).setAlpha(0.2).toRgbString(),
    colorPrimaryBorder: primaryColors[2],
    colorPrimaryBorderHover: primaryColors[3],

    colorSuccessBorder: successColors[2],
    colorSuccessBg: successColors[0],

    colorErrorActive: errorColors[6],
    colorErrorHover: errorColors[4],
    colorErrorOutline: new TinyColor(colorError).setAlpha(0.2).toRgbString(),
    colorErrorBorder: errorColors[2],
    colorErrorBg: errorColors[0],

    colorWarningActive: warningColors[6],
    colorWarningHover: warningColors[4],
    colorWarningOutline: new TinyColor(colorWarning).setAlpha(0.2).toRgbString(),
    colorWarningBorder: warningColors[2],
    colorWarningBg: warningColors[0],

    colorInfoBorder: infoColors[2],
    colorInfoBg: infoColors[0],

    colorHighlight: errorColors[4],

    colorBgLayout: bgColors['0'],
    colorBgContentHover: bgColors['26'],
    colorBgContainer: bgColors['8'],
    colorBgElevated: bgColors['12'],
    colorBgContent: bgColors['15'],

    // control
    controlHeightSM: controlHeight * 0.75,
    controlHeightXS: controlHeight * 0.5,
    controlHeightLG: controlHeight * 1.25,

    // map token
    bgColors,
    textColors,
  };
}
