import CalendarLocale from 'rc-calendar/lib/locale/sv_SE';
import TimePickerLocale from '../../time-picker/locale/sv_SE';
import assign from 'object-assign';

const locale = {
  lang: assign({
    placeholder: 'Välj datum',
    rangePlaceholder: ['Startdatum', 'Slutdatum'],
  }, CalendarLocale),
  timePickerLocale: assign({}, TimePickerLocale),
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
