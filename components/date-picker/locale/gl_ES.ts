import CalendarLocale from '@rc-component/picker/locale/gl_ES';

import TimePickerLocale from '../../time-picker/locale/gl_ES';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Escolla data',
    yearPlaceholder: 'Escolla ano',
    quarterPlaceholder: 'Escolla trimestre',
    monthPlaceholder: 'Escolla mes',
    weekPlaceholder: 'Escolla semana',
    rangePlaceholder: ['Data inicial', 'Data final'],
    rangeYearPlaceholder: ['Ano inicial', 'Ano final'],
    rangeQuarterPlaceholder: ['Trimestre inicial', 'Trimestre final'],
    rangeMonthPlaceholder: ['Mes inicial', 'Mes final'],
    rangeWeekPlaceholder: ['Semana inicial', 'Semana final'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
