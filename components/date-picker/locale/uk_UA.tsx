import CalendarLocale from 'rc-picker/lib/locale/uk_UA';
import TimePickerLocale from '../../time-picker/locale/uk_UA';

const locale = {
  lang: {
    placeholder: 'Оберіть дату',
    rangePlaceholder: ['Початкова дата', 'Кінцева дата'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
