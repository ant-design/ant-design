import CalendarLocale from '@rc-component/picker/locale/da_DK';

import TimePickerLocale from '../../time-picker/locale/da_DK';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Vælg dato',
    yearPlaceholder: 'Vælg år',
    quarterPlaceholder: 'Vælg kvartal',
    monthPlaceholder: 'Vælg måned',
    weekPlaceholder: 'Vælg uge',
    rangePlaceholder: ['Startdato', 'Slutdato'],
    rangeYearPlaceholder: ['Startår', 'Slutår'],
    rangeQuarterPlaceholder: ['Startkvartal', 'Slutkvartal'],
    rangeMonthPlaceholder: ['Startmåned', 'Slutmåned'],
    rangeWeekPlaceholder: ['Startuge', 'Slutuge'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
