import objectAssign from 'object-assign';
import GregorianCalendarLocale from 'gregorian-calendar/lib/locale/zh_CN.js';
import CalendarLocale from 'rc-calendar/lib/locale/zh_CN.js';
import GregorianCalendarFormatLocale from 'gregorian-calendar-format/lib/locale/zh_CN';

// 统一合并为完整的 Locale
let locale = objectAssign({}, GregorianCalendarLocale);
locale.lang = objectAssign({}, CalendarLocale, GregorianCalendarFormatLocale);

// All settings at:
// https://github.com/ant-design/ant-design/issues/424

export default locale;
