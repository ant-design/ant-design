import { TinyColor } from '@ctrl/tinycolor';
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
    brandColor,
    colorBgBase,
    colorTextBase,
  } = seed;

  const primaryColors = generatePrimaryPalettes(brandColor);
  const successColors = generateSuccessPalettes(colorSuccessBase);
  const warningColors = generateWarningPalettes(colorWarningBase);
  const errorColors = generateErrorPalettes(colorErrorBase);
  const infoColors = generateInfoPalettes(colorInfoBase);
  const bgColors = generateBgPalettes(colorBgBase);
  const textColors = generateTextAlphaPalettes(colorTextBase);

  const colorPrimary = primaryColors['6'];
  const colorError = errorColors['5'];
  const colorWarning = warningColors['6'];
  const colorSuccess = successColors['6'];
  const colorInfo = infoColors['6'];

  return {
    colorPrimary,
    colorPrimaryHover: primaryColors['5'],
    colorPrimaryBg: primaryColors['1'],
    colorPrimaryBgHover: primaryColors['0'],
    colorPrimaryActive: primaryColors['7'],
    colorPrimaryBorder: primaryColors['3'],
    colorPrimaryBorderHover: primaryColors['4'],
    colorPrimaryOutline: new TinyColor(colorPrimary).setAlpha(0.2).toRgbString(),

    colorSuccess,
    colorSuccessBg: successColors['1'],
    colorSuccessBorder: successColors['3'],

    colorError,
    colorErrorBg: errorColors['1'],
    colorErrorBorder: errorColors['3'],
    colorErrorHover: errorColors['5'],
    colorErrorActive: errorColors['7'],
    colorErrorOutline: new TinyColor(colorError).setAlpha(0.2).toRgbString(),

    colorWarning,
    colorWarningBg: warningColors['1'],
    colorWarningBorder: warningColors['3'],
    colorWarningHover: warningColors['5'],
    colorWarningActive: warningColors['7'],
    colorWarningOutline: new TinyColor(colorWarning).setAlpha(0.2).toRgbString(),

    colorInfo,
    colorInfoBg: infoColors['1'],
    colorInfoBorder: infoColors['3'],

    colorLink: primaryColors['6'],
    colorLinkHover: primaryColors['5'],
    colorLinkActive: primaryColors['7'],

    // ============== Background ============== //
    colorBgLayout: bgColors['0'],
    colorBgElevated: bgColors['12'],
    colorBgContainer: bgColors['8'],
    colorBgContent: bgColors['15'],

    colorBgContentHover: bgColors['26'],
    colorBgContainerSecondary: textColors['4'],
    colorBgContainerDisabled: textColors['8'],

    colorBgMask: textColors['45'],
    colorBgItemHover: textColors['8'],
    colorBgFillTmp: textColors['12'],
    colorBgTooltipTmp: textColors['85'],

    // ============== Split ============== //
    colorBorder: bgColors['26'],
    colorBorderSecondary: bgColors['19'],
    colorBorderBg: bgColors.base,
    colorSplit: textColors['12'],

    // ============== Text ============== //
    colorText: textColors['85'],
    colorTextHeading: textColors['85'],
    colorTextSecondary: textColors['45'],
    colorTextDisabled: textColors['25'],
    colorTextLabel: textColors['65'],

    colorAction: textColors['45'],
    colorActionHover: textColors['85'],

    buttonColorBgTextHover: textColors['3'],
    buttonColorBgTextActive: textColors['4'],
    segmentedBgColor: textColors['8'],
    segmentedBgColorHover: textColors['12'],
    segmentedBgColorActive: bgColors['8'],
  };
}
