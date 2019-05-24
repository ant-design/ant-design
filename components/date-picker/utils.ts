import * as moment from 'moment';

export function formatDate(
  value: moment.Moment | undefined | null,
  format: string | string[],
): string {
  if (!value) {
    return '';
  }
  if (Array.isArray(format)) {
    format = format[0];
  }
  return value.format(format);
}
