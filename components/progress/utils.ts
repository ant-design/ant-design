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

export const getStrokeColor = ({
  success = {},
  strokeColor,
}: Partial<CircleProps>): (string | Record<PropertyKey, string>)[] => {
  const { strokeColor: successColor } = success;
  return [successColor || presetPrimaryColors.green, strokeColor || null!];
};
