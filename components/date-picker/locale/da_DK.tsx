import CalendarLocale from 'rc-picker/lib/locale/da_DK';
import TimePickerLocale from '../../time-picker/locale/da_DK';

// Merge into a locale object
const locale = {
  lang: {
    placeholder: 'Vælg dato',
    rangePlaceholder: ['Startdato', 'Slutdato'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
