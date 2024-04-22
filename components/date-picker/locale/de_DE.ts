import CalendarLocale from 'rc-picker/lib/locale/de_DE';

import TimePickerLocale from '../../time-picker/locale/de_DE';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Datum auswählen',
    rangePlaceholder: ['Startdatum', 'Enddatum'],
    yearFormat: 'YYYY',
    dateFormat: 'DD.MM.YYYY',
    dayFormat: 'D',
    dateTimeFormat: 'DD.MM.YYYY HH:mm:ss',
    monthFormat: 'MMMM',
    monthBeforeYear: true,
    shortWeekDays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    shortMonths: [
      'Jan',
      'Feb',
      'Mär',
      'Apr',
      'Mai',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Okt',
      'Nov',
      'Dez',
    ],
    ...CalendarLocale,
  },
  timePickerLocale: {
    placeholder: 'Zeit wählen',
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/issues/424

export default locale;
