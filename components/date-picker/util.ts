import { PickerMode } from 'rc-picker/lib/interface';

export function getPlaceholder(picker: PickerMode | undefined, locale: any): string {
  if (picker === 'year' && locale.lang.yearPlaceholder) {
    return locale.lang.yearPlaceholder;
  }
  if (picker === 'month' && locale.lang.monthPlaceholder) {
    return locale.lang.monthPlaceholder;
  }
  if (picker === 'week' && locale.lang.weekPlaceholder) {
    return locale.lang.weekPlaceholder;
  }
  if (picker === 'time' && locale.timePickerLocale.placeholder) {
    return locale!.timePickerLocale.placeholder;
  }
  return locale.lang.placeholder;
}

export function getRangePlaceholder(picker: PickerMode | undefined, locale: any): [string, string] {
  if (picker === 'year' && locale.lang.yearPlaceholder) {
    return locale.lang.rangeYearPlaceholder;
  }
  if (picker === 'month' && locale.lang.monthPlaceholder) {
    return locale.lang.rangeMonthPlaceholder;
  }
  if (picker === 'week' && locale.lang.weekPlaceholder) {
    return locale.lang.rangeWeekPlaceholder;
  }
  if (picker === 'time' && locale.timePickerLocale.placeholder) {
    return locale!.timePickerLocale.rangePlaceholder;
  }
  return locale.lang.rangePlaceholder;
}
