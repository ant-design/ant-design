import * as React from 'react';
import classNames from 'classnames';

export interface IndicatorProps {
  prefixCls: string;
  percent?: number;
}

export default function Looper(props: IndicatorProps) {
  const { prefixCls, percent = 0 } = props;
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

  const progressNode = (
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

  // ===================== Render =====================
  return (
    <>
      <span className={classNames(holderClassName, safePtg > 0 && hideClassName)}>
        <span className={classNames(dotClassName, `${prefixCls}-dot-spin`)}>
          <i className={`${prefixCls}-dot-item`} key={1} />
          <i className={`${prefixCls}-dot-item`} key={2} />
          <i className={`${prefixCls}-dot-item`} key={3} />
          <i className={`${prefixCls}-dot-item`} key={4} />
        </span>
      </span>
      {progressNode}
    </>
  );
}
