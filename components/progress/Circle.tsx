import classNames from 'classnames';
import { Circle as RCCircle } from 'rc-progress';
import * as React from 'react';
import Tooltip from '../tooltip';
import type { ProgressGradient, ProgressProps } from './progress';
import { getPercentage, getStrokeColor } from './utils';

const CIRCLE_MIN_STROKE_WIDTH = 3;

const getMinPercent = (width: number): number => (CIRCLE_MIN_STROKE_WIDTH / width) * 100;

export interface CircleProps extends ProgressProps {
  prefixCls: string;
  children: React.ReactNode;
  progressStatus: string;
  strokeColor?: string | ProgressGradient;
}

const Circle: React.FC<CircleProps> = props => {
  const {
    prefixCls,
    width,
    strokeWidth,
    trailColor = null as unknown as string,
    strokeLinecap = 'round',
    gapPosition,
    gapDegree,
    type,
    children,
    success,
  } = props;

  const circleSize = width || 120;

  const circleStyle: React.CSSProperties = {
    width: circleSize,
    height: circleSize,
    fontSize: circleSize * 0.15 + 6,
  };

  const memoizedStrokeWidth = React.useMemo<number>(() => {
    if (!strokeWidth) {
      return Math.max(getMinPercent(circleSize), 6);
    }
    if (strokeWidth * 0.01 * circleSize <= CIRCLE_MIN_STROKE_WIDTH) {
      return getMinPercent(circleSize);
    }
    return strokeWidth;
  }, [circleSize, strokeWidth]);

  const getGapDegree = React.useMemo<number | undefined>(() => {
    // Support gapDeg = 0 when type = 'dashboard'
    if (gapDegree || gapDegree === 0) {
      return gapDegree;
    }
    if (type === 'dashboard') {
      return 75;
    }
    return undefined;
  }, [gapDegree, type]);

  const gapPos = gapPosition || (type === 'dashboard' && 'bottom') || undefined;

  // using className to style stroke color
  const isGradient = Object.prototype.toString.call(props.strokeColor) === '[object Object]';
  const strokeColor = getStrokeColor({ success, strokeColor: props.strokeColor });

  const wrapperClassName = classNames(`${prefixCls}-inner`, {
    [`${prefixCls}-circle-gradient`]: isGradient,
  });

  const circleContent = (
    <RCCircle
      percent={getPercentage(props)}
      strokeWidth={memoizedStrokeWidth}
      trailWidth={memoizedStrokeWidth}
      strokeColor={strokeColor}
      strokeLinecap={strokeLinecap}
      trailColor={trailColor}
      prefixCls={prefixCls}
      gapDegree={getGapDegree}
      gapPosition={gapPos}
    />
  );

  return (
    <div className={wrapperClassName} style={circleStyle}>
      {circleSize <= 20 ? (
        <Tooltip title={children}>{circleContent}</Tooltip>
      ) : (
        <>
          {circleContent}
          {children}
        </>
      )}
    </div>
  );
};

export default Circle;
