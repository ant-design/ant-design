import * as React from 'react';
import classNames from 'classnames';
import padEnd from 'lodash/padEnd';
import { withConfigConsumer, ConfigConsumerProps } from '../config-provider';

type Formatter = false | 'number' | ((value: number | string) => string);

interface FormatConfig {
  formatter?: Formatter;
  decimalSeparator?: string;
  precision?: number;
}

export type NumberProps = {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  value?: number | string;
  title?: string;
  unit?: string;
} & FormatConfig;

interface NumberState {}

// We trade number as string to avoid precision issue
export function formatValue(value: number | string, config: FormatConfig) {
  const { formatter = 'number', decimalSeparator = '.', precision } = config;

  // Customize formatter
  if (typeof formatter === 'function') {
    return formatter(value);
  }

  const val: string = String(value);
  const cells = val.match(/^(\d*)(\.(\d+))?$/);
  if (!cells) return value;

  let int = cells[1] || '0';
  let decimal = cells[3] || '';

  int = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (typeof precision === 'number') {
    decimal = padEnd(decimal, precision, '0').slice(0, precision);
  }

  if (decimal) {
    decimal = `${decimalSeparator}${decimal}`;
  }

  return `${int}${decimal}`;
}

class Number extends React.Component<NumberProps & ConfigConsumerProps, NumberState> {
  getValue() {
    const { value = 0 } = this.props;
    return formatValue(value, this.props);
  }

  render() {
    const { prefixCls, className, style, title, unit } = this.props;
    return (
      <div className={classNames(prefixCls, className)} style={style}>
        <div aria-hidden="true" className={`${prefixCls}-title`}>
          {title}
        </div>
        <div aria-label={title} className={`${prefixCls}-value`}>
          {this.getValue()}
          {unit && <span className={`${prefixCls}-value-unit`}>{unit}</span>}
        </div>
      </div>
    );
  }
}

export default withConfigConsumer<NumberProps>({
  prefixCls: 'number',
})(Number);
