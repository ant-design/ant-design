import CalendarLocale from 'rc-calendar/lib/locale/en_US';
import TimePickerLocale from '../../time-picker/locale/en_US';
import assign from 'object-assign';

// Merge into a locale object
const locale = {
  lang: assign({
    placeholder: 'Wybierz datę',
    rangePlaceholder: ['Data początkowa', 'Data końcowa'],
  }, CalendarLocale),
  timePickerLocale: assign({}, TimePickerLocale),
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
