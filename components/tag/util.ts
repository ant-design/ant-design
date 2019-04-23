import { PresetColorTypes } from '../_util/colors';

export const PresetColorRegex = new RegExp(`^(${PresetColorTypes.join('|')})(-inverse)?$`);

export function isPresetColor(color?: string): boolean {
  if (!color) {
    return false;
  }
  return PresetColorRegex.test(color);
}
