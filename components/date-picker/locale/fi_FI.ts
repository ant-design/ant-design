import CalendarLocale from '@rc-component/picker/locale/fi_FI';

import TimePickerLocale from '../../time-picker/locale/fi_FI';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Valitse päivä',
    yearPlaceholder: 'Valitse vuosi',
    quarterPlaceholder: 'Valitse vuosineljännes',
    monthPlaceholder: 'Valitse kuukausi',
    weekPlaceholder: 'Valitse viikko',
    rangePlaceholder: ['Alkamispäivä', 'Päättymispäivä'],
    rangeYearPlaceholder: ['Alkamisvuosi', 'Päättymisvuosi'],
    rangeQuarterPlaceholder: ['Alkamisvuosineljännes', 'Päättymisvuosineljännes'],
    rangeMonthPlaceholder: ['Alkamiskuukausi', 'Päättymiskuukausi'],
    rangeWeekPlaceholder: ['Alkamisviikko', 'Päättymisviikko'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
