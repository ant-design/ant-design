import * as moment from 'moment';

export function formatDate(
  value: moment.Moment | undefined | null,
  format: string | string[] | ((moment: moment.Moment | undefined) => string),
): string {
  if (!value) {
    return '';
  }
  if (Array.isArray(format)) {
    format = format[0];
  }

  if (typeof format === 'function') {
    format = format(value);
  }

  return value.format(format);
}
