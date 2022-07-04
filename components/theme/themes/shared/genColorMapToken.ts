import type { ColorMapToken } from '../../interface';
import type {
  BgPalettes,
  ErrorPalettes,
  InfoPalettes,
  PrimaryPalettes,
  SuccessPalettes,
  TextAlphaPalettes,
  WarningPalettes,
} from '../IPalettes';

interface PaletteSheets {
  primaryPalettes: PrimaryPalettes;
  successPalettes: SuccessPalettes;
  errorPalettes: ErrorPalettes;
  warningPalettes: WarningPalettes;
  infoPalettes: InfoPalettes;
  textAlphaPalettes: TextAlphaPalettes;
  bgPalettes: BgPalettes;
}

export default function genColorMapToken({
  primaryPalettes,
  successPalettes,
  errorPalettes,
  warningPalettes,
  infoPalettes,
  textAlphaPalettes,
  bgPalettes,
}: PaletteSheets): ColorMapToken {
  return {
    colorPrimaryHover: primaryPalettes['5'],
    colorPrimaryBg: primaryPalettes['1'],
    colorPrimaryBgHover: primaryPalettes['0'],
    colorPrimaryActive: primaryPalettes['7'],
    colorPrimaryBorder: primaryPalettes['3'],
    colorPrimaryBorderHover: primaryPalettes['4'],

    colorSuccessBg: successPalettes['1'],
    colorSuccessBorder: successPalettes['3'],

    colorErrorBg: errorPalettes['1'],
    colorErrorBorder: errorPalettes['3'],
    colorErrorHover: errorPalettes['5'],
    colorErrorActive: errorPalettes['7'],

    colorWarningBg: warningPalettes['1'],
    colorWarningBorder: warningPalettes['3'],
    colorWarningHover: warningPalettes['5'],
    colorWarningActive: warningPalettes['7'],

    colorInfoBg: infoPalettes['1'],
    colorInfoBorder: infoPalettes['3'],

    colorLink: primaryPalettes['6'],
    colorLinkHover: primaryPalettes['5'],
    colorLinkActive: primaryPalettes['7'],

    // ============== Background ============== //
    colorBgLayout: bgPalettes['0'],
    colorBgElevated: bgPalettes['12'],
    colorBgContainer: bgPalettes['8'],
    colorBgContent: bgPalettes['15'],

    colorBgContentHover: bgPalettes['26'],
    colorBgContainerSecondary: textAlphaPalettes['4'],
    colorBgContainerDisabled: textAlphaPalettes['8'],

    colorBgMask: textAlphaPalettes['45'],
    colorBgItemHover: textAlphaPalettes['8'],
    colorBgFillTmp: textAlphaPalettes['12'],
    colorBgTooltipTmp: textAlphaPalettes['85'],

    // ============== Split ============== //
    colorBorder: bgPalettes['26'],
    colorBorderSecondary: bgPalettes['19'],
    colorBorderBg: bgPalettes.base,
    colorSplit: textAlphaPalettes['12'],

    // ============== Text ============== //
    colorText: textAlphaPalettes['85'],
    colorTextHeading: textAlphaPalettes['85'],
    colorTextSecondary: textAlphaPalettes['45'],
    colorTextDisabled: textAlphaPalettes['25'],
    colorTextLabel: textAlphaPalettes['65'],

    colorAction: textAlphaPalettes['45'],
    colorActionHover: textAlphaPalettes['85'],

    buttonColorBgTextHover: textAlphaPalettes['3'],
    buttonColorBgTextActive: textAlphaPalettes['4'],
    segmentedBgColor: textAlphaPalettes['8'],
    segmentedBgColorHover: textAlphaPalettes['12'],
    segmentedBgColorActive: bgPalettes['8'],
  };
}
