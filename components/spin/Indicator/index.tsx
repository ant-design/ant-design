import * as React from 'react';
import classNames from 'classnames';

import { cloneElement } from '../../_util/reactNode';
import Looper from './Looper';

export interface IndicatorProps {
  prefixCls: string;
  indicator?: React.ReactNode;
  percent?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function Indicator(props: IndicatorProps) {
  const { prefixCls, indicator, percent, className, style } = props;
  const dotClassName = `${prefixCls}-dot`;

  if (indicator && React.isValidElement(indicator)) {
    return cloneElement(indicator, (currentProps) => ({
      className: classNames(currentProps.className, dotClassName, className),
      style: { ...currentProps.style, ...style },
      percent,
    }));
  }

  return <Looper prefixCls={prefixCls} percent={percent} className={className} style={style} />;
}
