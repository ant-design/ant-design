import CalendarLocale from '@rc-component/picker/locale/is_IS';

import TimePickerLocale from '../../time-picker/locale/is_IS';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Veldu dag',
    yearPlaceholder: 'Veldu ár',
    quarterPlaceholder: 'Veldu fjórðung',
    monthPlaceholder: 'Veldu mánuð',
    weekPlaceholder: 'Veldu viku',
    rangePlaceholder: ['Upphafsdagur', 'Lokadagur'],
    rangeYearPlaceholder: ['Upphafsár', 'Lokaár'],
    rangeQuarterPlaceholder: ['Upphafsfjórðungur', 'Lokafjórðungur'],
    rangeMonthPlaceholder: ['Upphafsmánuður', 'Lokamánuður'],
    rangeWeekPlaceholder: ['Upphafsvika', 'Lokavika'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
