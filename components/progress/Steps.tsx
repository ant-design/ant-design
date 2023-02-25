import classNames from 'classnames';
import * as React from 'react';
import type { ProgressProps } from './progress';
import { getSize } from './utils';

interface ProgressStepsProps extends ProgressProps {
  steps: number;
  strokeColor?: string | string[];
  trailColor?: string;
}

const Steps: React.FC<ProgressStepsProps> = (props) => {
  const {
    size,
    steps,
    percent = 0,
    strokeWidth = 8,
    strokeColor,
    trailColor = null as any,
    prefixCls,
    children,
  } = props;
  const current = Math.round(steps * (percent / 100));
  const stepWidth = size === 'small' ? 2 : 14;
  const mergedSize = size ?? [stepWidth, strokeWidth];
  const [width, height] = getSize(mergedSize, 'step', { steps, strokeWidth });
  const unitWidth = width / steps;
  const styledSteps: React.ReactNode[] = new Array(steps);
  for (let i = 0; i < steps; i++) {
    const color = Array.isArray(strokeColor) ? strokeColor[i] : strokeColor;
    styledSteps[i] = (
      <div
        key={i}
        className={classNames(`${prefixCls}-steps-item`, {
          [`${prefixCls}-steps-item-active`]: i <= current - 1,
        })}
        style={{
          backgroundColor: i <= current - 1 ? color : trailColor,
          width: unitWidth,
          height,
        }}
      />
    );
  }
  return (
    <div className={`${prefixCls}-steps-outer`}>
      {styledSteps}
      {children}
    </div>
  );
};

export default Steps;
