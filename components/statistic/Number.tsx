import * as React from 'react';

import { isFunction, isNumber } from '../_util/is';
import type { FormatConfig, valueType } from './utils';

// `String(number)` uses exponential notation for very small or very large numbers.
const plainNumberFormat = new Intl.NumberFormat('en-US', {
  notation: 'standard',
  useGrouping: false,
  maximumSignificantDigits: 21,
});

interface NumberProps extends FormatConfig {
  value: valueType;
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
}

const StatisticNumber: React.FC<NumberProps> = (props) => {
  const {
    value,
    formatter,
    precision,
    decimalSeparator,
    groupSeparator = '',
    prefixCls,
    className,
    style,
  } = props;

  let valueNode: React.ReactNode;

  if (isFunction(formatter)) {
    // Customize formatter
    valueNode = formatter(value);
  } else {
    // Internal formatter
    const rawValue = String(value);
    const val =
      isNumber(value) && rawValue.includes('e') ? plainNumberFormat.format(value) : rawValue;
    const cells = val.match(/^(-?)(\d*)(\.(\d+))?$/);

    // Process if illegal number
    if (!cells || val === '-') {
      valueNode = val;
    } else {
      const negative = cells[1];
      let int = cells[2] || '0';
      let decimal = cells[4] || '';

      int = int.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);

      if (isNumber(precision)) {
        decimal = decimal.padEnd(precision, '0').slice(0, precision > 0 ? precision : 0);
      }

      if (decimal) {
        decimal = `${decimalSeparator}${decimal}`;
      }

      valueNode = [
        <span key="int" className={`${prefixCls}-content-value-int`}>
          {negative}
          {int}
        </span>,
        decimal && (
          <span key="decimal" className={`${prefixCls}-content-value-decimal`}>
            {decimal}
          </span>
        ),
      ];
    }
  }

  return (
    <span className={className} style={style}>
      {valueNode}
    </span>
  );
};

if (process.env.NODE_ENV !== 'production') {
  StatisticNumber.displayName = 'StatisticNumber';
}

export default StatisticNumber;
