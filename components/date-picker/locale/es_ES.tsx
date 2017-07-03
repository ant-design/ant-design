import CalendarLocale from 'rc-calendar/lib/locale/es_ES';
import TimePickerLocale from '../../time-picker/locale/es_ES';

// Merge into a locale object
const locale = {
  lang: {
    placeholder: 'Seleccionar fecha',
    rangePlaceholder: ['Fecha inicial', 'Fecha final'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
