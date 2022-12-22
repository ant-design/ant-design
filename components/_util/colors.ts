import type { PresetColorKey } from '../theme/interface';
import { PresetColors } from '../theme/interface';

export const PresetStatusColorTypes = [
  'success',
  'processing',
  'error',
  'default',
  'warning',
] as const;

export type PresetColorType = PresetColorKey | `${PresetColorKey}-inverse`;

export type PresetStatusColorType = typeof PresetStatusColorTypes[number];

export function isPresetColor(color?: any): color is PresetColorType {
  const inverseColors = PresetColors.map((c) => `${c}-inverse`);
  return [...inverseColors, ...PresetColors].includes(color);
}

export function isPresetStatusColor(color?: any): color is PresetStatusColorType {
  return PresetStatusColorTypes.includes(color);
}
