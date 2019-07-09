import CalendarLocale from 'rc-calendar/lib/locale/ms_MY';
import TimePickerLocale from '../../time-picker/locale/ms_MY';

// Merge into a locale object
const locale = {
  lang: {
    placeholder: 'Pilih tarikh',
    rangePlaceholder: ['Tarikh mula', 'Tarikh akhir'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
