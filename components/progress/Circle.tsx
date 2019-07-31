import * as React from 'react';
import { Circle as RCCircle } from 'rc-progress';
import { validProgress } from './utils';
import { ProgressProps } from './progress';

interface CircleProps extends ProgressProps {
  prefixCls: string;
  children: React.ReactNode;
  progressStatus: string;
}

const statusColorMap: Record<string, string> = {
  normal: '#108ee9',
  exception: '#ff5500',
  success: '#87d068',
};

function getPercentage({ percent, successPercent }: CircleProps) {
  const ptg = validProgress(percent);
  if (!successPercent) return ptg;

  const successPtg = validProgress(successPercent);
  return [successPercent, validProgress(ptg - successPtg)];
}

function getStrokeColor({ progressStatus, successPercent, strokeColor }: CircleProps) {
  const color = strokeColor || statusColorMap[progressStatus];
  if (!successPercent) return color;
  return [statusColorMap.success, color];
}

const Circle: React.SFC<CircleProps> = props => {
  const {
    prefixCls,
    width,
    strokeWidth,
    trailColor,
    strokeLinecap,
    gapPosition,
    gapDegree,
    type,
    children,
  } = props;
  const circleSize = width || 120;
  const circleStyle = {
    width: circleSize,
    height: circleSize,
    fontSize: circleSize * 0.15 + 6,
  };
  const circleWidth = strokeWidth || 6;
  const gapPos = gapPosition || (type === 'dashboard' && 'bottom') || 'top';
  const gapDeg = gapDegree || (type === 'dashboard' && 75);

  return (
    <div className={`${prefixCls}-inner`} style={circleStyle}>
      <RCCircle
        percent={getPercentage(props)}
        strokeWidth={circleWidth}
        trailWidth={circleWidth}
        strokeColor={getStrokeColor(props)}
        strokeLinecap={strokeLinecap}
        trailColor={trailColor}
        prefixCls={prefixCls}
        gapDegree={gapDeg}
        gapPosition={gapPos}
      />
      {children}
    </div>
  );
};

export default Circle;
