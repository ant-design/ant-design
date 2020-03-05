import * as React from 'react';
import { ProgressProps, ProgressSize } from './progress';

interface StepsProps extends ProgressProps {
  steps: number;
  size?: ProgressSize;
}

const Steps: React.SFC<StepsProps> = props => {
  const {
    size = 'default',
    steps,
    percent = 0,
    strokeWidth = 8,
    strokeColor,
    prefixCls,
    children,
  } = props;
  const getStyledSteps = () => {
    const current = Math.floor(steps * (percent / 100));
    const stepWidth = size === 'small' ? 2 : 14;
    const styleSteps = [];
    for (let i = 0; i < steps; i++) {
      let color;
      if (i <= current - 1) {
        color = strokeColor;
      }
      const stepStyle = {
        backgroundColor: `${color}`,
        width: `${stepWidth}px`,
        height: `${strokeWidth}px`,
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
