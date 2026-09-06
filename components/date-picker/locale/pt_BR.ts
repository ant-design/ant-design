import CalendarLocale from '@rc-component/picker/locale/pt_BR';

import TimePickerLocale from '../../time-picker/locale/pt_BR';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Selecionar data',
    yearPlaceholder: 'Selecionar ano',
    quarterPlaceholder: 'Selecionar trimestre',
    monthPlaceholder: 'Selecionar mês',
    weekPlaceholder: 'Selecionar semana',
    rangePlaceholder: ['Data inicial', 'Data final'],
    rangeYearPlaceholder: ['Ano inicial', 'Ano final'],
    rangeQuarterPlaceholder: ['Trimestre inicial', 'Trimestre final'],
    rangeMonthPlaceholder: ['Mês inicial', 'Mês final'],
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
