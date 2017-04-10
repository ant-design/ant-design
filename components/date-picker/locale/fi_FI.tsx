import CalendarLocale from 'rc-calendar/lib/locale/fi_FI';
import TimePickerLocale from '../../time-picker/locale/fi_FI';
import assign from 'object-assign';

// Merge into a locale object
const locale = {
  lang: assign({
    placeholder: 'Valitse päivä',
    rangePlaceholder: ['Alku päivä', 'Loppu päivä'],
  }, CalendarLocale),
  timePickerLocale: assign({}, TimePickerLocale),
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
