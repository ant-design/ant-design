import * as React from 'react';
import classNames from 'classnames';

export interface ProgressProps {
  prefixCls: string;
  percent?: number;
}

export default function Progress({ percent = 0, prefixCls }: ProgressProps) {
  const dotClassName = `${prefixCls}-dot`;
  const holderClassName = `${dotClassName}-holder`;
  const hideClassName = `${holderClassName}-hidden`;

  // ==================== Progress ====================
  const safePtg = Math.max(Math.min(percent, 100), 0);

  const viewSize = 100;
  const borderWidth = viewSize / 5;
  const radius = viewSize / 2 - borderWidth / 2;
  const circumference = radius * 2 * Math.PI;

  const renderCircle = (circleClassName?: string, style?: React.CSSProperties) => (
    <circle
      className={classNames(circleClassName, `${dotClassName}-circle`)}
      r={radius}
      cx="50"
      cy="50"
      strokeWidth={borderWidth}
      style={style}
    />
  );

  // ===================== Render =====================
  return (
    <span
      className={classNames(
        holderClassName,
        `${holderClassName}-fixed`,
        safePtg <= 0 && hideClassName,
      )}
    >
      <svg viewBox={`0 0 ${viewSize} ${viewSize}`}>
        {renderCircle(`${dotClassName}-circle-bg`)}
        {renderCircle('', {
          strokeDasharray: `${(circumference * safePtg) / 100} ${
            (circumference * (100 - safePtg)) / 100
          }`,
          strokeDashoffset: `${circumference / 4}`,
        })}
      </svg>
    </span>
  );
}
