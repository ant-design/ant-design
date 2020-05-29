import * as React from 'react';
import { ProgressProps, ProgressSize } from './progress';

interface StepsProps extends ProgressProps {
  steps: number;
  size?: ProgressSize;
  strokeColor?: string;
}

const Steps: React.FC<StepsProps> = props => {
  const { size, steps, percent = 0, strokeWidth = 8, strokeColor, prefixCls, children } = props;
  const getStyledSteps = () => {
    const current = Math.floor(steps * (percent / 100));
    const stepWidth = size === 'small' ? 2 : 14;
    const styleSteps = [];
    for (let i = 0; i < steps; i++) {
      const stepStyle = {
        backgroundColor: i <= current - 1 ? strokeColor : undefined,
        width: stepWidth,
        height: strokeWidth,
      };
      styleSteps.push(<div key={i} className={`${prefixCls}-steps-item`} style={stepStyle} />);
    }
    return styleSteps;
  };
  return (
    <div className={`${prefixCls}-steps-outer`}>
      {getStyledSteps()}
      {children}
    </div>
  );
};

export default Steps;
