import { parseToRgba, rgba } from 'color2k';

import type { PresetColorKey } from '../theme/interface';
import { PresetColors } from '../theme/interface';

type InverseColor = `${PresetColorKey}-inverse`;
const inverseColors = PresetColors.map<InverseColor>((color) => `${color}-inverse`);

export const PresetStatusColorTypes = [
  'success',
  'processing',
  'error',
  'default',
  'warning',
] as const;

export type PresetColorType = PresetColorKey | InverseColor;

export type PresetStatusColorType = (typeof PresetStatusColorTypes)[number];

/**
 * determine if the color keyword belongs to the `Ant Design` {@link PresetColors}.
 * @param color color to be judged
 * @param includeInverse whether to include reversed colors
 */
export function isPresetColor(color?: any, includeInverse = true) {
  if (includeInverse) {
    return [...inverseColors, ...PresetColors].includes(color);
  }

  return PresetColors.includes(color);
}

export function isPresetStatusColor(color?: any): color is PresetStatusColorType {
  return PresetStatusColorTypes.includes(color);
}

export function onBackground(foreground: string, background: string): string {
  const [fr, fg, fb, fa] = parseToRgba(foreground);
  const [br, bg, bb, ba] = parseToRgba(background);
  const a = fa + ba * (1 - fa);

  return rgba(
    (fr * fa + br * ba * (1 - fa)) / a,
    (fg * fa + bg * ba * (1 - fa)) / a,
    (fb * fa + bb * ba * (1 - fa)) / a,
    a,
  );
}
