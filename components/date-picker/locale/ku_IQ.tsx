import CalendarLocale from 'rc-calendar/lib/locale/ku_IQ';
import TimePickerLocale from '../../time-picker/locale/ku_IQ';

// Merge into a locale object
const locale = {
  lang: {
    placeholder: 'Dîrok hilbijêre',
    rangePlaceholder: ['Dîroka destpêkê', 'Dîroka dawîn'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json
export default locale;
