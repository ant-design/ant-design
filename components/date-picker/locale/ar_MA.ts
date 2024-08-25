import CalendarLocale from 'rc-picker/lib/locale/ar_EG';

import TimePickerLocale from '../../time-picker/locale/ar_MA';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'حدد التاريخ',
    yearPlaceholder: 'حدد السنة',
    quarterPlaceholder: 'حدد الربع',
    monthPlaceholder: 'حدد الشهر',
    weekPlaceholder: 'حدد الأسبوع',
    rangePlaceholder: ['تاريخ البدء', 'تاريخ الانتهاء'],
    rangeYearPlaceholder: ['بداية العام', 'نهاية العام'],
    rangeQuarterPlaceholder: ['بداية الربع', 'نهاية الربع'],
    rangeMonthPlaceholder: ['بداية الشهر', 'نهاية الشهر'],
    rangeWeekPlaceholder: ['بداية الأسبوع', 'نهاية الأسبوع'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
