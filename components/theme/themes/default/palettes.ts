import { generate } from '@ant-design/colors';
import type {
  GenerateBgPalettes,
  GenerateErrorPalettes,
  GenerateInfoPalettes,
  GeneratePrimaryPalettes,
  GenerateSuccessPalettes,
  GenerateTextAlphaPalettes,
  GenerateWarningPalettes,
} from '../IPalettes';
import { getAlphaColor, getSolidColor } from './colorAlgorithm';

export const generatePrimaryPalettes: GeneratePrimaryPalettes = (primaryBaseColor: string) => {
  const primaryColors = generate(primaryBaseColor);
  return {
    1: primaryColors[0],
    2: primaryColors[1],
    3: primaryColors[2],
    4: primaryColors[3],
    5: primaryColors[4],
    6: primaryColors[5],
    7: primaryColors[6],
    8: primaryColors[7],
    9: primaryColors[8],
  };
};

export const generateSuccessPalettes: GenerateSuccessPalettes = (successBaseColor: string) => {
  const successColors = generate(successBaseColor);
  return {
    1: successColors[0],
    3: successColors[2],
    6: successColors[5],
  };
};

export const generateErrorPalettes: GenerateErrorPalettes = (errorBaseColor: string) => {
  const errorColors = generate(errorBaseColor);
  return {
    1: errorColors[0],
    3: errorColors[2],
    5: errorColors[4],
    6: errorColors[5],
    7: errorColors[6],
  };
};

export const generateWarningPalettes: GenerateWarningPalettes = (warningBaseColor: string) => {
  const warningColors = generate(warningBaseColor);
  return {
    1: warningColors[0],
    3: warningColors[2],
    5: warningColors[4],
    6: warningColors[5],
    7: warningColors[6],
  };
};

export const generateInfoPalettes: GenerateInfoPalettes = (infoBaseColor: string) => {
  const infoColors = generate(infoBaseColor);
  return {
    1: infoColors[0],
    3: infoColors[2],
    6: infoColors[5],
  };
};

export const generateBgPalettes: GenerateBgPalettes = (
  bgBaseColor: string,
  textBaseColor: string,
) => ({
  colorFill: getAlphaColor(textBaseColor, 0.06),
  colorFillSecondary: getAlphaColor(textBaseColor, 0.04),
  colorFillTertiary: getAlphaColor(textBaseColor, 0.03),
  colorFillQuaternary: getAlphaColor(textBaseColor, 0.02),

  colorBgLayout: getSolidColor(bgBaseColor, 4),
  colorBgContainer: getSolidColor(bgBaseColor, 0),
  colorBgElevated: getSolidColor(bgBaseColor, 0),
});

export const generateTextAlphaPalettes: GenerateTextAlphaPalettes = (textBaseColor: string) => ({
  colorText: getAlphaColor(textBaseColor, 0.85),
  colorTextSecondary: getAlphaColor(textBaseColor, 0.65), // 目前只有 Segment Label 用了
  colorTextTertiary: getAlphaColor(textBaseColor, 0.45),
  colorTextQuaternary: getAlphaColor(textBaseColor, 0.25),
});
