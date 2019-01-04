import * as moment from 'moment';
import padEnd from 'lodash/padEnd';
import padStart from 'lodash/padStart';

export type valueType = number | string | moment.Moment;

export type Formatter = false | 'number' | 'countdown' | ((value: valueType) => string);

export interface FormatConfig {
  formatter?: Formatter;
  decimalSeparator?: string;
  precision?: number;
}

// We trade number as string to avoid precision issue
function formatNumber(value: valueType, config: FormatConfig) {
  const { decimalSeparator = '.', precision } = config;

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

function padTime(str: number) {
  return padStart(str, 2, '0');
}

function formatCountdown(value: valueType, config: FormatConfig) {
  const target = moment(value).valueOf();
  const current = moment().valueOf();
  const diff = Math.max(target - current, 0);
  const duration = moment.duration(diff, 'milliseconds');

  return `${padTime(duration.hours())}:${padTime(duration.minutes())}:${padTime(duration.seconds())}`;
}

export function formatValue(value: valueType, config: FormatConfig) {
  const { formatter = 'number' } = config;

  // Customize formatter
  if (typeof formatter === 'function') {
    return formatter(value);
  }

  switch (formatter) {
    case 'countdown':
      return formatCountdown(value, config);
    default:
      return formatNumber(value, config);
  }
}