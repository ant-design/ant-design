import * as React from 'react';

import { isFunction, isNumber } from '../_util/is';
import type { FormatConfig, valueType } from './utils';

/**
 * Expand exponential notation (e.g. `1e-7`, `1.5e+21`) into plain decimal digits,
 * since `String(number)` uses it for very small or very large numbers.
 */
function toPlainString(val: string) {
  const cells = val.match(/^(-?)(\d+)(?:\.(\d+))?e([+-]?\d+)$/i);
  if (!cells) {
    return val;
  }
  const [, negative, int, decimal = '', exponent] = cells;
  const digits = `${int}${decimal}`;
  const pointIndex = int.length + Number(exponent);

  let plain: string;
  if (pointIndex <= 0) {
    plain = `0.${'0'.repeat(-pointIndex)}${digits}`;
  } else if (pointIndex >= digits.length) {
    plain = digits.padEnd(pointIndex, '0');
  } else {
    plain = `${digits.slice(0, pointIndex)}.${digits.slice(pointIndex)}`;
  }

  return `${negative}${plain}`;
}

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
    const val = toPlainString(String(value));
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
