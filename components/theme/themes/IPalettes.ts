import type { BgMapToken, TextMapToken } from 'antd/es/theme/interface';

export interface ColorPalettes {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
}

export type GenerateColorPalettes = (baseColor: string) => ColorPalettes;
export type GenerateTextAlphaPalettes = (textBaseColor: string) => TextMapToken;
export type GenerateBgPalettes = (bgBaseColor: string, textBaseColor: string) => BgMapToken;
