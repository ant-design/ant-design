import CalendarLocale from 'rc-calendar/lib/locale/sk_SK';
import TimePickerLocale from '../../time-picker/locale/sk_SK';
import assign from 'object-assign';

// 统一合并为完整的 Locale
const locale = {
  lang: assign({
    placeholder: 'Vybrať dátum',
    rangePlaceholder: ['Od', 'Do'],
  }, CalendarLocale),
  timePickerLocale: assign({}, TimePickerLocale),
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
