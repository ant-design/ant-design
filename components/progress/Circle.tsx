import * as React from 'react';
import { Circle as RCCircle } from 'rc-progress';
import classNames from 'classnames';
import { validProgress } from './utils';
import { ProgressProps } from './progress';

interface CircleProps extends ProgressProps {
  prefixCls: string;
  children: React.ReactNode;
  progressStatus: string;
}

function getPercentage({ percent, success, successPercent }: CircleProps) {
  const ptg = validProgress(percent);
  /** @deprecated Use `percent` instead */
  if (success && 'progress' in success) {
    successPercent = success.progress;
  }
  if (success && 'percent' in success) {
    successPercent = success.percent;
  }
  if (!successPercent) {
    return ptg;
  }

  const successPtg = validProgress(successPercent);
  return [successPercent, validProgress(ptg - successPtg)];
}

function getStrokeColor({ success, strokeColor, successPercent }: CircleProps) {
  const color = strokeColor || null;
  /** @deprecated Use `percent` instead */
  if (success && 'progress' in success) {
    successPercent = success.progress;
  }
  if (success && 'percent' in success) {
    successPercent = success.percent;
  }
  if (!successPercent) {
    return color;
  }
  return [null, color];
}

const Circle: React.FC<CircleProps> = props => {
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
  // Support gapDeg = 0 when type = 'dashboard'
  let gapDeg;
  if (gapDegree || gapDegree === 0) {
    gapDeg = gapDegree;
  } else if (type === 'dashboard') {
    gapDeg = 75;
  }

  // using className to style stroke color
  const strokeColor = getStrokeColor(props) as string | string[] | object;
  const isGradient = Object.prototype.toString.call(strokeColor) === '[object Object]';

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
        gapDegree={gapDeg}
        gapPosition={gapPos}
      />
      {children}
    </div>
  );
};

export default Circle;
