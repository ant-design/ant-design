import type { ColorNeutralMapToken } from '../interface';

export interface ColorMap {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
}

export type GenerateColorMap = (baseColor: string) => ColorMap;
export type GenerateNeutralColorMap = (
  bgBaseColor: string,
  textBaseColor: string,
) => ColorNeutralMapToken;
