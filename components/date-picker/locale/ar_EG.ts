import CalendarLocale from '@rc-component/picker/locale/ar_EG';

import TimePickerLocale from '../../time-picker/locale/ar_EG';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'اختيار التاريخ',
    yearPlaceholder: 'اختيار السنة',
    quarterPlaceholder: 'اختيار ربع السنة',
    monthPlaceholder: 'اختيار الشهر',
    weekPlaceholder: 'اختيار الأسبوع',
    rangePlaceholder: ['البداية', 'النهاية'],
    rangeYearPlaceholder: ['سنة البداية', 'سنة النهاية'],
    rangeQuarterPlaceholder: ['ربع سنة البداية', 'ربع سنة النهاية'],
    rangeMonthPlaceholder: ['شهر البداية', 'شهر النهاية'],
    rangeWeekPlaceholder: ['أسبوع البداية', 'أسبوع النهاية'],
    yearFormat: 'YYYY',
    monthFormat: 'MMMM',
    monthBeforeYear: true,
    shortWeekDays: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    shortMonths: [
      'يناير',
      'فبراير',
      'مارس',
      'إبريل',
      'مايو',
      'يونيو',
      'يوليو',
      'أغسطس',
      'سبتمبر',
      'أكتوبر',
      'نوفمبر',
      'ديسمبر',
    ],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
