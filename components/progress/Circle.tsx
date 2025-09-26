import * as React from 'react';
import type { ProgressProps as RcProgressProps } from '@rc-component/progress';
import { Circle as RCCircle } from '@rc-component/progress';
import { omit } from '@rc-component/util';
import cls from 'classnames';

import { useComponentConfig } from '../config-provider/context';
import Tooltip from '../tooltip';
import type { GapPosition, ProgressGradient, ProgressProps, SemanticName } from './progress';
import { getPercentage, getSize, getStrokeColor } from './utils';

const CIRCLE_MIN_STROKE_WIDTH = 3;

const getMinPercent = (width: number): number => (CIRCLE_MIN_STROKE_WIDTH / width) * 100;

const OMIT_SEMANTIC_NAMES = ['root', 'body', 'indicator'] as const;

export interface CircleProps extends Omit<ProgressProps, 'classNames' | 'styles'> {
  prefixCls: string;
  children: React.ReactNode;
  progressStatus: string;
  strokeColor?: string | ProgressGradient;
  classNames: Record<SemanticName, string>;
  styles: Record<SemanticName, React.CSSProperties>;
}

const Circle: React.FC<CircleProps> = (props) => {
  const {
    prefixCls,
    classNames,
    styles,
    railColor,
    trailColor,
    strokeLinecap = 'round',
    gapPosition,
    gapPlacement,
    gapDegree,
    width: originWidth = 120,
    type,
    children,
    success,
    size = originWidth,
    steps,
  } = props;

  const { direction } = useComponentConfig('progress');

  const mergedRailColor = railColor ?? trailColor;

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
  const gapPos: GapPosition | undefined = React.useMemo(() => {
    const mergedPlacement =
      (gapPlacement ?? gapPosition) || (type === 'dashboard' && 'bottom') || undefined;
    const isRTL = direction === 'rtl';
    switch (mergedPlacement) {
      case 'start':
        return isRTL ? 'right' : 'left';
      case 'end':
        return isRTL ? 'left' : 'right';
      default:
        return mergedPlacement;
    }
  }, [direction, gapPlacement, gapPosition, type]);

  // using className to style stroke color
  const isGradient = Object.prototype.toString.call(props.strokeColor) === '[object Object]';
  const strokeColor = getStrokeColor({ success, strokeColor: props.strokeColor });

  const wrapperClassName = cls(
    `${prefixCls}-body`,
    {
      [`${prefixCls}-circle-gradient`]: isGradient,
    },
    classNames.body,
  );

  const circleContent = (
    <RCCircle
      steps={steps}
      percent={steps ? percentArray[1] : percentArray}
      strokeWidth={strokeWidth}
      railWidth={strokeWidth}
      strokeColor={steps ? strokeColor[1] : strokeColor}
      strokeLinecap={strokeLinecap}
      railColor={mergedRailColor}
      prefixCls={prefixCls}
      gapDegree={realGapDegree}
      gapPosition={gapPos}
      classNames={omit(classNames, OMIT_SEMANTIC_NAMES)}
      styles={omit(styles, OMIT_SEMANTIC_NAMES)}
    />
  );

  const smallCircle = width <= 20;
  const node = (
    <div className={wrapperClassName} style={{ ...circleStyle, ...styles.body }}>
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
