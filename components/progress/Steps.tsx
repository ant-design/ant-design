import * as React from 'react';
import classNames from 'classnames';
import { ProgressProps, ProgressSize } from './progress';

interface StepsProps extends ProgressProps {
  steps: number;
  size?: ProgressSize;
  strokeColor?: string;
  trailColor?: string;
}

const Steps: React.FC<StepsProps> = props => {
  const {
    size,
    steps,
    percent = 0,
    strokeWidth = 8,
    strokeColor,
    trailColor,
    prefixCls,
    children,
  } = props;
  const current = Math.floor(steps * (percent / 100));
  const stepWidth = size === 'small' ? 2 : 14;
  const styledSteps = [];
  for (let i = 0; i < steps; i += 1) {
    styledSteps.push(
      <div
        key={i}
        className={classNames(`${prefixCls}-steps-item`, {
          [`${prefixCls}-steps-item-active`]: i <= current - 1,
        })}
        style={{
          backgroundColor: i <= current - 1 ? strokeColor : trailColor,
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
