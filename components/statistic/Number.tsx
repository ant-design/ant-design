import * as React from 'react';
import padEnd from 'lodash/padEnd';
import { valueType, FormatConfig } from './utils';

interface NumberProps extends FormatConfig {
  value: valueType;
}

const StatisticNumber: React.SFC<NumberProps> = props => {
  const { value, formatter, precision, decimalSeparator, groupSeparator = '', prefixCls } = props;

  let valueNode: React.ReactNode;

  if (typeof formatter === 'function') {
    // Customize formatter
    valueNode = formatter(value);
  } else {
    // Internal formatter
    const val: string = String(value);
    const cells = val.match(/^(\d*)(\.(\d+))?$/);

    // Process if illegal number
    if (!cells) {
      valueNode = val;
    } else {
      let int = cells[1] || '0';
      let decimal = cells[3] || '';

      int = int.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);

      if (typeof precision === 'number') {
        decimal = padEnd(decimal, precision, '0').slice(0, precision);
      }

      if (decimal) {
        decimal = `${decimalSeparator}${decimal}`;
      }

      valueNode = [
        <span key="int" className={`${prefixCls}-content-value-int`}>
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

  return <span className={`${prefixCls}-content-value`}>{valueNode}</span>;
};

export default StatisticNumber;
