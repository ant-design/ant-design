import { presetPrimaryColors } from '@ant-design/colors';
import classNames from 'classnames';
import { Circle as RCCircle } from 'rc-progress';
import * as React from 'react';
import type { ProgressGradient, ProgressProps } from './progress';
import { getSuccessPercent, validProgress } from './utils';

interface CircleProps extends ProgressProps {
  prefixCls: string;
  children: React.ReactNode;
  progressStatus: string;
  strokeColor?: string | ProgressGradient;
}

function getPercentage({ percent, success, successPercent }: CircleProps) {
  const realSuccessPercent = validProgress(getSuccessPercent({ success, successPercent }));
  return [realSuccessPercent, validProgress(validProgress(percent) - realSuccessPercent)];
}

function getStrokeColor({
  success = {},
  strokeColor,
}: Partial<CircleProps>): (string | Record<string, string>)[] {
  const { strokeColor: successColor } = success;
  return [successColor || presetPrimaryColors.green, strokeColor || null!];
}

const Circle: React.FC<CircleProps> = props => {
  const {
    prefixCls,
    width,
    strokeWidth,
    trailColor = null as any,
    strokeLinecap = 'round',
    gapPosition,
    gapDegree,
    type,
    children,
    success,
  } = props;
  const circleSize = width || 120;
  const circleStyle = {
    width: circleSize,
    height: circleSize,
    fontSize: circleSize * 0.15 + 6,
  } as React.CSSProperties;
  const circleWidth = strokeWidth || 6;
  const gapPos = gapPosition || (type === 'dashboard' && 'bottom') || undefined;

  const getGapDegree = () => {
    // Support gapDeg = 0 when type = 'dashboard'
    if (gapDegree || gapDegree === 0) {
      return gapDegree;
    }
    if (type === 'dashboard') {
      return 75;
    }
    return undefined;
  };

  // using className to style stroke color
  const isGradient = Object.prototype.toString.call(props.strokeColor) === '[object Object]';
  const strokeColor = getStrokeColor({ success, strokeColor: props.strokeColor });

  const wrapperClassName = classNames(`${prefixCls}-inner`, {
    [`${prefixCls}-circle-gradient`]: isGradient,
  });

  return (
    <div className={wrapperClassName} style={circleStyle}>
      <RCCircle
        percent={getPercentage(props)}
        strokeWidth={circleWidth}
        trailWidth={circleWidth}
        strokeColor={strokeColor}
        strokeLinecap={strokeLinecap}
        trailColor={trailColor}
        prefixCls={prefixCls}
        gapDegree={getGapDegree()}
        gapPosition={gapPos}
      />
      {children}
    </div>
  );
};

export default Circle;
