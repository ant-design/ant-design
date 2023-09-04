import type { SpaceSize } from '.';
import type { SizeType } from '../config-provider/SizeContext';

export function isPresetSize(size: SpaceSize): size is SizeType {
  return ['small', 'middle', 'large'].includes(size as string);
}

function isValidGapNumber(size: SpaceSize): size is number {
  if (!size) {
    // The case of size = 0 is deliberately excluded here, because the default value of the gap attribute in CSS is 0, so if the user passes 0 in, we can directly ignore it.
    return false;
  }
  return typeof size === 'number' && !Number.isNaN(size);
}

export const getRealSize = (
  sizeMap: Record<NonNullable<SpaceSize>, number>,
  value: SpaceSize,
): number => {
  if (isPresetSize(value)) {
    return sizeMap[value!];
  }
  if (isValidGapNumber(value)) {
    return value;
  }
  return 0;
};
