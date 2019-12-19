import * as React from 'react';
import classNames from 'classnames';

import { ConfigConsumerProps } from '../config-provider';
import { withConfigConsumer } from '../config-provider/context';
import StatisticNumber from './Number';
import Countdown from './Countdown';
import { valueType, FormatConfig } from './utils';

interface StatisticComponent {
  Countdown: typeof Countdown;
}

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
}

const Statistic: React.SFC<StatisticProps & ConfigConsumerProps> = props => {
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
  } = props;

  let valueNode: React.ReactNode = <StatisticNumber {...props} value={value} />;

  if (valueRender) {
    valueNode = valueRender(valueNode);
  }

  return (
    <div className={classNames(prefixCls, className)} style={style}>
      {title && <div className={`${prefixCls}-title`}>{title}</div>}
      <div style={valueStyle} className={`${prefixCls}-content`}>
        {prefix && <span className={`${prefixCls}-content-prefix`}>{prefix}</span>}
        {valueNode}
        {suffix && <span className={`${prefixCls}-content-suffix`}>{suffix}</span>}
      </div>
    </div>
  );
};

Statistic.defaultProps = {
  decimalSeparator: '.',
  groupSeparator: ',',
};

const WrapperStatistic = withConfigConsumer<StatisticProps>({
  prefixCls: 'statistic',
})<StatisticComponent>(Statistic);

export default WrapperStatistic;
