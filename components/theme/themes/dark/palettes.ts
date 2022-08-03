import { generate } from '@ant-design/colors';
import type {
  GenerateBgPalettes,
  GenerateColorPalettes,
  GenerateTextAlphaPalettes,
} from '../IPalettes';
import { getAlphaColor, getSolidColor } from './colorAlgorithm';

export const generateColorPalettes: GenerateColorPalettes = (baseColor: string) => {
  const colors = generate(baseColor, { theme: 'dark' });
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
  colorFill: getAlphaColor(textBaseColor, 0.18),
  colorFillSecondary: getAlphaColor(textBaseColor, 0.12),
  colorFillTertiary: getAlphaColor(textBaseColor, 0.08),
  colorFillQuaternary: getAlphaColor(textBaseColor, 0.04),

  colorBgElevated: getSolidColor(bgBaseColor, 12),
  colorBgContainer: getSolidColor(bgBaseColor, 8),
  colorBgLayout: getSolidColor(bgBaseColor, 0),

  colorBorder: getSolidColor(bgBaseColor, 26),
  colorBorderSecondary: getSolidColor(bgBaseColor, 19),
  colorSplit: getAlphaColor(textBaseColor, 12),
});

export const generateTextAlphaPalettes: GenerateTextAlphaPalettes = (textBaseColor: string) => ({
  colorText: getAlphaColor(textBaseColor, 0.85),
  colorTextSecondary: getAlphaColor(textBaseColor, 0.65),
  colorTextTertiary: getAlphaColor(textBaseColor, 0.45),
  colorTextQuaternary: getAlphaColor(textBaseColor, 0.25),
});
