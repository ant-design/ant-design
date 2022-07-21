import type { BgMapToken, TextMapToken } from 'antd/es/theme/interface';

export interface PrimaryPalettes {
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

export interface SuccessPalettes {
  1: string;
  3: string;
  6: string;
}

export interface WarningPalettes {
  1: string;
  3: string;
  5: string;
  6: string;
  7: string;
}

export interface ErrorPalettes {
  1: string;
  3: string;
  5: string;
  6: string;
  7: string;
}

export interface InfoPalettes {
  1: string;
  3: string;
  6: string;
}

export type GeneratePrimaryPalettes = (primaryBaseColor: string) => PrimaryPalettes;
export type GenerateSuccessPalettes = (successBaseColor: string) => SuccessPalettes;
export type GenerateWarningPalettes = (warningBaseColor: string) => WarningPalettes;
export type GenerateErrorPalettes = (errorBaseColor: string) => ErrorPalettes;
export type GenerateInfoPalettes = (infoBaseColor: string) => InfoPalettes;
export type GenerateTextAlphaPalettes = (textBaseColor: string) => TextMapToken;
export type GenerateBgPalettes = (bgBaseColor: string, textBaseColor: string) => BgMapToken;
