import classNames from 'classnames';
import type { ProgressProps as RcProgressProps } from 'rc-progress';
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

const Circle: React.FC<CircleProps> = (props) => {
  const {
    prefixCls,
    width = 120,
    strokeWidth = Math.max(getMinPercent(width), 6),
    trailColor = null as unknown as string,
    strokeLinecap = 'round',
    gapPosition,
    gapDegree,
    type,
    children,
    success,
  } = props;

  const circleStyle: React.CSSProperties = { width, height: width, fontSize: width * 0.15 + 6 };

  const realGapDegree = React.useMemo<RcProgressProps['gapDegree']>(() => {
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
      strokeWidth={strokeWidth}
      trailWidth={strokeWidth}
      strokeColor={strokeColor}
      strokeLinecap={strokeLinecap}
      trailColor={trailColor}
      prefixCls={prefixCls}
      gapDegree={realGapDegree}
      gapPosition={gapPos}
    />
  );

  return (
    <div className={wrapperClassName} style={circleStyle}>
      {width <= 20 ? (
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
