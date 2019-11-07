import * as React from 'react';
import { ProgressProps } from './progress';

interface StepsProps extends ProgressProps {
  count: number;
  width: number;
}

const Steps: React.SFC<StepsProps> = props => {
  const getStyledSteps = () => {
    const { width, count, percent = 0, strokeWidth = 6, strokeColor, prefixCls } = props;
    const current = Math.floor(count * (percent / 100));
    const stepWidth = count > 0 ? width / count : 0;
    const styleSteps = [];
    for (let i = 0; i < count; i++) {
      let color = strokeColor;
      if (i > current - 1) {
        color = '#f3f3f3';
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
  const { prefixCls, children } = props;
  return (
    <div className={`${prefixCls}-steps`}>
      {getStyledSteps()}
      {children}
    </div>
  );
};

export default Steps;
