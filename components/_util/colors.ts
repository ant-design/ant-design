import type { ElementOf } from './type';

export const PresetStatusColorTypes = [
  'success',
  'processing',
  'error',
  'default',
  'warning',
] as const;
// eslint-disable-next-line import/prefer-default-export
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

export type PresetColorType = ElementOf<typeof PresetColorTypes>;
export type PresetStatusColorType = ElementOf<typeof PresetStatusColorTypes>;
