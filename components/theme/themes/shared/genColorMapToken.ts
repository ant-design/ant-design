import type { ColorMapToken, SeedToken } from '../../interface';
import type {
  GenerateBgPalettes,
  GenerateErrorPalettes,
  GenerateInfoPalettes,
  GeneratePrimaryPalettes,
  GenerateSuccessPalettes,
  GenerateTextAlphaPalettes,
  GenerateWarningPalettes,
} from '../IPalettes';

interface PaletteGenerators {
  generatePrimaryPalettes: GeneratePrimaryPalettes;
  generateSuccessPalettes: GenerateSuccessPalettes;
  generateErrorPalettes: GenerateErrorPalettes;
  generateWarningPalettes: GenerateWarningPalettes;
  generateInfoPalettes: GenerateInfoPalettes;
  generateTextAlphaPalettes: GenerateTextAlphaPalettes;
  generateBgPalettes: GenerateBgPalettes;
}

export default function genColorMapToken(
  seed: SeedToken,
  {
    generatePrimaryPalettes,
    generateSuccessPalettes,
    generateErrorPalettes,
    generateWarningPalettes,
    generateInfoPalettes,
    generateTextAlphaPalettes,
    generateBgPalettes,
  }: PaletteGenerators,
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

  const primaryColors = generatePrimaryPalettes(colorPrimaryBase);
  const successColors = generateSuccessPalettes(colorSuccessBase);
  const warningColors = generateWarningPalettes(colorWarningBase);
  const errorColors = generateErrorPalettes(colorErrorBase);
  const infoColors = generateInfoPalettes(colorInfoBase);
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
    colorPrimaryText: primaryColors[8],
    colorPrimaryTextHover: primaryColors[9],

    colorSuccessBg: successColors[1],
    colorSuccessBorder: successColors[3],
    colorSuccess: successColors[6],

    colorErrorBg: errorColors[1],
    colorErrorBorder: errorColors[3],
    colorErrorHover: errorColors[5],
    colorError: errorColors[6],
    colorErrorActive: errorColors[7],

    colorWarningBg: warningColors[1],
    colorWarningBorder: warningColors[3],
    colorWarningHover: warningColors[5],
    colorWarning: warningColors[6],
    colorWarningActive: warningColors[7],

    colorInfoBg: infoColors[1],
    colorInfoBorder: infoColors[3],
    colorInfo: infoColors[6],
  };
}
