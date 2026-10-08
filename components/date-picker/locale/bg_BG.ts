import CalendarLocale from '@rc-component/picker/locale/bg_BG';

import TimePickerLocale from '../../time-picker/locale/bg_BG';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Избор на дата',
    yearPlaceholder: 'Избор на година',
    quarterPlaceholder: 'Избор на тримесечие',
    monthPlaceholder: 'Избор на месец',
    weekPlaceholder: 'Избор на седмица',
    rangePlaceholder: ['Начална', 'Крайна'],
    rangeYearPlaceholder: ['Начална година', 'Крайна година'],
    rangeQuarterPlaceholder: ['Начално тримесечие', 'Крайно тримесечие'],
    rangeMonthPlaceholder: ['Начален месец', 'Краен месец'],
    rangeWeekPlaceholder: ['Начална седмица', 'Крайна седмица'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
