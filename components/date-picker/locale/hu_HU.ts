import CalendarLocale from '@rc-component/picker/locale/hu_HU';

import TimePickerLocale from '../../time-picker/locale/hu_HU';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Válasszon dátumot',
    yearPlaceholder: 'Válasszon évet',
    quarterPlaceholder: 'Válasszon negyedévet',
    monthPlaceholder: 'Válasszon hónapot',
    weekPlaceholder: 'Válasszon hetet',
    rangePlaceholder: ['Kezdő dátum', 'Befejezés dátuma'],
    rangeYearPlaceholder: ['Kezdő év', 'Befejező év'],
    rangeQuarterPlaceholder: ['Kezdő negyedév', 'Befejező negyedév'],
    rangeMonthPlaceholder: ['Kezdő hónap', 'Befejező hónap'],
    rangeWeekPlaceholder: ['Kezdő hét', 'Befejező hét'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
