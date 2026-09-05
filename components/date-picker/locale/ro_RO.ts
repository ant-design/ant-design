import CalendarLocale from '@rc-component/picker/locale/ro_RO';

import TimePickerLocale from '../../time-picker/locale/ro_RO';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Selectează data',
    yearPlaceholder: 'Selectează anul',
    quarterPlaceholder: 'Selectează trimestrul',
    monthPlaceholder: 'Selectează luna',
    weekPlaceholder: 'Selectează săptămâna',
    rangePlaceholder: ['Data start', 'Data sfârșit'],
    rangeYearPlaceholder: ['An start', 'An sfârșit'],
    rangeQuarterPlaceholder: ['Trimestru start', 'Trimestru sfârșit'],
    rangeMonthPlaceholder: ['Lună start', 'Lună sfârșit'],
    rangeWeekPlaceholder: ['Săptămână start', 'Săptămână sfârșit'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
