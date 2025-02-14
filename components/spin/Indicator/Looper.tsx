import * as React from 'react';
import classNames from 'classnames';

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
      <span className={classNames(holderClassName, percent > 0 && hideClassName)}>
        <span
          className={classNames(dotClassName, className, `${prefixCls}-dot-spin`)}
          style={style}
        >
          {[1, 2, 3, 4].map((i) => (
            <i className={`${prefixCls}-dot-item`} key={i} />
          ))}
        </span>
      </span>
      <Progress prefixCls={prefixCls} percent={percent} />
    </>
  );
}
