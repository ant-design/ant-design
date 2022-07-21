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

  const colorPrimary = primaryColors[6];
  const colorError = errorColors[5];
  const colorWarning = warningColors[6];
  const colorSuccess = successColors[6];
  const colorInfo = infoColors[6];

  return {
    ...bgColors,
    ...textColors,

    colorPrimaryBg: primaryColors[1],
    colorPrimaryBgHover: primaryColors[2],
    colorPrimaryBorder: primaryColors[3],
    colorPrimaryBorderHover: primaryColors[4],
    colorPrimaryHover: primaryColors[5],
    colorPrimary,
    colorPrimaryActive: primaryColors[7],
    colorPrimaryText: primaryColors[8],
    colorPrimaryTextHover: primaryColors[9],

    colorSuccess,
    colorSuccessBg: successColors[1],
    colorSuccessBorder: successColors[3],

    colorError,
    colorErrorBg: errorColors[1],
    colorErrorBorder: errorColors[3],
    colorErrorHover: errorColors[5],
    colorErrorActive: errorColors[7],

    colorWarning,
    colorWarningBg: warningColors[1],
    colorWarningBorder: warningColors[3],
    colorWarningHover: warningColors[5],
    colorWarningActive: warningColors[7],

    colorInfo,
    colorInfoBg: infoColors[1],
    colorInfoBorder: infoColors[3],
  };
}
