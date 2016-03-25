import GregorianCalendarLocale from 'gregorian-calendar/lib/locale/en_US';
import CalendarLocale from 'rc-calendar/lib/locale/en_US';

// 统一合并为完整的 Locale
let locale = { ...GregorianCalendarLocale };
locale.lang = {
  placeholder: 'Select date',
  timePlaceholder: 'Select time',
  ...CalendarLocale,
};

// All settings at:
// https://github.com/ant-design/ant-design/issues/424

export default locale;
