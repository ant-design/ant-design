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
