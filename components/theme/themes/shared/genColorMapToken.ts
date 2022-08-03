import { TinyColor } from '@ctrl/tinycolor';
import type { ColorMapToken, SeedToken } from '../../interface';
import type {
  GenerateBgPalettes,
  GenerateColorPalettes,
  GenerateTextAlphaPalettes,
} from '../IPalettes';

interface PaletteGenerators {
  generateColorPalettes: GenerateColorPalettes;
  generateTextAlphaPalettes: GenerateTextAlphaPalettes;
  generateBgPalettes: GenerateBgPalettes;
}

export default function genColorMapToken(
  seed: SeedToken,
  { generateColorPalettes, generateTextAlphaPalettes, generateBgPalettes }: PaletteGenerators,
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
  const bgColors = generateBgPalettes(colorBgBase, colorTextBase);
  const textColors = generateTextAlphaPalettes(colorTextBase);

  return {
    ...bgColors,
    ...textColors,

    colorPrimaryBg: primaryColors[1],
    colorPrimaryBgHover: primaryColors[2],
    colorPrimaryBorder: primaryColors[3],
    colorPrimaryBorderHover: primaryColors[4],
    colorPrimaryHover: primaryColors[5],
    colorPrimary: primaryColors[6],
    colorPrimaryActive: primaryColors[7],
    colorPrimaryText: primaryColors[6],
    colorPrimaryTextHover: primaryColors[5],

    colorSuccessBg: successColors[1],
    colorSuccessBgHover: successColors[2],
    colorSuccessBorder: successColors[3],
    colorSuccessBorderHover: successColors[4],
    colorSuccessHover: successColors[5],
    colorSuccess: successColors[6],
    colorSuccessActive: successColors[7],
    colorSuccessText: successColors[8],
    colorSuccessTextHover: successColors[9],

    colorErrorBg: errorColors[1],
    colorErrorBgHover: errorColors[2],
    colorErrorBorder: errorColors[3],
    colorErrorBorderHover: errorColors[4],
    colorErrorHover: errorColors[5],
    colorError: errorColors[6],
    colorErrorActive: errorColors[7],
    colorErrorText: errorColors[8],
    colorErrorTextHover: errorColors[9],

    colorWarningBg: warningColors[1],
    colorWarningBgHover: warningColors[2],
    colorWarningBorder: warningColors[3],
    colorWarningBorderHover: warningColors[4],
    colorWarningHover: warningColors[5],
    colorWarning: warningColors[6],
    colorWarningActive: warningColors[7],
    colorWarningText: warningColors[8],
    colorWarningTextHover: warningColors[9],

    colorInfoBg: infoColors[1],
    colorInfoBgHover: infoColors[2],
    colorInfoBorder: infoColors[3],
    colorInfoBorderHover: infoColors[4],
    colorInfoHover: infoColors[5],
    colorInfo: infoColors[6],
    colorInfoActive: infoColors[7],
    colorInfoText: infoColors[8],
    colorInfoTextHover: infoColors[9],

    colorBgMask: textColors.colorTextTertiary,
    colorBgSpotlight: new TinyColor('#000').setAlpha(0.85).toRgbString(),
  };
}
