import * as React from 'react';
import cls from 'classnames';

import type { ProgressProps } from './progress';
import { getSize } from './utils';

interface ProgressStepsProps extends ProgressProps {
  steps: number;
  strokeColor?: string | string[];
  railColor?: string;
  /** @deprecated Please use `railColor` instead */
  trailColor?: string;
  classNames: Required<ProgressProps>['classNames'];
  styles: Required<ProgressProps>['styles'];
}

const Steps: React.FC<ProgressStepsProps> = (props) => {
  const {
    classNames,
    styles,
    size,
    steps,
    rounding: customRounding = Math.round,
    percent = 0,
    strokeWidth = 8,
    strokeColor,
    railColor,
    trailColor,
    prefixCls,
    children,
  } = props;
  const current = customRounding(steps * (percent / 100));
  const stepWidth = size === 'small' ? 2 : 14;
  const mergedSize = size ?? [stepWidth, strokeWidth];
  const [width, height] = getSize(mergedSize, 'step', { steps, strokeWidth });
  const unitWidth = width / steps;
  const styledSteps = Array.from<React.ReactNode>({ length: steps });

  const mergedRailColor = railColor ?? trailColor;

  for (let i = 0; i < steps; i++) {
    const color = Array.isArray(strokeColor) ? strokeColor[i] : strokeColor;
    styledSteps[i] = (
      <div
        key={i}
        className={cls(
          `${prefixCls}-steps-item`,
          {
            [`${prefixCls}-steps-item-active`]: i <= current - 1,
          },
          classNames.track,
        )}
        style={{
          backgroundColor: i <= current - 1 ? color : mergedRailColor,
          width: unitWidth,
          height,
          ...styles.track,
        }}
      />
    );
  }
  return (
    <div className={cls(`${prefixCls}-steps-body`, classNames.body)} style={styles.body}>
      {styledSteps}
      {children}
    </div>
  );
};

export default Steps;
