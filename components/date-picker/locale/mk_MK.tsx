import CalendarLocale from 'rc-picker/lib/locale/mk_MK';
import TimePickerLocale from '../../time-picker/locale/mk_MK';

// Merge into a locale object
const locale = {
  lang: {
    placeholder: 'Избери датум',
    rangePlaceholder: ['Од датум', 'До датум'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
