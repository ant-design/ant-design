import CalendarLocale from '@rc-component/picker/locale/he_IL';

import TimePickerLocale from '../../time-picker/locale/he_IL';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'בחר תאריך',
    yearPlaceholder: 'בחר שנה',
    quarterPlaceholder: 'בחר רבעון',
    monthPlaceholder: 'בחר חודש',
    weekPlaceholder: 'בחר שבוע',
    rangePlaceholder: ['תאריך התחלה', 'תאריך סיום'],
    rangeYearPlaceholder: ['שנת התחלה', 'שנת סיום'],
    rangeQuarterPlaceholder: ['רבעון התחלה', 'רבעון סיום'],
    rangeMonthPlaceholder: ['חודש התחלה', 'חודש סיום'],
    rangeWeekPlaceholder: ['שבוע התחלה', 'שבוע סיום'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
