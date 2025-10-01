import * as React from 'react';
import { clsx } from 'clsx';

import Progress from './Progress';

export interface IndicatorProps {
  prefixCls: string;
  percent?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function Looper(props: IndicatorProps) {
  const { prefixCls, percent = 0, className, style } = props;
  const dotClassName = `${prefixCls}-dot`;
  const holderClassName = `${dotClassName}-holder`;
  const hideClassName = `${holderClassName}-hidden`;

  // ===================== Render =====================
  return (
    <>
      <span
        className={clsx(holderClassName, className, percent > 0 && hideClassName)}
        style={style}
      >
        <span className={clsx(dotClassName, `${prefixCls}-dot-spin`)}>
          {[1, 2, 3, 4].map((i) => (
            <i className={`${prefixCls}-dot-item`} key={i} />
          ))}
        </span>
      </span>
      <Progress prefixCls={prefixCls} percent={percent} />
    </>
  );
}
