import * as React from 'react';
import type { ProgressProps as RcProgressProps } from '@rc-component/progress';
import { Circle as RCCircle } from '@rc-component/progress';
import cls from 'classnames';

import Tooltip from '../tooltip';
import type { ProgressGradient, ProgressProps } from './progress';
import { getPercentage, getSize, getStrokeColor } from './utils';

const CIRCLE_MIN_STROKE_WIDTH = 3;

const getMinPercent = (width: number): number => (CIRCLE_MIN_STROKE_WIDTH / width) * 100;

export interface CircleProps extends ProgressProps {
  prefixCls: string;
  children: React.ReactNode;
  progressStatus: string;
  strokeColor?: string | ProgressGradient;
  classNames: Required<ProgressProps>['classNames'];
  styles: Required<ProgressProps>['styles'];
}

const Circle: React.FC<CircleProps> = (props) => {
  const {
    prefixCls,
    classNames,
    styles,
    trailColor = null as unknown as string,
    strokeLinecap = 'round',
    gapPosition,
    gapDegree,
    width: originWidth = 120,
    type,
    children,
    success,
    size = originWidth,
    steps,
  } = props;

  const [width, height] = getSize(size, 'circle');

  let { strokeWidth } = props;
  if (strokeWidth === undefined) {
    strokeWidth = Math.max(getMinPercent(width), 6);
  }

  const circleStyle: React.CSSProperties = { width, height, fontSize: width * 0.15 + 6 };

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

  const percentArray = getPercentage(props);
  const gapPos = gapPosition || (type === 'dashboard' && 'bottom') || undefined;

  // using className to style stroke color
  const isGradient = Object.prototype.toString.call(props.strokeColor) === '[object Object]';
  const strokeColor = getStrokeColor({ success, strokeColor: props.strokeColor });

  const wrapperClassName = cls(`${prefixCls}-inner`, {
    [`${prefixCls}-circle-gradient`]: isGradient,
  });

  const circleContent = (
    <RCCircle
      steps={steps}
      percent={steps ? percentArray[1] : percentArray}
      strokeWidth={strokeWidth}
      trailWidth={strokeWidth}
      strokeColor={steps ? strokeColor[1] : strokeColor}
      strokeLinecap={strokeLinecap}
      trailColor={trailColor}
      prefixCls={prefixCls}
      gapDegree={realGapDegree}
      gapPosition={gapPos}
      classNames={{
        ...classNames,
        root: classNames.body,
      }}
      styles={{
        ...styles,
        root: styles.body,
      }}
    />
  );

  const smallCircle = width <= 20;
  const node = (
    <div className={wrapperClassName} style={circleStyle}>
      {circleContent}
      {!smallCircle && children}
    </div>
  );

  if (smallCircle) {
    return <Tooltip title={children}>{node}</Tooltip>;
  }

  return node;
};

export default Circle;
