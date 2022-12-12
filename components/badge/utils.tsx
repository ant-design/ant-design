import { PresetColorTypes } from '../_util/colors';
import type { PresetColorType } from '../_util/colors';

// eslint-disable-next-line import/prefer-default-export
export function isPresetColor(color?: string): boolean {
  return PresetColorTypes.includes(color as PresetColorType);
}
