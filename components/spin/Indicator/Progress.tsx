import * as React from 'react';
import classNames from 'classnames';
import useLayoutEffect from 'rc-util/lib/hooks/useLayoutEffect';

export interface ProgressProps {
  prefixCls: string;
  percent: number;
}

export default function Progress({ percent, prefixCls }: ProgressProps) {
  const dotClassName = `${prefixCls}-dot`;
  const holderClassName = `${dotClassName}-holder`;
  const hideClassName = `${holderClassName}-hidden`;

  const [render, setRender] = React.useState(false);

  // ==================== Visible =====================
  useLayoutEffect(() => {
    if (percent !== 0) {
      setRender(true);
    }
  }, [percent !== 0]);

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
  if (!render) {
    return null;
  }

  return (
    <span
      className={classNames(
        holderClassName,
        `${dotClassName}-progress`,
        safePtg <= 0 && hideClassName,
      )}
    >
      <svg
        viewBox={`0 0 ${viewSize} ${viewSize}`}
        // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: progressbar could be readonly
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safePtg}
      >
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
