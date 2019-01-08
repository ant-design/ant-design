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
  valueRender?: (node: React.ReactNode) => React.ReactNode;
  title?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

interface StatisticState {}

function getAriaTitle(entity: any): string {
  const type = typeof entity;
  if (type === 'string' || type === 'number') {
    return entity;
  }
  return '';
}

class Statistic extends React.Component<StatisticProps & ConfigConsumerProps, StatisticState> {
  getValue() {
    const { value = 0 } = this.props;
    return formatValue(value, this.props);
  }

  render() {
    const {
      prefixCls,
      className,
      style,
      valueStyle,
      title,
      value,
      valueRender,
      prefix,
      suffix,
    } = this.props;

    let valueNode: React.ReactNode = (
      <span title={getAriaTitle(value)} style={valueStyle} className={`${prefixCls}-content-value`}>
        {this.getValue()}
      </span>
    );

    if (valueRender) {
      valueNode = valueRender(valueNode);
    }

    return (
      <div className={classNames(prefixCls, className)} style={style}>
        {title && (
          <div aria-hidden="true" className={`${prefixCls}-title`}>
            {title}
          </div>
        )}
        <div aria-label={getAriaTitle(title)} className={`${prefixCls}-content`} tabIndex={-1}>
          {prefix && <span className={`${prefixCls}-content-prefix`}>{prefix}</span>}
          {valueNode}
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
