import { generate } from '@ant-design/colors';
import type {
  GenerateBgPalettes,
  GenerateColorPalettes,
  GenerateTextAlphaPalettes,
} from '../IPalettes';
import { getAlphaColor, getSolidColor } from './colorAlgorithm';

export const generateColorPalettes: GenerateColorPalettes = (baseColor: string) => {
  const colors = generate(baseColor);
  return {
    1: colors[0],
    2: colors[1],
    3: colors[2],
    4: colors[3],
    5: colors[4],
    6: colors[5],
    7: colors[6],
    8: colors[7],
    9: colors[8],
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
