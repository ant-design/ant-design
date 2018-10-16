import CalendarLocale from 'rc-calendar/lib/locale/tr_TR';
import TimePickerLocale from '../../time-picker/locale/tr_TR';

// Merge into a locale object
const locale = {
  lang: {
    placeholder: 'Tarih Seç',
    rangePlaceholder: ['Başlangıç Tarihi', 'Bitiş Tarihi'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
