import { generate } from '@ant-design/colors';
import type {
  BgPalettes,
  ErrorPalettes,
  InfoPalettes,
  PrimaryPalettes,
  SuccessPalettes,
  TextAlphaPalettes,
  WarningPalettes,
} from '../IPalettes';
import { getAlphaColor, getSolidColor } from './colorAlgorithm';

export function generatePrimaryPalettes(primaryBaseColor: string): PrimaryPalettes {
  const primaryColors = generate(primaryBaseColor, { theme: 'dark' });
  return {
    0: primaryBaseColor,
    1: primaryColors[0],
    2: primaryColors[1],
    3: primaryColors[2],
    4: primaryColors[3],
    5: primaryColors[4],
    6: primaryColors[5],
    7: primaryColors[6],
  };
}

export function generateSuccessPalettes(successBaseColor: string): SuccessPalettes {
  const successColors = generate(successBaseColor, { theme: 'dark' });
  return {
    1: successColors[0],
    3: successColors[2],
    6: successColors[5],
  };
}

export function generateErrorPalettes(errorBaseColor: string): ErrorPalettes {
  const errorColors = generate(errorBaseColor, { theme: 'dark' });
  return {
    1: errorColors[0],
    3: errorColors[2],
    5: errorColors[4],
    6: errorColors[5],
    7: errorColors[6],
  };
}

export function generateWarningPalettes(warningBaseColor: string): WarningPalettes {
  const warningColors = generate(warningBaseColor, { theme: 'dark' });
  return {
    1: warningColors[0],
    3: warningColors[2],
    5: warningColors[4],
    6: warningColors[5],
    7: warningColors[6],
  };
}

export function generateInfoPalettes(infoBaseColor: string): InfoPalettes {
  const infoColors = generate(infoBaseColor, { theme: 'dark' });
  return {
    1: infoColors[0],
    3: infoColors[2],
    6: infoColors[5],
  };
}

export function generateBgPalettes(bgBaseColor: string): BgPalettes {
  return {
    'light-2': getSolidColor(bgBaseColor, 2),
    'light-10': getSolidColor(bgBaseColor, 10),
    'light-12': getSolidColor(bgBaseColor, 12),
    26: getSolidColor(bgBaseColor, 26),
    19: getSolidColor(bgBaseColor, 19),
    15: getSolidColor(bgBaseColor, 15),
    12: getSolidColor(bgBaseColor, 12),
    8: getSolidColor(bgBaseColor, 8),
    0: getSolidColor(bgBaseColor, 0),
    base: getSolidColor(bgBaseColor, 0),
  };
}

export function generateTextAlphaPalettes(textBaseColor: string): TextAlphaPalettes {
  return {
    85: getAlphaColor(textBaseColor, 0.85),
    'light-75': getAlphaColor(textBaseColor, 0.75),
    65: getAlphaColor(textBaseColor, 0.65), // 目前只有 Segment Label 用了
    45: getAlphaColor(textBaseColor, 0.45),
    30: getAlphaColor(textBaseColor, 0.3),
    25: getAlphaColor(textBaseColor, 0.25),
    // 从 12 往下基本上就是偏背景和装饰性元素了
    12: getAlphaColor(textBaseColor, 0.12),
    8: getAlphaColor(textBaseColor, 0.08),
    4: getAlphaColor(textBaseColor, 0.04),
    3: getAlphaColor(textBaseColor, 0.03),
  };
}
