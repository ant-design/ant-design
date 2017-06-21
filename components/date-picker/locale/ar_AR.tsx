import CalendarLocale from 'rc-calendar/lib/locale/ar_AR';
import TimePickerLocale from '../../time-picker/locale/ar_AR';
import assign from 'object-assign';

// Merge into a locale object
const locale = {
  lang: assign({
    placeholder: 'اختيار التاريخ',
    rangePlaceholder: ['بداية التاريخ', 'نهاية التاريخ'],
  }, CalendarLocale),
  timePickerLocale: assign({}, TimePickerLocale),
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
