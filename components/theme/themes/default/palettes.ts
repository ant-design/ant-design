import { generate } from '@ant-design/colors';
import type { GenerateColorPalettes, GenerateNeutralColorPalettes } from '../IPalettes';
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

export const generateNeutralColorPalettes: GenerateNeutralColorPalettes = (
  bgBaseColor: string,
  textBaseColor: string,
) => ({
  colorText: getAlphaColor(textBaseColor, 0.85),
  // v5 should be 0.65
  colorTextSecondary: getAlphaColor(textBaseColor, 0.45),
  colorTextTertiary: getAlphaColor(textBaseColor, 0.45),
  colorTextQuaternary: getAlphaColor(textBaseColor, 0.25),

  colorFill: getAlphaColor(textBaseColor, 0.06),
  colorFillSecondary: getAlphaColor(textBaseColor, 0.04),
  colorFillTertiary: getAlphaColor(textBaseColor, 0.03),
  colorFillQuaternary: getAlphaColor(textBaseColor, 0.02),

  colorBgLayout: getSolidColor(bgBaseColor, 4),
  colorBgContainer: getSolidColor(bgBaseColor, 0),
  colorBgElevated: getSolidColor(bgBaseColor, 0),

  colorBorder: getSolidColor(bgBaseColor, 15),
  colorBorderSecondary: getSolidColor(bgBaseColor, 6),
  colorSplit: getAlphaColor(textBaseColor, 0.06),
});
