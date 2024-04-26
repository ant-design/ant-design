import * as React from 'react';
import classNames from 'classnames';

import { cloneElement } from '../../_util/reactNode';
import Looper from './Looper';

export interface IndicatorProps {
  prefixCls: string;
  indicator?: React.ReactNode;
  percent?: number;
}

export default function Indicator(props: IndicatorProps) {
  const { prefixCls, indicator, percent } = props;
  const dotClassName = `${prefixCls}-dot`;

  // should not be render default indicator when indicator value is null
  if (indicator === null) {
    return null;
  }

  if (indicator && React.isValidElement(indicator)) {
    return cloneElement(indicator, {
      className: classNames(indicator.props.className, dotClassName),
    });
  }

  return <Looper prefixCls={prefixCls} percent={percent} />;
}
