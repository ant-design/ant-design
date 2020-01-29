import * as moment from 'moment';

// eslint-disable-next-line import/prefer-default-export
export function formatDate(
  value: moment.Moment | undefined | null,
  format: string | string[] | undefined,
): string {
  if (!value) {
    return '';
  }
  if (Array.isArray(format)) {
    format = format[0];
  }
  return value.format(format);
}
