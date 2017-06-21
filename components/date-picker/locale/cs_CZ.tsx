import CalendarLocale from 'rc-calendar/lib/locale/cs_CZ';
import TimePickerLocale from '../../time-picker/locale/cs_CZ';
import assign from 'object-assign';

// Merge into a locale object
const locale = {
  lang: assign({
    placeholder: 'Vybrat datum',
    rangePlaceholder: ['Od', 'Do'],
  }, CalendarLocale),
  timePickerLocale: assign({}, TimePickerLocale),
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
