import { tuple } from './type';

export const PresetStatusColorTypes = tuple('success', 'processing', 'error', 'default', 'warning');
// eslint-disable-next-line import/prefer-default-export
export const PresetColorTypes = tuple(
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
);

export type PresetColorType = typeof PresetColorTypes[number];
export type PresetStatusColorType = typeof PresetStatusColorTypes[number];
