import { presetPrimaryColors } from '@ant-design/colors';
import type { CircleProps } from './Circle';
import type { ProgressProps } from './progress';
import warning from '../_util/warning';

export function validProgress(progress?: number) {
  if (!progress || progress < 0) {
    return 0;
  }
  if (progress > 100) {
    return 100;
  }
  return progress;
}

export function getSuccessPercent({ success, successPercent }: ProgressProps) {
  let percent = successPercent;
  /** @deprecated Use `percent` instead */
  if (success && 'progress' in success) {
    warning(
      false,
      'Progress',
      '`success.progress` is deprecated. Please use `success.percent` instead.',
    );
    percent = success.progress;
  }
  if (success && 'percent' in success) {
    percent = success.percent;
  }
  return percent;
}

export const getPercentage = ({ percent, success, successPercent }: ProgressProps) => {
  const realSuccessPercent = validProgress(getSuccessPercent({ success, successPercent }));
  return [realSuccessPercent, validProgress(validProgress(percent) - realSuccessPercent)];
};

export const getStrokeColor = ({ success = {}, strokeColor }: Partial<CircleProps>): (
  | string
  | Record<PropertyKey, string>
)[] => {
  const { strokeColor: successColor } = success;
  return [successColor || presetPrimaryColors.green, strokeColor || null!];
};

export const getSize = (
  size: ProgressProps['size'],
  type: ProgressProps['type'] | 'step',
  extra?: {
    steps?: number;
  },
): [number, number] => {
  let width: number = -1;
  let height: number = -1;
  if (type === 'step') {
    const steps = extra!.steps!;
    if (typeof size === 'string' || typeof size === 'undefined') {
      width = size === 'small' ? 2 : 14;
      height = 8;
    } else if (typeof size === 'number') {
      [width, height] = [size, size];
    } else {
      [width = 14, height = 8] = size;
    }
    width *= steps;
  } else if (type === 'line') {
    if (typeof size === 'string' || typeof size === 'undefined') {
      height = size === 'small' ? 6 : 8;
    } else if (typeof size === 'number') {
      [width, height] = [size, size];
    } else {
      [width = -1, height = 8] = size;
    }
  } else if (type === 'circle' || type === 'dashboard') {
    if (typeof size === 'string' || typeof size === 'undefined') {
      [width, height] = size === 'small' ? [60, 60] : [120, 120];
    } else if (typeof size === 'number') {
      [width, height] = [size, size];
    } else {
      width = size[0] ?? size[1] ?? 120;
      height = size[0] ?? size[1] ?? 120;
    }
  }
  return [width, height];
};
