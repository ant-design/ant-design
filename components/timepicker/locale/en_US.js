import objectAssign from 'object-assign';
import GregorianCalendarLocale from 'gregorian-calendar/lib/locale/en_US';
import TimepickerLocale from 'rc-time-picker/lib/locale/en_US';

// 统一合并为完整的 Locale
let locale = objectAssign({}, GregorianCalendarLocale);
locale.lang = objectAssign({
  placeholder: 'Select a time'
}, TimepickerLocale);

// All settings at:
// https://github.com/ant-design/ant-design/issues/424

export default locale;
