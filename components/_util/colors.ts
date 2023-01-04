export const PresetStatusColorTypes = [
  'success',
  'processing',
  'error',
  'default',
  'warning',
] as const;

export const PresetColorTypes = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
] as const;

export type PresetColorType = typeof PresetColorTypes[number];

export type PresetStatusColorType = typeof PresetStatusColorTypes[number];

export function isPresetColor(color?: any): color is PresetColorType {
  return PresetColorTypes.includes(color);
}

export function isPresetStatusColor(color?: any): color is PresetStatusColorType {
  return PresetStatusColorTypes.includes(color);
}
