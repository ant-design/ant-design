import * as React from 'react';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';

import { withConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Countdown from './Countdown';
import { valueType, FormatConfig, formatValue } from './utils';

interface StatisticComponent {
  Countdown: typeof Countdown;
}

export interface StatisticProps extends FormatConfig {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  value?: valueType;
  valueStyle?: React.CSSProperties;
  title?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

interface StatisticState {}

class Statistic extends React.Component<StatisticProps & ConfigConsumerProps, StatisticState> {
  getValue() {
    const { value = 0 } = this.props;
    return formatValue(value, this.props);
  }

  render() {
    const { prefixCls, className, style, valueStyle, title, prefix, suffix } = this.props;
    return (
      <div className={classNames(prefixCls, className)} style={style}>
        <div aria-hidden="true" className={`${prefixCls}-title`}>
          {title}
        </div>
        <div aria-label={typeof title === 'string' ? title : ''} className={`${prefixCls}-content`}>
          {prefix && <span className={`${prefixCls}-content-prefix`}>{prefix}</span>}
          <span style={valueStyle} className={`${prefixCls}-content-value`}>
            {this.getValue()}
          </span>
          {suffix && <span className={`${prefixCls}-content-suffix`}>{suffix}</span>}
        </div>
      </div>
    );
  }
}

polyfill(Statistic);

const WrapperStatistic = withConfigConsumer<StatisticProps>({
  prefixCls: 'statistic',
})<StatisticComponent>(Statistic);

export default WrapperStatistic;
