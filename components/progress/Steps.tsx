import * as React from 'react';
import classNames from 'classnames';
import type { ProgressProps, ProgressSize } from './progress';

interface ProgressStepsProps extends ProgressProps {
  steps: number;
  size?: ProgressSize;
  strokeColor?: string | string[];
  trailColor?: string;
}

const Steps: React.FC<ProgressStepsProps> = props => {
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
  const styledSteps = [];
  for (let i = 0; i < steps; i += 1) {
    const color = Array.isArray(strokeColor) ? strokeColor[i] : strokeColor;
    styledSteps.push(
      <div
        key={i}
        className={classNames(`${prefixCls}-steps-item`, {
          [`${prefixCls}-steps-item-active`]: i <= current - 1,
        })}
        style={{
          backgroundColor: i <= current - 1 ? color : trailColor,
          width: stepWidth,
          height: strokeWidth,
        }}
      />,
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
