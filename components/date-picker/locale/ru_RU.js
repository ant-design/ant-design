import objectAssign from 'object-assign';
import GregorianCalendarLocale from 'gregorian-calendar/lib/locale/ru_RU';
import CalendarLocale from 'rc-calendar/lib/locale/ru_RU';

// 统一合并为完整的 Locale
let locale = objectAssign({}, GregorianCalendarLocale);
locale.lang = objectAssign({
  placeholder: 'Выберите дату',
  timePlaceholder: 'Выберите время',
}, CalendarLocale);

// All settings at:
// https://github.com/ant-design/ant-design/issues/424

export default locale;
