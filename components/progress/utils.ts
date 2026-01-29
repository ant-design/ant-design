import { presetPrimaryColors } from '@ant-design/colors';

import type { CircleProps } from './Circle';
import type { ProgressProps } from './progress';

export function validProgress(progress?: number) {
  if (!progress || progress < 0) {
    return 0;
  }
  if (progress > 100) {
    return 100;
  }
  return progress;
}

export function getSuccessPercent({ success }: ProgressProps) {
  let percent: number | undefined;
  if (success && 'percent' in success) {
    percent = success.percent;
  }
  return percent;
}

/**
 * Normalizes percent value to a number between 0-100.
 * Handles both single number values and multi-value arrays (ProgressValueItem[]).
 * For arrays, sums all values and clamps the result.
 */
export function normalizePercent(percent: ProgressProps['percent']): number {
  if (Array.isArray(percent)) {
    // For ProgressValueItem[], sum all values
    if (percent.length > 0 && typeof percent[0] === 'object' && 'value' in percent[0]) {
      const total = percent.reduce((sum, item) => sum + validProgress(item.value), 0);
      return validProgress(total);
    }
    return 0;
  }
  const numPercent = Number(percent) || 0;
  return validProgress(numPercent);
}

export const getPercentage = ({ percent, success }: ProgressProps): [number, number] => {
  const realSuccessPercent = validProgress(getSuccessPercent({ success }));
  const normalizedPercent = normalizePercent(percent);
  return [realSuccessPercent, validProgress(normalizedPercent - realSuccessPercent)];
};

export const getStrokeColor = ({
  success = {},
  strokeColor,
}: Partial<CircleProps>): (string | Record<PropertyKey, string>)[] => {
  const { strokeColor: successColor } = success;
  return [successColor || presetPrimaryColors.green, strokeColor || null!];
};

export const getSize = (
  size: ProgressProps['size'],
  type: ProgressProps['type'] | 'step',
  extra?: {
    steps?: number;
    strokeWidth?: number;
  },
): [number, number] => {
  let width = -1;
  let height = -1;
  if (type === 'step') {
    const steps = extra!.steps!;
    const strokeWidth = extra!.strokeWidth!;
    if (typeof size === 'string' || typeof size === 'undefined') {
      width = size === 'small' ? 2 : 14;
      height = strokeWidth ?? 8;
    } else if (typeof size === 'number') {
      [width, height] = [size, size];
    } else {
      [width = 14, height = 8] = (Array.isArray(size) ? size : [size.width, size.height]) as [
        number,
        number,
      ];
    }

    width *= steps;
  } else if (type === 'line') {
    const strokeWidth = extra?.strokeWidth;
    if (typeof size === 'string' || typeof size === 'undefined') {
      height = strokeWidth || (size === 'small' ? 6 : 8);
    } else if (typeof size === 'number') {
      [width, height] = [size, size];
    } else {
      [width = -1, height = 8] = (Array.isArray(size) ? size : [size.width, size.height]) as [
        number,
        number,
      ];
    }
  } else if (type === 'circle' || type === 'dashboard') {
    if (typeof size === 'string' || typeof size === 'undefined') {
      [width, height] = size === 'small' ? [60, 60] : [120, 120];
    } else if (typeof size === 'number') {
      [width, height] = [size, size];
    } else if (Array.isArray(size)) {
      width = (size[0] ?? size[1] ?? 120) as number;
      height = (size[0] ?? size[1] ?? 120) as number;
    }
  }
  return [width, height];
};
