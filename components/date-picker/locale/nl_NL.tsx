import CalendarLocale from 'rc-calendar/lib/locale/nl_NL';
import TimePickerLocale from '../../time-picker/locale/nl_NL';
import assign from 'object-assign';

// Merge into a locale object
const locale = {
  lang: assign({
    placeholder: 'Selecteer datum',
    rangePlaceholder: ['Begin datum', 'Eind datum'],
  }, CalendarLocale),
  timePickerLocale: assign({}, TimePickerLocale),
};

// All settings at:
// https://github.com/ant-design/ant-design/issues/424

export default locale;
