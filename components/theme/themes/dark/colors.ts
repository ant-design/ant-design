import { generate, presetDarkPalettes, presetPrimaryColors } from '@ant-design/colors';

import type { GenerateColorMap, GenerateNeutralColorMap } from '../ColorMap';
import { getAlphaColor, getSolidColor } from './colorAlgorithm';

// `generate` returns the preset dark palette for a preset primary color, so skip regenerating it
const presetDarkPaletteMap = new Map<string, string[]>();
Object.keys(presetPrimaryColors).forEach((colorKey) => {
  // Skip keys without a palette, such as `pink` that `default/index.ts` adds at runtime
  if (!presetDarkPalettes[colorKey]) {
    return;
  }
  const palette = [...presetDarkPalettes[colorKey]];
  presetDarkPaletteMap.set(presetPrimaryColors[colorKey], palette);
  presetDarkPaletteMap.set(presetPrimaryColors[colorKey].toLowerCase(), palette);
});

export const generateDarkPalette = (baseColor: string): string[] =>
  presetDarkPaletteMap.get(baseColor) ?? generate(baseColor, { theme: 'dark' });

export const generateColorPalettes: GenerateColorMap = (baseColor: string) => {
  const colors = generateDarkPalette(baseColor);
  return {
    1: colors[0],
    2: colors[1],
    3: colors[2],
    4: colors[3],
    5: colors[6],
    6: colors[5],
    7: colors[4],
    8: colors[6],
    9: colors[5],
    10: colors[4],
  };
};

export const generateNeutralColorPalettes: GenerateNeutralColorMap = (
  bgBaseColor: string,
  textBaseColor: string,
  shadowColor?: string,
) => {
  const colorBgBase = bgBaseColor || '#000';
  const colorTextBase = textBaseColor || '#fff';
  const colorShadow = shadowColor || 'rgba(255, 255, 255, 0.2)';

  return {
    colorBgBase,
    colorTextBase,
    colorShadow,

    colorText: getAlphaColor(colorTextBase, 0.85),
    colorTextSecondary: getAlphaColor(colorTextBase, 0.65),
    colorTextTertiary: getAlphaColor(colorTextBase, 0.45),
    colorTextQuaternary: getAlphaColor(colorTextBase, 0.25),

    colorFill: getAlphaColor(colorTextBase, 0.18),
    colorFillSecondary: getAlphaColor(colorTextBase, 0.12),
    colorFillTertiary: getAlphaColor(colorTextBase, 0.08),
    colorFillQuaternary: getAlphaColor(colorTextBase, 0.04),

    colorBgSolid: getAlphaColor(colorTextBase, 0.95),
    colorBgSolidHover: getAlphaColor(colorTextBase, 1),
    colorBgSolidActive: getAlphaColor(colorTextBase, 0.9),

    colorBgElevated: getSolidColor(colorBgBase, 12),
    colorBgContainer: getSolidColor(colorBgBase, 8),
    colorBgLayout: getSolidColor(colorBgBase, 0),
    colorBgSpotlight: getSolidColor(colorBgBase, 26),
    colorBgBlur: getAlphaColor(colorTextBase, 0.04),

    colorBorder: getSolidColor(colorBgBase, 26),
    colorBorderDisabled: getSolidColor(colorBgBase, 26),
    colorBorderSecondary: getSolidColor(colorBgBase, 19),
  };
};
