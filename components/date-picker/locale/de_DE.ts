import CalendarLocale from '@rc-component/picker/locale/de_DE';

import TimePickerLocale from '../../time-picker/locale/de_DE';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Datum auswählen',
    yearPlaceholder: 'Jahr auswählen',
    quarterPlaceholder: 'Quartal auswählen',
    monthPlaceholder: 'Monat auswählen',
    weekPlaceholder: 'Woche auswählen',
    rangePlaceholder: ['Startdatum', 'Enddatum'],
    rangeYearPlaceholder: ['Startjahr', 'Endjahr'],
    rangeQuarterPlaceholder: ['Startquartal', 'Endquartal'],
    rangeMonthPlaceholder: ['Startmonat', 'Endmonat'],
    rangeWeekPlaceholder: ['Startwoche', 'Endwoche'],
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
    fieldDateFormat: 'DD.MM.YYYY',
    fieldDateTimeFormat: 'DD.MM.YYYY HH:mm:ss',
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/issues/424

export default locale;
