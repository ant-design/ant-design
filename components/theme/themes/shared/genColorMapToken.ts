import { TinyColor } from '@ctrl/tinycolor';
import type { ColorMapToken, SeedToken } from '../../interface';
import type { GenerateColorPalettes, GenerateNeutralColorPalettes } from '../IPalettes';

interface PaletteGenerators {
  generateColorPalettes: GenerateColorPalettes;
  generateNeutralColorPalettes: GenerateNeutralColorPalettes;
}

export default function genColorMapToken(
  seed: SeedToken,
  { generateColorPalettes, generateNeutralColorPalettes }: PaletteGenerators,
): ColorMapToken {
  const {
    colorSuccess: colorSuccessBase,
    colorWarning: colorWarningBase,
    colorError: colorErrorBase,
    colorInfo: colorInfoBase,
    colorPrimary: colorPrimaryBase,
    colorBgBase,
    colorTextBase,
  } = seed;

  const primaryColors = generateColorPalettes(colorPrimaryBase);
  const successColors = generateColorPalettes(colorSuccessBase);
  const warningColors = generateColorPalettes(colorWarningBase);
  const errorColors = generateColorPalettes(colorErrorBase);
  const infoColors = generateColorPalettes(colorInfoBase);
  const neutralColors = generateNeutralColorPalettes(colorBgBase, colorTextBase);

  return {
    ...neutralColors,

    colorPrimaryBg: primaryColors[1],
    colorPrimaryBgHover: primaryColors[2],
    colorPrimaryBorder: primaryColors[3],
    colorPrimaryBorderHover: primaryColors[4],
    colorPrimaryHover: primaryColors[5],
    colorPrimary: primaryColors[6],
    colorPrimaryActive: primaryColors[7],
    colorPrimaryTextHover: primaryColors[5],
    colorPrimaryText: primaryColors[6],
    colorPrimaryTextActive: primaryColors[7],

    colorSuccessBg: successColors[1],
    colorSuccessBgHover: successColors[2],
    colorSuccessBorder: successColors[3],
    colorSuccessBorderHover: successColors[4],
    colorSuccessHover: successColors[5],
    colorSuccess: successColors[6],
    colorSuccessActive: successColors[7],
    colorSuccessTextHover: successColors[5],
    colorSuccessText: successColors[6],
    colorSuccessTextActive: successColors[7],

    colorErrorBg: errorColors[1],
    colorErrorBgHover: errorColors[2],
    colorErrorBorder: errorColors[3],
    colorErrorBorderHover: errorColors[4],
    colorErrorHover: errorColors[5],
    colorError: errorColors[6],
    colorErrorActive: errorColors[7],
    colorErrorTextHover: errorColors[5],
    colorErrorText: errorColors[6],
    colorErrorTextActive: errorColors[7],

    colorWarningBg: warningColors[1],
    colorWarningBgHover: warningColors[2],
    colorWarningBorder: warningColors[3],
    colorWarningBorderHover: warningColors[4],
    colorWarningHover: warningColors[5],
    colorWarning: warningColors[6],
    colorWarningActive: warningColors[7],
    colorWarningTextHover: warningColors[5],
    colorWarningText: warningColors[6],
    colorWarningTextActive: warningColors[7],

    colorInfoBg: infoColors[1],
    colorInfoBgHover: infoColors[2],
    colorInfoBorder: infoColors[3],
    colorInfoBorderHover: infoColors[4],
    colorInfoHover: infoColors[5],
    colorInfo: infoColors[6],
    colorInfoActive: infoColors[7],
    colorInfoTextHover: infoColors[5],
    colorInfoText: infoColors[6],
    colorInfoTextActive: infoColors[7],

    colorBgMask: neutralColors.colorTextTertiary,
    colorBgSpotlight: new TinyColor('#000').setAlpha(0.85).toRgbString(),
  };
}
