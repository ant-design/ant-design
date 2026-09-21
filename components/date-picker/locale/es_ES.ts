import CalendarLocale from '@rc-component/picker/locale/es_ES';

import TimePickerLocale from '../../time-picker/locale/es_ES';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Seleccionar fecha',
    yearPlaceholder: 'Seleccionar año',
    quarterPlaceholder: 'Seleccionar trimestre',
    monthPlaceholder: 'Seleccionar mes',
    weekPlaceholder: 'Seleccionar semana',
    rangePlaceholder: ['Fecha inicial', 'Fecha final'],
    rangeYearPlaceholder: ['Año inicial', 'Año final'],
    rangeQuarterPlaceholder: ['Trimestre inicial', 'Trimestre final'],
    rangeMonthPlaceholder: ['Mes inicial', 'Mes final'],
    rangeWeekPlaceholder: ['Semana inicial', 'Semana final'],
    shortWeekDays: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    shortMonths: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
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
