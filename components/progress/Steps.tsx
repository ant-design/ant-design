import * as React from 'react';
import classNames from 'classnames';
import { ProgressProps, ProgressSize } from './progress';
import useStyle from 'antd/es/progress/style';

interface StepsProps extends ProgressProps {
  prefixCls: string;
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
  const current = Math.round(steps * (percent / 100));
  const stepWidth = size === 'small' ? 2 : 14;
  const styledSteps = [];
  const [wrapSSR, hashId] = useStyle(prefixCls)

  for (let i = 0; i < steps; i += 1) {
    styledSteps.push(
      <div
        key={i}
        className={classNames(`${prefixCls}-steps-item`, {
          [`${prefixCls}-steps-item-active`]: i <= current - 1,
        }, hashId)}
        style={{
          backgroundColor: i <= current - 1 ? strokeColor : trailColor,
          width: stepWidth,
          height: strokeWidth,
        }}
      />,
    );
  }
  return wrapSSR((
    <div className={classNames(`${prefixCls}-steps-outer`, hashId)}>
      {styledSteps}
      {children}
    </div>
  ));
};

export default Steps;
