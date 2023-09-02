import type { SpaceSize } from '.';
import type { SizeType } from '../config-provider/SizeContext';

export const isPresetSize = (size: SpaceSize): size is SizeType => {
  if (!size) {
    return false;
  }
  return typeof size === 'string' && ['small', 'middle', 'large'].includes(size);
};

export const isValidNumber = (size: SpaceSize): size is number => {
  if (!size) {
    return false;
  }
  return typeof size === 'number' && !Number.isNaN(size);
};
