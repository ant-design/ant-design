import CalendarLocale from '@rc-component/picker/locale/pl_PL';

import TimePickerLocale from '../../time-picker/locale/pl_PL';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Wybierz datę',
    yearPlaceholder: 'Wybierz rok',
    quarterPlaceholder: 'Wybierz kwartał',
    monthPlaceholder: 'Wybierz miesiąc',
    weekPlaceholder: 'Wybierz tydzień',
    rangePlaceholder: ['Data początkowa', 'Data końcowa'],
    rangeYearPlaceholder: ['Rok początkowy', 'Rok końcowy'],
    rangeQuarterPlaceholder: ['Kwartał początkowy', 'Kwartał końcowy'],
    rangeMonthPlaceholder: ['Miesiąc początkowy', 'Miesiąc końcowy'],
    rangeWeekPlaceholder: ['Tydzień początkowy', 'Tydzień końcowy'],
    yearFormat: 'YYYY',
    monthFormat: 'MMMM',
    monthBeforeYear: true,
    shortWeekDays: ['Niedz', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'],
    shortMonths: [
      'Sty',
      'Lut',
      'Mar',
      'Kwi',
      'Maj',
      'Cze',
      'Lip',
      'Sie',
      'Wrz',
      'Paź',
      'Lis',
      'Gru',
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
