import * as React from 'react';
import classNames from 'classnames';

import Progress from './Progress';

export interface IndicatorProps {
  prefixCls: string;
  percent?: number;
}

export default function Looper(props: IndicatorProps) {
  const { prefixCls, percent = 0 } = props;
  const dotClassName = `${prefixCls}-dot`;
  const holderClassName = `${dotClassName}-holder`;
  const hideClassName = `${holderClassName}-hidden`;

  // ===================== Render =====================
  return (
    <>
      <span className={classNames(holderClassName, percent > 0 && hideClassName)}>
        <span className={classNames(dotClassName, `${prefixCls}-dot-spin`)}>
          {[1, 2, 3, 4].map((i) => (
            <i className={`${prefixCls}-dot-item`} key={i} />
          ))}
        </span>
      </span>
      <Progress prefixCls={prefixCls} percent={percent} />
    </>
  );
}
