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
          <i className={`${prefixCls}-dot-item`} key={1} />
          <i className={`${prefixCls}-dot-item`} key={2} />
          <i className={`${prefixCls}-dot-item`} key={3} />
          <i className={`${prefixCls}-dot-item`} key={4} />
        </span>
      </span>
      <Progress prefixCls={prefixCls} percent={percent} />
    </>
  );
}
