import type { BgPalettes, TextAlphaPalettes } from '../IPalettes';
import { getAlphaColor, getSolidColor } from './colorAlgorithm';

export function generateBgPalettes(bgBaseColor: string): BgPalettes {
  return {
    26: getSolidColor(bgBaseColor, 15),
    'light-2': getSolidColor(bgBaseColor, 2),
    'light-10': getSolidColor(bgBaseColor, 10),
    'light-12': getSolidColor(bgBaseColor, 12),
    19: getSolidColor(bgBaseColor, 6),
    15: getSolidColor(bgBaseColor, 4),
    12: getSolidColor(bgBaseColor, 0),
    8: getSolidColor(bgBaseColor, 0),
    0: getSolidColor(bgBaseColor, 4),
  };
}

export function generateTextAlphaPalettes(textBaseColor: string): TextAlphaPalettes {
  return {
    85: getAlphaColor(textBaseColor, 0.85),
    'light-75': getAlphaColor(textBaseColor, 0.75), // 目前只有 Popover 用了
    75: getAlphaColor(textBaseColor, 0.85), // 目前只有 Color Action 用了
    65: getAlphaColor(textBaseColor, 0.65), // 目前只有 Segment Label 用了
    45: getAlphaColor(textBaseColor, 0.45),
    30: getAlphaColor(textBaseColor, 0.25),
    25: getAlphaColor(textBaseColor, 0.25),
    // 从 12 往下基本上就是偏背景和装饰性元素了
    12: getAlphaColor(textBaseColor, 0.06), // 主要是 Split
    8: getAlphaColor(textBaseColor, 0.04),
    4: getAlphaColor(textBaseColor, 0.03),
    3: getAlphaColor(textBaseColor, 0.02),
  };
}
