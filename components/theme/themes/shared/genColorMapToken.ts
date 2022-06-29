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

    colorDefaultOutline: textAlphaPalettes['4'],

    // ============== Background ============== //
    colorBgLayout: bgPalettes['0'],
    colorBgElevated: bgPalettes['12'],
    colorBgContainer: bgPalettes['8'],
    colorBgContainerSecondary: textAlphaPalettes['4'],
    colorBgContainerDisabled: textAlphaPalettes['8'],
    colorBgContent: bgPalettes['15'],
    colorBgContentHover: bgPalettes['26'],

    // ============== Split ============== //
    colorBorder: bgPalettes['26'],
    colorBorderSecondary: bgPalettes['19'],
    colorSplit: textAlphaPalettes['12'],

    // ============== Text ============== //
    colorText: textAlphaPalettes['85'],
    colorTextHeading: textAlphaPalettes['85'],
    colorTextSecondary: textAlphaPalettes['45'],
    // TODO: 这个 30 估计要改成 25
    colorTextDisabled: textAlphaPalettes['30'],
    colorTextPlaceholder: textAlphaPalettes['25'],

    colorAction: textAlphaPalettes['45'],
    colorActionHover: textAlphaPalettes['85'],

    colorHighlight: errorPalettes['5'],
  };
}
