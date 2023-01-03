import classNames from 'classnames';
import * as React from 'react';

import type { ConfigConsumerProps } from '../config-provider';
import { withConfigConsumer } from '../config-provider/context';
import Skeleton from '../skeleton';
import type Countdown from './Countdown';
import StatisticNumber from './Number';
import type { FormatConfig, valueType } from './utils';

type CompoundedComponent = {
  Countdown: typeof Countdown;
};

export interface StatisticProps extends FormatConfig {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  value?: valueType;
  valueStyle?: React.CSSProperties;
  valueRender?: (node: React.ReactNode) => React.ReactNode;
  title?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  loading?: boolean;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

const Statistic: React.FC<StatisticProps & ConfigConsumerProps> = props => {
  const {
    prefixCls,
    className,
    style,
    valueStyle,
    value = 0,
    title,
    valueRender,
    prefix,
    suffix,
    loading = false,
    direction,
    onMouseEnter,
    onMouseLeave,
    decimalSeparator = '.',
    groupSeparator = ',',
  } = props;
  const valueNode = (
    <StatisticNumber
      decimalSeparator={decimalSeparator}
      groupSeparator={groupSeparator}
      {...props}
      value={value}
    />
  );
  const cls = classNames(
    prefixCls,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
  );
  return (
    <div className={cls} style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {title && <div className={`${prefixCls}-title`}>{title}</div>}
      <Skeleton paragraph={false} loading={loading} className={`${prefixCls}-skeleton`}>
        <div style={valueStyle} className={`${prefixCls}-content`}>
          {prefix && <span className={`${prefixCls}-content-prefix`}>{prefix}</span>}
          {valueRender ? valueRender(valueNode) : valueNode}
          {suffix && <span className={`${prefixCls}-content-suffix`}>{suffix}</span>}
        </div>
      </Skeleton>
    </div>
  );
};

const WrapperStatistic = withConfigConsumer<StatisticProps>({
  prefixCls: 'statistic',
})<CompoundedComponent>(Statistic);

export default WrapperStatistic;
