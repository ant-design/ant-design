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

type _PresetColorType = typeof PresetColorTypes[number];
type InversePresetColorType = `${_PresetColorType}-inverse`;

export type PresetColorType = _PresetColorType | InversePresetColorType;

export type PresetStatusColorType = typeof PresetStatusColorTypes[number];

export function isPresetColor(color?: any): color is PresetColorType {
  const inverseColors = PresetColorTypes.map((c) => `${c}-inverse`) as InversePresetColorType[];
  return [...inverseColors, ...PresetColorTypes].includes(color);
}

export function isPresetStatusColor(color?: any): color is PresetStatusColorType {
  return PresetStatusColorTypes.includes(color);
}
