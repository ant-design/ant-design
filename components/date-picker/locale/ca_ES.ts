import CalendarLocale from '@rc-component/picker/locale/ca_ES';

import TimePickerLocale from '../../time-picker/locale/ca_ES';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Seleccionar data',
    yearPlaceholder: 'Seleccionar any',
    quarterPlaceholder: 'Seleccionar trimestre',
    monthPlaceholder: 'Seleccionar mes',
    weekPlaceholder: 'Seleccionar setmana',
    rangePlaceholder: ['Data inicial', 'Data final'],
    rangeYearPlaceholder: ['Any inicial', 'Any final'],
    rangeQuarterPlaceholder: ['Trimestre inicial', 'Trimestre final'],
    rangeMonthPlaceholder: ['Mes inicial', 'Mes final'],
    rangeWeekPlaceholder: ['Setmana inicial', 'Setmana final'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
